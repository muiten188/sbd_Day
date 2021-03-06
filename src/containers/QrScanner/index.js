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
import * as qrCodeScannerAction from '../../store/actions/containers/qrCodeScanner_action';
import * as eventListAction from '../../store/actions/containers/eventList_action';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Loading from "../../components/Loading";
import Beacons from 'react-native-beacons-manager'
import Header_content from "../../components/Header_content";
const currentQrCode = null;
import * as helper from '../../helper';
const current_uuid = null;
const eventBeacons = null;
class qrCodeScanner extends Component {

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
        const { checkInByQrCode } = this.props.qrCodeScannerAction;
        const { isLoading } = this.props.qrCodeScannerReducer;
        const { user } = this.props.loginReducer;
        // const { beacon } = this.props;
        // if (beacon) {
        //     checkInByQrCode({ barcode: beacon.uuid + beacon.major + beacon.minor }, user)
        // }
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
        const { search_CHECK_CHECKIN } = this.props.eventListAction;
        const { user } = this.props.loginReducer;
        const { clearCHECKIN_BY_QRCODEError } = this.props.qrCodeScannerAction;
        const { searchErorr, checkInQrCode, checked } = this.props.qrCodeScannerReducer;
        if (searchErorr) {
            Alert.alert(I18n.t('report'), I18n.t('checkinFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearCHECKIN_BY_QRCODEError();
                    Actions.pop();
                }
            }],
                { cancelable: false })
        }
        else if (checked) {
            Alert.alert(I18n.t('report'), I18n.t('checked'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearCHECKIN_BY_QRCODEError();
                    search_CHECK_CHECKIN(null, user)
                    Actions.pop();
                }
            }],
                { cancelable: false })
        }
        else if (checkInQrCode) {
            Alert.alert(I18n.t('report'), I18n.t('checkinSuccess'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearCHECKIN_BY_QRCODEError();
                    search_CHECK_CHECKIN(null, user)
                    Actions.pop();
                }
            }],
                { cancelable: false })
        }
    }

    onSuccess(e) {
        const { checkInByQrCode } = this.props.qrCodeScannerAction;
        const { isLoading } = this.props.qrCodeScannerReducer;
        const { user } = this.props.loginReducer;
        if (!isLoading) {
            currentQrCode = e.data;
            Alert.alert(I18n.t('report'), e.data);
            checkInByQrCode({ barcode: e.data }, user)
            setTimeout(() => {
                currentQrCode = null;
            }, 1000)
        }
        // Linking
        //     .openURL(e.data)
        //     .catch(err => console.error('An error occured', err));
    }

    render() {
        const { isLoading } = this.props.qrCodeScannerReducer;
        const { beacon } = this.props;
        return (
            <Container style={{ paddingTop: getStatusBarHeight(true) }}>
                <HeaderContent headerTitle={I18n.t("checkin")}
                    showButtonLeft={true}
                    hideRightButton={true}></HeaderContent>
                {beacon ? <Text>Checkin bằng beacon...</Text> :
                    <QRCodeScanner
                        style={{ height: 200 }}
                        onRead={this.onSuccess.bind(this)}
                        showMarker={true}
                        reactivate={false}
                        topContent={
                            <Text style={styles.centerText}>
                                {I18n.t('checkinText')}
                            </Text>
                        }
                        bottomContent={
                            <TouchableOpacity style={styles.buttonTouchable}>
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>
                        }
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
        qrCodeScannerReducer: state.qrCodeScannerReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        qrCodeScannerAction: bindActionCreators(qrCodeScannerAction, dispatch),
        eventListAction: bindActionCreators(eventListAction, dispatch)
    };
}

qrCodeScanner = connect(mapStateToProps, mapToDispatch)(qrCodeScanner);
export default qrCodeScanner;
