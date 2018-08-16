import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    WebView,
    Platform,
    Dimensions,
    Easing
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
import * as meseumListAction from "../../store/actions/containers/schedule_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ItemResult from '../../components/Item_result';
import Video from "react-native-video";
import ItemResultProduct from '../../components/Item_result_product';
import AutoHeightWebView from 'react-native-autoheight-webview';
import HeaderContent from "../../components/Header_content";
import * as helper from '../../helper';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
// import YouTube from 'react-native-youtube'
import * as AppConfig from "../../config/app_config";
import VideoPlayer from "../../components/VideoPlayer";
const blockAction = false;
const blockLoadMoreAction = false;

class Schedule extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSummary: true,
            backgroundVideo: false
        }
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {
        const { } = this.props.meseumListAction;

        this.loadSetting();
    }
    componentDidUpdate(prevProps, prevState) {

    }

    async loadSetting() {
        var backgroundVideoSetting = await helper.getBackgroundVideoSetting();
        if (backgroundVideoSetting != null) {
            this.setState({
                backgroundVideo: backgroundVideoSetting
            })
        }
    }
    render() {
        const locale = "vn";
        const { paramPassAction } = this.props;
        const { listAntifact, searchAntifactErorr, isLoading, Schedule } = this.props.ScheduleReducer;
        return (
            <Container style={styles.container}>
                <FlatList
                    ref={ref => {
                        this.list = ref;
                    }}
                    style={{ flex: 1, padding: 4 }}
                    data={[{}, {}, {}]}
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
        return (<View>
            <Text style={{ fontWeight: '500' }}>Day 1 - 20/04/2018 -Digital Transformation</Text>
            <FlatList
                ref={ref => {
                    this.list = ref;
                }}
                style={{ flex: 1, padding: 4 }}
                data={[{}, {}, {}, {}, {}]}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderFlatListItemDetail.bind(this)}
                horizontal={false}
                numColumns={1}
            />
        </View>)
    }

    renderFlatListItemDetail(dataItem) {
        const item = dataItem.item;
        return (<Text>     -detail item</Text>)
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
        ScheduleReducer: state.ScheduleReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        meseumListAction: bindActionCreators(meseumListAction, dispatch)
    };
}

Schedule = connect(mapStateToProps, mapToDispatch)(Schedule);
export default Schedule;
