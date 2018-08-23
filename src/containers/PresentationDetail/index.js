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
import * as PresentationDetailAction from '../../store/actions/containers/presentationDetail_action';
import TopicSlider from '../../components/TopicSlider';
import * as helper from '../../helper';
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
class PresentationDetail extends Component {

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
        const { get_presentationDetail } = this.props.PresentationDetailAction;
        const { user } = this.props.loginReducer;
        const { scheduleItem } = this.props;
        get_presentationDetail({ scheduleId: scheduleItem.scheduleId }, user);
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
        const { searchPresentationDetailErorr } = this.props.presentationDetailReducer;
        const { clearpresentationDetailError } = this.props.PresentationDetailAction;
        if (searchPresentationDetailErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getTopicFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearpresentationDetailError();
                }
            }],
                { cancelable: false })
        }
    }

    render() {
        const { news, scheduleAllItem, scheduleItem } = this.props;
        let listAllScheduleClone = scheduleAllItem ? scheduleAllItem.slice(0) : null;
        const { isLoading, presentationDetail } = this.props.presentationDetailReducer;
        let listTopicDif = this.getListTopic(listAllScheduleClone, scheduleItem);
        
        return (
            <Container>
                <Grid>{/* marginBottom: 45 */}
                    <Row>
                        <ScrollView>
                            <View style={[styles.Item, { marginTop: 10 }]}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Topic') + " : "}</Text> {presentationDetail.title}
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Presenter') + " : "}</Text> {presentationDetail.author}
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Date') + " : "}</Text> {presentationDetail.targetDate ? new Date(presentationDetail.targetDate).toLocaleDateString() : ''}
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Time') + " : "}</Text> {presentationDetail.fromTime} - {presentationDetail.toTime}
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Location') + " : "}</Text> {presentationDetail.location}
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Summary') + " : "}</Text>
                                </Text>
                                
                            </View>
                            <AutoHeightWebView source={{
                                    html: `${presentationDetail.description}`
                                }}>

                                </AutoHeightWebView>
                            {/*<View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Presenter') + " : "}</Text> Mr ABC
                                </Text>
                                <Text>      -Digital transformotion in SDC</Text>
                                <Text>      -Digital transformotion in SDC</Text>
                                <Text>      -Digital transformotion in SDC</Text>
                            </View> */}
                        </ScrollView>
                    </Row>
                    {(listTopicDif && listTopicDif.length > 0) ?
                        <Row style={{ height: 70, borderTopWidth: 1, borderTopColor: '#cecece' }}>
                            <TopicSlider listTopic={listTopicDif} listTopicAll={scheduleAllItem}></TopicSlider>
                        </Row> : null}
                </Grid>
                <Loading isShow={isLoading}></Loading>
            </Container>
        );
    }

    getListTopic(topicArr, scheduleItem) {
        var _arrTopic = [];
        forTp:
        for (var i = 0; i < topicArr.length; i++) {
            for (var j = 0; j < topicArr[i].listSchedule.length; j++) {
                if (topicArr[i].listSchedule[j].scheduleId == scheduleItem.scheduleId) {
                    _arrTopic = topicArr[i].listSchedule;
                    break forTp;
                }
            }
        }
        _arrTopic = this.remove(_arrTopic, scheduleItem);
        return _arrTopic;
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

}
function mapStateToProps(state, props) {
    return {
        presentationDetailReducer: state.presentationDetailReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        PresentationDetailAction: bindActionCreators(PresentationDetailAction, dispatch)
    };
}

PresentationDetail = connect(mapStateToProps, mapToDispatch)(PresentationDetail);
export default PresentationDetail;
