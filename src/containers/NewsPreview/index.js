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
    WebView
} from "react-native";
import {
    Container,
    Text,
    Button,
    Content
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import HeaderContent from "../../components/Header_content";
import AutoHeightWebView from 'react-native-autoheight-webview';
import Comment from "../../components/Comment";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
class newPreview extends Component {

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
        const { news } = this.props;
        return (
            <Container>
                <HeaderContent headerTitle={news.title ? news.title : "Tin tức"}
                        showButtonLeft={true}
                        hideRightButton={true}></HeaderContent>
                <Content>
                    <AutoHeightWebView style={{ flex: 1 }} source={{ html: `<html>${news.content}</html>` }} ></AutoHeightWebView>
                    <Comment objectId={news.id} type={"NEWS"}></Comment>
                </Content>
            </Container>
        );
    }
}
export default newPreview;
