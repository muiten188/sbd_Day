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
} from "react-native";
import {
    Container,
    Text,
    Button
} from "native-base";
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
import Header_content from "../../components/Header_content";
const currentQrCode = null;
import * as helper from '../../helper';
class qrCodeScanner extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            languageSelect: 'vn'
        };
        this.loadSetting();
    }

    componentDidMount() {
        // const { checkInByQrCode } = this.props.qrCodeScannerAction;
        // const { user } = this.props.loginReducer;
        // checkInByQrCode({ barcode: '1234567890' },user)
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
                }
            }],
                { cancelable: false })
        }
        else if (checked) {
            Alert.alert(I18n.t('report'), I18n.t('checked'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearCHECKIN_BY_QRCODEError();
                    Actions.pop();
                    search_CHECK_CHECKIN(null, user)
                }
            }],
                { cancelable: false })
        }
        else if (checkInQrCode) {
            Alert.alert(I18n.t('report'), I18n.t('checkinSuccess'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearCHECKIN_BY_QRCODEError();
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
        if (e.data != currentQrCode && !isLoading) {
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
        return (
            <Container>
                <HeaderContent headerTitle={I18n.t("checkin")}
                    showButtonLeft={true}
                    hideRightButton={true}></HeaderContent>
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
                />
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
