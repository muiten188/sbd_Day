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
    Image
} from "react-native";
import {
    Container,
    Text,
    Button,
    Content,
    Item,
    Left,
    Right
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import AutoHeightWebView from 'react-native-autoheight-webview';
import * as mapDetailAction from '../../store/actions/containers/mapDetail_action';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as helper from '../../helper';
class MapDetail extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            languageSelect: 'vi'
        };
        this.loadSetting();
    }

    componentDidMount() {

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

    }

    render() {
        const { news } = this.props;
        return (
            <Container>
                <Image style={{ flex: 1,resizeMode:'contain' }} source={{ uri: 'http://www.uwgb.edu/UWGBCMS/media/Maps/images/map-icon.jpg' }}></Image>
            </Container>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        mapDetailReducer: state.mapDetailReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        mapDetailAction: bindActionCreators(mapDetailAction, dispatch)
    };
}

MapDetail = connect(mapStateToProps, mapToDispatch)(MapDetail);
export default MapDetail;
