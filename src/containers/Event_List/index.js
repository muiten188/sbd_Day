import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
    Image,
    DeviceEventEmitter,
    AppState,
    Platform
} from "react-native";
import {
    Container,
    Text,
    Button,
    Content,
    Body,
    Thumbnail,
    Form,
    Item,
    Input,
    H1,
    H2,
    H3,
    H6,
    Picker
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import YouTube from 'react-native-youtube';
import Icon from "react-native-vector-icons/FontAwesome";
import * as eventListAction from "../../store/actions/containers/eventList_action";
import Loading from "../../components/Loading";
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ProfileSlider from '../../components/ProfileSlider';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Beacons from 'react-native-beacons-manager'
import * as values from '../../helper/values';
import * as helper from '../../helper';
import { BluetoothStatus } from 'react-native-bluetooth-status';
import * as Appconfig from '../../helper/index';
const blockAction = false;
const listCurrentBeacon = [];
const eventBeacons = null;

class Eventlist extends Component {

    static navigationOptions = {
        header: null
    };

    async detectBeacons() {
        // Tells the library to detect iBeacons
        if (Platform.OS === 'ios') {
            // const region = {
            //     identifier: 'Estimotes',
            //     uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d'
            // };

            // // Request for authorization while the app is open
            // Beacons.requestWhenInUseAuthorization();

            // Beacons.startMonitoringForRegion(region);
            // Beacons.startRangingBeaconsInRegion(region);

            // Beacons.startUpdatingLocation();
        }
        else {
            Beacons.detectIBeacons()
            //Beacons.requestWhenInUseAuthorization();
            // Start detecting all iBeacons in the nearby
            try {
                await Beacons.startRangingBeaconsInRegion('REGION1')
                console.log(`Beacons ranging started succesfully!`)
            } catch (err) {
                console.log(`Beacons ranging not started, error: ${error}`)
            }
        }
    }

    async stopDetectBeacon() {
        try {
            await Beacons.stopRangingBeaconsInRegion('REGION1')
            console.log(`Beacons ranging started succesfully!`)
        } catch (err) {
            console.log(`Beacons ranging not started, error: ${error}`)
        }
    }

    constructor(props) {
        super(props);
        this.showMessage = false;
        this.current_uuid = {};
        this.listBeacons = [];
        this.indexScanerBeacon = 0;
        this.state = {
            languageSelect: 'vn',
            height: 191
        };
        this.loadSetting();
    }

    async loadSetting() {
        var lang = await helper.getLangSetting();
        if (lang != null) {
            I18n.locale = lang;
            this.setState({
                languageSelect: lang
            })
        }
    }

    containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].uuid == obj.uuid && list[i].major == obj.major && list[i].minor == obj.minor) {
                return true;
            }
        }

        return false;
    }

    onEventBeacon() {
        eventBeacons = DeviceEventEmitter.addListener('beaconsDidRange', async (data) => {
            console.log('Tìm thấy beacon:', data.beacons)
            if (AppState.currentState != "active") {
                return;
            }
            if (Appconfig.currentScreen == 'product' || Appconfig.currentScreen == 'productDetail') {
                return;
            }
            if (data.beacons && data.beacons.length > 0 && blockAction == false) {
                //blockAction = true;
                const isEnabled = await BluetoothStatus.state();

                if (!isEnabled) {
                    setTimeout(() => {
                        blockAction = false;
                    }, 5000);

                }
                for (var i = 0; i < data.beacons.length; i++) {
                    if (!this.containsObject(data.beacons[i], this.listBeacons)) {
                        this.listBeacons.push(data.beacons[i]);
                    }
                }
                this.indexScanerBeacon = this.indexScanerBeacon + 1;
                if (this.indexScanerBeacon <= 5) {
                    return;
                }
                this.listBeacons.sort(function (a, b) { return a.distance > b.distance });
                var objectBeacon = { uuid: this.listBeacons[0].uuid, major: this.listBeacons[0].major, minor: this.listBeacons[0].minor }
                console.log('array merge', this.listBeacons)
                if (JSON.stringify(this.current_uuid) != JSON.stringify(objectBeacon)) {
                    this.current_uuid = objectBeacon;
                    if (this.showMessage) {
                        return;
                    }

                    this.showMessage = true;
                    if (!this.props.EventlistReducer.didCheckin) {
                        Alert.alert(I18n.t('report'), 'Bạn có muốn Checkin sự kiện SBD Day 2018 không?\nNếu có chọn [OK] và không chọn [Cancel]', [{
                            text: 'Ok',
                            onPress: (e) => {
                                Actions.qrScanner({ beacon: this.current_uuid })
                                setTimeout(() => {
                                    this.current_uuid = {};
                                }, 50000);
                                this.showMessage = false;
                            }
                        },
                        {
                            text: 'Cancel',
                            onPress: () => {
                                this.showMessage = false; console.log('Cancel Pressed');
                                setTimeout(() => {
                                    this.current_uuid = {};
                                }, 50000);
                            }, style: 'cancel'
                        }],
                            { cancelable: false });
                    }
                    else {
                        Alert.alert(I18n.t('report'), 'Tìm thấy beacon bạn có muốn lấy thông tin sản phẩm theo beacon?', [{
                            text: 'Ok',
                            onPress: (e) => {
                                this.showMessage = false;
                                Actions.home({ screenId: 'product', beacon: this.current_uuid })
                            }
                        },
                        {
                            text: 'Cancel',
                            onPress: () => {
                                this.showMessage = false;
                                console.log('Cancel Pressed');
                                setTimeout(() => {
                                    this.current_uuid = {};
                                }, 50000);
                            }, style: 'cancel'
                        }],
                            { cancelable: false });
                    }
                    console.log('Tìm thấy beacon:', this.listBeacons[0].uuid)
                }
                setTimeout(() => {
                    blockAction = false;
                }, 5000);
                this.listBeacons = [];
                this.indexScanerBeacon = 0;

            }
        })
    }

    _handleAppStateChange(nextAppState) {
        // if (nextAppState == "active") {
        //     this.onEventBeacon();
        //     this.detectBeacons();
        // }
        // else {
        //     if (eventBeacons) {
        //         eventBeacons.remove();
        //         this.stopDetectBeacon();
        //     }
        // }

    }

    componentDidMount() {
        const { search_HOT_NEWS, search_CHECK_CHECKIN } = this.props.eventListAction;
        const { didCheckin } = this.props.EventlistReducer;
        const { getProducts } = this.props;
        const { user } = this.props.loginReducer;
        search_HOT_NEWS(null, user)
        if (user) {

            search_CHECK_CHECKIN(null, user)
            AppState.addEventListener('change', this._handleAppStateChange.bind(this));
            // this.onEventBeacon();
            // this.detectBeacons();
        }

    }
    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {
        // if (eventBeacons) {
        //     eventBeacons.remove();
        //     this.stopDetectBeacon();
        // }
    }

    render() {
        const locale = "vn";
        const { isLoading, listHotNews, searchErorr } = this.props.EventlistReducer;
        return (
            <Container style={styles.container}>
                <Grid>{/* marginBottom: 45 */}

                    <Row style={{ height: 190, marginBottom: 6 }}>
                        <ProfileSlider data={listHotNews}></ProfileSlider>
                    </Row>
                    <Row>
                        <FlatList
                            ref={ref => {
                                this.list = ref;
                            }}
                            style={{ flex: 1, padding: 4, paddingTop: 0, marginTop: 0 }}
                            data={values.list_Menu ? values.list_Menu : []}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.buildMenuItem.bind(this)}
                            horizontal={false}
                            numColumns={2}
                        />
                    </Row>
                </Grid>
            </Container>
        );
    }

    buildMenuItem(dataItem) {
        var index = dataItem.index;
        var item = dataItem.item;
        const { listNews } = this.props;
        const { didCheckin } = this.props.EventlistReducer;
        return (
            <TouchableOpacity style={[{
                height: 110,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#cecece',
            }, index % 2 == 0 ? {
                borderRightWidth: 0.2,
                borderBottomWidth: 0.25
            } : {borderLeftWidth: 0.2,
                borderBottomWidth: 0.25}]}
                onPress={() => {
                    if (item.disable) {
                        Alert.alert('Thông báo', 'Tính năng sắp ra mắt.');
                        return;
                    }
                    if ((!didCheckin && item.mName == "qrcode")) {
                        Actions.qrScannerProduct()
                    }
                    else if (item.mName != "Checkin") {
                        Actions.home({ screenId: item.routerName })
                    }
                }}>

                <Grid>
                    <Row style={styles.center}>
                        {item.isIcon ? <Icon style={{ color: '#007db7' }} size={32} name={item.IconName}></Icon> :
                            <Image style={{ width: 32, height: 32 }} source={item.IconName} ></Image>}
                    </Row>
                    <Row style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text>{didCheckin && item.mName == "Checkin" ? I18n.t('didCheckin') + "  " : I18n.t(item.mName)}
                            {didCheckin && item.mName == "Checkin" ? <Icon style={{
                                color: 'green',
                            }} size={25} name={"check-circle"}></Icon> : null}
                        </Text>
                    </Row>
                </Grid>

            </TouchableOpacity>
        )
    }

    _keyExtractor(item, index) {
        return index;
    }
}
function mapStateToProps(state, props) {
    return {
        EventlistReducer: state.EventlistReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        eventListAction: bindActionCreators(eventListAction, dispatch)
    };
}

Eventlist = connect(mapStateToProps, mapToDispatch)(Eventlist);
export default Eventlist;
