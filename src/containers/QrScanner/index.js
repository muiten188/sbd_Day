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
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Header_content from "../../components/Header_content";
const currentQrCode = null;
class qrCodeScanner extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    onSuccess(e) {
        const { get_AntifactByQRCODE } = this.props.qrCodeScannerAction;
        if (e.data != currentQrCode) {
            currentQrCode=e.data;
            Alert.alert("Thông báo", e.data);
            get_AntifactByQRCODE({ qrCode: e.data })
            setTimeout(()=>{
                currentQrCode=null;
            },1000)
        }
        // Linking
        //     .openURL(e.data)
        //     .catch(err => console.error('An error occured', err));
    }

    render() {
        return (
            <Container>
                <HeaderContent headerTitle={"Qr Code"}
                    showButtonLeft={true}
                    hideRightButton={true}></HeaderContent>
                <QRCodeScanner
                    style={{ height: 200 }}
                    onRead={this.onSuccess.bind(this)}
                    showMarker={true}
                    reactivate={false}
                    topContent={
                        <Text style={styles.centerText}>
                            Quét mã Qr code để biết thông tin Hiện vật
          </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    }
                />
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
        qrCodeScannerAction: bindActionCreators(qrCodeScannerAction, dispatch)
    };
}

qrCodeScanner = connect(mapStateToProps, mapToDispatch)(qrCodeScanner);
export default qrCodeScanner;
