import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    Linking,
    DeviceEventEmitter
} from "react-native";
import {
    Container,
    Text,
    Button
} from "native-base";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import HeaderContent from "../../components/Header_content";
import * as qrCodeProductScannerAction from '../../store/actions/containers/qrcode_product_action';
import * as eventListAction from '../../store/actions/containers/eventList_action';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import QrCodeScanner from 'react-native-qrcode-scanner';
import Loading from "../../components/Loading";
import Beacons from 'react-native-beacons-manager'
import Header_content from "../../components/Header_content";
const currentQrCode = null;
import * as helper from '../../helper';
const current_uuid = null;
const eventBeacons = null;
class QrCodeProductScanner extends Component {

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
            languageSelect: 'vn'
        };
        this.loadSetting();
    }

    componentDidMount() {

        const { isLoading } = this.props.qrCodeProductScannerReducer;
        const { user } = this.props.loginReducer;
    }

    componentWillUnmount() {
        if (eventBeacons) {
            eventBeacons.remove();
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
        const { user } = this.props.loginReducer;
        const { clearProduct_BY_QRCODEError } = this.props.qrCodeProductScannerAction;
        const { objProduct, searchErorr } = this.props.qrCodeProductScannerReducer;
        if (searchErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getProductByQrcodeFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearProduct_BY_QRCODEError();
                }
            }],
                { cancelable: false })
        }
        else if (objProduct != null) {
            Actions.home({ screenId: 'productDetail', product: objProduct, listProduct: [] })
            clearProduct_BY_QRCODEError();
        }
    }

    onSuccess(e) {
        const { searchProductByQrCode } = this.props.qrCodeProductScannerAction;
        const { isLoading } = this.props.qrCodeProductScannerReducer;
        const { user } = this.props.loginReducer;
        if (!isLoading) {
            currentQrCode = e.data;
            Alert.alert(I18n.t('report'), e.data);
            searchProductByQrCode({ qrCode: e.data }, user)
            setTimeout(() => {
                currentQrCode = null;
            }, 1000)
        }
        // Linking
        //     .openURL(e.data)
        //     .catch(err => console.error('An error occured', err));
    }

    render() {
        const { isLoading } = this.props.qrCodeProductScannerReducer;
        const { beacon } = this.props;
        return (
            <Container style={{ paddingTop: getStatusBarHeight(true) }}>
                {beacon ? <Text>Checkin bằng beacon...</Text> :
                    <QrCodeScanner
                        style={{ height: 200 }}
                        onRead={this.onSuccess.bind(this)}
                        showMarker={true}
                        reactivate={true}
                        reactivateTimeout={3000}
                        topContent={
                            <Text style={styles.centerText}>
                                Quét mã QR Code quầy booth
                            </Text>
                        }
                        // bottomContent={
                        //     <TouchableOpacity style={styles.buttonTouchable}>
                        //         <Text style={styles.buttonText}>OK</Text>
                        //     </TouchableOpacity>
                        // }
                    />}
                <Loading isShow={isLoading}></Loading>
            </Container>

        );
    }

    textEclipse(text) {
        return (((text).length > 125) ?
            (((text).substring(0, 125)) + '...') :
            text)
    }
}
function mapStateToProps(state, props) {
    return {
        qrCodeProductScannerReducer: state.qrCodeProductScannerReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        qrCodeProductScannerAction: bindActionCreators(qrCodeProductScannerAction, dispatch)
    };
}

QrCodeProductScanner = connect(mapStateToProps, mapToDispatch)(QrCodeProductScanner);
export default QrCodeProductScanner;
