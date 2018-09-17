import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    Image,
    WebView,
    Dimensions
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
    Picker,
    Badge
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
// import * as surveyAction from "../../store/actions/containers/survey_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as helper from '../../helper';
// import AutoHeightWebView from 'react-native-autoheight-webview';
const blockAction = false;
const blockLoadMoreAction = false;
class SubmitQuestion extends Component {

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
        // const { getSurvey } = this.props.surveyAction;
        // const { user } = this.props.loginReducer;
        // getSurvey({ userId: user.userId }, user);
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
        // const { searchErorr } = this.props.surveyReducer;
        // const { clearErrorSearch } = this.props.surveyAction;
        // if (searchErorr) {
        //     Alert.alert(I18n.t('report'), I18n.t('getSurveyFail'), [{
        //         text: 'Ok',
        //         onPress: (e) => {
        //             clearErrorSearch();
        //         }
        //     }],
        //         { cancelable: false })
        // }
    }


    render() {
        const locale = "vn";
        // const { surveyUrl, isLoading, searchErorr } = this.props.surveyReducer;
        return (
            <Container style={{backgroundColor: 'red'}}>
                {/* <FlatList
                    ref={ref => {
                        this.list = ref;
                    }}
                    style={{ flex: 1, padding: 4 }}
                    data={[{}, {}, {}, {}, {}]}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderFlatListItem.bind(this)}
                    horizontal={false}
                    numColumns={1}
                /> */}
                    {/* <AutoHeightWebView style={{width:'100%',height:Dimensions.get('window').height,paddingBottom:120}} source={{
                        uri: 'http://113.171.23.144/event-manager/survey.html#!/survey?userId=2'
                    }} >
                    </AutoHeightWebView>
                <Loading isShow={isLoading}></Loading> */}
            </Container>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        return (<Grid style={{ width: '100%', height: 80, marginBottom: 6, paddingTop: 10 }}>
            <Col style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}>
                <IconEntypo size={35} name="help"></IconEntypo>

            </Col>
            <Col style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => { Actions.home({ screenId: 'surveyDetail' }) }}>
                    <Text>
                        {I18n.t("Survey")}{" 1 "}
                        <Text style={{ textDecorationLine: 'underline' }}>{this.textEclipse("Product 1")}</Text>
                    </Text>
                </TouchableOpacity>
                {/* <Text style={{fontWeight:'500'}}>{this.textEclipse("Presenter: Mr ABC",30)}</Text> */}
            </Col>

        </Grid>)
    }

    _keyExtractor(item, index) {
        return index;
    }

    textEclipse(text, length) {
        var _length = length ? length : 55;
        return (((text).length > _length) ?
            (((text).substring(0, _length)) + '...') :
            text)
    }
}
function mapStateToProps(state, props) {
    return {
        // surveyReducer: state.surveyReducer,
        // loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        // surveyAction: bindActionCreators(surveyAction, dispatch)
    };
}

SubmitQuestion = connect(mapStateToProps, mapToDispatch)(SubmitQuestion);
export default SubmitQuestion;
