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
import * as scheduleAction from "../../store/actions/containers/schedule_action";
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
            languageSelect: 'vn'
        }
        this.loadSetting();
    }

    componentDidMount() {
        const { get_Schedule } = this.props.scheduleAction;
        const { user } = this.props.loginReducer;
        get_Schedule({}, user)
    }
    componentDidUpdate(prevProps, prevState) {
        const { scheduleError } = this.props.ScheduleReducer;
        const { clearScheduleError } = this.props.scheduleAction;
        if (scheduleError) {
            Alert.alert(I18n.t('report'), I18n.t('getScheduleFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearScheduleError();
                }
            }],
                { cancelable: false })
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
    render() {
        const locale = "vn";
        const { paramPassAction } = this.props;
        const { scheduleError, isLoading, schedule } = this.props.ScheduleReducer;
        return (
            <Container style={styles.container}>
                <FlatList
                    ref={ref => {
                        this.list = ref;
                    }}
                    style={{ flex: 1, padding: 4 }}
                    data={schedule ? schedule : []}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderFlatListItem.bind(this)}
                    horizontal={false}
                    numColumns={1}
                />
                <Loading isShow={isLoading}></Loading>
            </Container>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        return (<View style={{ marginBottom: 6 }}>
            <Text style={{ fontWeight: '500' }}>{item.eventTitle}</Text>
            <FlatList
                ref={ref => {
                    this.list = ref;
                }}
                style={{ flex: 1, padding: 4 }}
                data={item.listSchedule}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderFlatListItemDetail.bind(this)}
                horizontal={false}
                numColumns={1}
            />
        </View>)
    }

    renderFlatListItemDetail(dataItem) {
        const item = dataItem.item;
        const { schedule } = this.props.ScheduleReducer;
        return (
            <View style={{ marginBottom: 10 }}>
                <Grid>
                    <Row>
                        <Col style={{ marginTop: 6, width: 115, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ borderWidth: 0.5, paddingLeft: 4, paddingRight: 4 }}>{item.fromTime}-{item.toTime}</Text>
                        </Col>
                        <Col>
                            <TouchableOpacity onPress={() => {
                                Actions.home({ screenId: 'presentationDetail', scheduleItem: item, scheduleAllItem: schedule })
                            }}><Text><Text style={{ fontWeight: '500' }}>{I18n.t('Presentation')}: </Text><Text style={{ textDecorationLine: 'underline' }}>{item.title}</Text></Text></TouchableOpacity>
                            <Text><Text style={{ fontWeight: '500' }}>{I18n.t('Presenter')}: </Text>{item.author}</Text>
                            <Text><Text style={{ fontWeight: '500' }}>{I18n.t('Location')}: </Text>{item.location}</Text>
                        </Col>
                    </Row>
                </Grid>
            </View >
        )
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
        scheduleAction: bindActionCreators(scheduleAction, dispatch)
    };
}

Schedule = connect(mapStateToProps, mapToDispatch)(Schedule);
export default Schedule;
