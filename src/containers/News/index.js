import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    RefreshControl,
    Image
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
import * as newsAction from "../../store/actions/containers/news_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ItemResult from '../../components/Item_result';
import Video from "react-native-video";
import ItemResultProductDevider from '../../components/Item_divider_product';
import ItemResultProduct from '../../components/Item_result_product';
import * as helper from '../../helper';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
// import YouTube from 'react-native-youtube'
import * as AppConfig from "../../config/app_config";

const blockAction = false;
const blockLoadMoreAction = false;

class News extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            languageSelect: 'vn'
        }
        this.loadSetting();
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
    componentDidMount() {
        const { get_News } = this.props.newsAction;
        const { user } = this.props.loginReducer;
        get_News({}, user);
    }
    componentDidUpdate(prevProps, prevState) {
        const { searchNewsErorr } = this.props.newsReducer;
        const { clearNewsError } = this.props.newsAction;
        if (searchNewsErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getNewsFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearNewsError();
                }
            }],
                { cancelable: false })
        }
    }

    render() {
        const locale = "vn";
        const { paramPassAction } = this.props;
        const { listNews, isLoading } = this.props.newsReducer;
        return (
            <Container style={styles.container}>
                <FlatList
                    ref={ref => {
                        this.list = ref;
                    }}
                    style={{ flex: 1, padding: 4 }}
                    data={listNews}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderFlatListItem.bind(this)}
                    horizontal={false}
                    numColumns={1}
                />
            </Container>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        const { listNews } = this.props.newsReducer;
        let _avartar = null;
        if (item.avatar) {
            _avartar = `${AppConfig.API_HOST_BASE}${item.avatar}`;
        }
        return (<Grid style={{ width: '100%', height: 80, marginBottom: 6, paddingTop: 10 }}>
            <Col style={{ width: 80, marginTop: 10 }}>
                <Image style={{ width: 60, height: 60 }} source={_avartar ?  { uri: _avartar}:require('../../resources/assets/associate.png')}></Image>
            </Col>
            <Col style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => { Actions.home({ screenId: 'newsDetaill', newsItem: item, listAllNews: listNews }) }}>
                    <Text>
                        {I18n.t("News")} {dataItem.index + 1}{" "}
                        <Text style={{ textDecorationLine: 'underline' }}>{item.title}</Text>
                    </Text>
                </TouchableOpacity>
            </Col>

        </Grid>)
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
        newsReducer: state.newsReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        newsAction: bindActionCreators(newsAction, dispatch)
    };
}

News = connect(mapStateToProps, mapToDispatch)(News);
export default News;
