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
                    <Image style={{ flex: 1 }} source={urlAvartar ?  { uri: urlAvartar}:require('../../resources/assets/associate.png')}></Image>
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
