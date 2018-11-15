import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    Image,
    DeviceEventEmitter
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
    Picker,
    Badge
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import * as productAction from "../../store/actions/containers/product_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as helper from '../../helper';
import * as AppConfig from "../../config/app_config";
import Beacons from 'react-native-beacons-manager'
const listCurrentBeacon = [];
const current_uuid = {};
const eventBeacons = null;
const blockAction = false;
const blockLoadMoreAction = false;
class Product extends Component {

    static navigationOptions = {
        header: null
    };

    async detectBeacons() {
        // Tells the library to detect iBeacons
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

    constructor(props) {
        super(props);
        this.state = {
            languageSelect: 'vi'
        };
        this.loadSetting();
    }

    componentDidMount() {
        const { getProducts } = this.props.productAction;
        const { user } = this.props.loginReducer;
        const { beacon } = this.props;
        if (beacon) {
            getProducts({ beacon: beacon.uuid + beacon.major + beacon.minor }, user);
        }
        else {
            getProducts({}, user);
        }
    }

    componentWillUnmount() {
        if (eventBeacons) {
            eventBeacons.remove();
        }
        helper.currentScreen=null;
    }
    //true new list != current list 
    //false current list == new list
    checkListCurrentBeacon(arrRawBeacon) {
        var _arrayBeacon = [];
        if (arrRawBeacon && arrRawBeacon.length > 0) {
            for (var i = 0; i < arrRawBeacon.length; i++) {
                _arrayBeacon.push(arrRawBeacon[i].uuid);
            }
        }
        if (_arrayBeacon != listCurrentBeacon) {
            listCurrentBeacon = _arrayBeacon;
            return true;
        }
        else {
            return false;
        }
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

    componentDidUpdate(prevProps, prevState) {
        const { searchErorr } = this.props.productReducer;
        const { clearErrorSearch } = this.props.productAction;
        if (searchErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getProductFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearErrorSearch();
                }
            }],
                { cancelable: false });
        }
    }


    render() {
        const locale = "vn";
        const { listProduct, isLoading, searchErorr } = this.props.productReducer;
        return (
            <Container>
                <FlatList
                    ref={ref => {
                        this.list = ref;
                    }}
                    style={{ flex: 1, padding: 4 }}
                    data={listProduct}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderFlatListItem.bind(this)}
                    horizontal={false}
                    numColumns={1}
                />
                <Loading isShow={isLoading}></Loading>
            </Container>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        const { listProduct } = this.props.productReducer;
        var urlAvartar = null;
        if (item && item.avatar) {
            urlAvartar = AppConfig.API_HOST_BASE + item.avatar;
        }
        return (<Grid style={{ width: '100%', height: 75, marginBottom: 4 }}>
            <Col style={{ width: 80, marginTop: 10 }}>
                <View style={{ width: 60, height: 60, borderWidth: 0.5, borderColor: '#cecece' }}>
                    <Image style={{ flex: 1 }} source={{ uri: urlAvartar ? urlAvartar : 'data:image/png;base64,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' }}></Image>
                </View>
            </Col>
            <Col style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => { Actions.home({ screenId: 'productDetail', product: item, listProduct: listProduct }) }}>
                    <Text>
                        <Text style={{ fontWeight: '500' }}>{I18n.t('Product')}: </Text>
                        <Text style={{ color: 'blue' }}>{this.textEclipse(item.name)}</Text>
                    </Text>

                    <Text style={{ fontStyle: "italic" }}>
                        <Text style={{}}>{I18n.t('Company')}: </Text>
                        <Text style={{}}>{this.textEclipse(item.company, 30)}</Text>
                    </Text>
                </TouchableOpacity>
            </Col>

        </Grid>)
    }

    _keyExtractor(item, index) {
        return index;
    }

    textEclipse(text, length) {
        var _text=text?text:'';
        var _length = length ? length : 55;
        return (((_text).length > _length) ?
            (((_text).substring(0, _length)) + '...') :
            _text)
    }
}
function mapStateToProps(state, props) {
    return {
        productReducer: state.productReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        productAction: bindActionCreators(productAction, dispatch)
    };
}

Product = connect(mapStateToProps, mapToDispatch)(Product);
export default Product;
