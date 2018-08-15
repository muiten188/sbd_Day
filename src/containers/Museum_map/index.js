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
    WebView,
    StyleSheet,
    DeviceInfo
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
import * as museumMapAction from '../../store/actions/containers/MuseumMap_action';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Header_content from "../../components/Header_content";
import * as AppConfig from '../../config/app_config';
class MuseumMap extends Component {

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

    render() {
        const {mapId}=this.props;
        return (
            <Container>
                <HeaderContent headerTitle={"Sơ đồ"}
                    showButtonLeft={true}></HeaderContent>
                <WebView
                userAgent={"Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0"}  
            style={{
              ...StyleSheet.absoluteFillObject
            }}
            ref={(ref) => {
              this.webview = ref;
            }}
            source={{uri: `${AppConfig.MAP_NO_FRAME}mapId=${mapId}`}}
            onLoadEnd={this.onWebViewLoaded}
            onMessage={this.handleMessage}
            startInLoadingState={true}
            renderLoading={this.renderLoading}
            renderError={this.renderError}
            javaScriptEnabled={true}
            onError={this.onError}
            scalesPageToFit={false}
            mixedContentMode={'always'}
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
        museumMapReducer: state.museumMapReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        museumMapAction: bindActionCreators(museumMapAction, dispatch)
    };
}

MuseumMap = connect(mapStateToProps, mapToDispatch)(MuseumMap);
export default MuseumMap;
