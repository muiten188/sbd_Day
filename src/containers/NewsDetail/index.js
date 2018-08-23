import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView
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
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as NewsDetailAction from "../../store/actions/containers/newsDetail_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import NewsDetailSlider from '../../components/NewsDetailSlider';
import AutoHeightWebView from 'react-native-autoheight-webview';
import NewsSlider from '../../components/NewsSlider';
import * as helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;

class NewsDetail extends Component {

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
        const { get_NewsDetail } = this.props.NewsDetailAction;
        const { user } = this.props.loginReducer;
        debugger;
        get_NewsDetail({ newsId: 1 }, user)
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
        const { searchNewsDetailErorr } = this.props.newsDetailReducer;
        const { clearNewsDetailError } = this.props.NewsDetailAction;
        if (searchNewsDetailErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getNewsFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearNewsDetailError();
                }
            }],
                { cancelable: false })
        }
    }

    render() {
        const { listNewsDetail, searchNewsDetailErorr, isLoading } = this.props.newsDetailReducer;
        const { newsItem, listAllNews } = this.props;
        let listAllNewsClone=listAllNews?listAllNews.slice(0):null;
        return (
            <Container style={styles.container}>
                <Grid>{/* marginBottom: 45 */}
                    <Row style={{ height: 100, borderBottomWidth: 1, borderBottomColor: '#cecece' }}>
                        <NewsDetailSlider data={listNewsDetail.profiles}></NewsDetailSlider>
                    </Row>
                    <Row>
                        <ScrollView>
                            <AutoHeightWebView source={{
                                html: `${listNewsDetail.content}`
                            }}>

                            </AutoHeightWebView>
                        </ScrollView>
                    </Row>
                    {(listAllNewsClone && listAllNewsClone.length > 1) ? <Row style={{ height: 70, borderTopWidth: 1, borderTopColor: '#cecece' }}>
                        <NewsSlider listNews={this.remove(listAllNewsClone,newsItem)} listAllNews={listAllNews}></NewsSlider>
                    </Row> : null}
                </Grid>
                <Loading isShow={isLoading}></Loading>
            </Container>
        );
    }

    remove(array, element) {
        var _arr=[];
        for(var i=0;i<array.length;i++){
            if(array[i]!=element){
                _arr.push(array[i])
            }
        }
        return _arr;
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        return (
            <View
                key={item.index}
                style={
                    styles.item_container_half
                }
                onPress={() => {
                    // if (!blockAction) {
                    //     blockAction = true;

                    // }
                }}
            >
                <ItemNewsDetailConfirm></ItemNewsDetailConfirm>
                <ItemNewsDetail></ItemNewsDetail>
            </View>
        );
    }

    _keyExtractor(item, index) {
        return index;
    }

    textEclipse(text) {
        return (((text).length > 125) ?
            (((text).substring(0, 125)) + '...') :
            text)
    }
}
function mapStateToProps(state, props) {
    return {
        newsDetailReducer: state.newsDetailReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        NewsDetailAction: bindActionCreators(NewsDetailAction, dispatch)
    };
}

NewsDetail = connect(mapStateToProps, mapToDispatch)(NewsDetail);
export default NewsDetail;
