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
  Dimensions,
  TextInput,
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
  Badge,
  Textarea,
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import * as question_action from "../../store/actions/containers/question_action";
import * as scheduleAction from "../../store/actions/containers/schedule_action";
import * as postSubmitQuestion from "../../store/actions/containers/submit_question_action";

import Loading from "../../components/Loading";
import IconVector from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from "react-native-router-flux";
import * as helper from "../../helper";
// import AutoHeightWebView from 'react-native-autoheight-webview';
const blockAction = false;
const blockLoadMoreAction = false;
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
class SubmitQuestion extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      languageSelect: "vi",
      text: "",
      textTitle: "",
      textEmail: "",
    };
    this.loadSetting();
    this.selectedIndex = 0;
  }

  async loadSetting() {
    var lang = await helper.getLangSetting();
    if (lang != null) {
      I18n.locale = lang;
      this.setState({
        languageSelect: lang,
      });
    }
  }

  componentDidMount() {
    const { getQuestion } = this.props.question_action;
    const { user } = this.props.loginReducer;
    const { get_Schedule } = this.props.scheduleAction;

    getQuestion(user);
    get_Schedule({}, user);
  }

  componentDidUpdate(prevProps, prevState) {
    const { scheduleError } = this.props.ScheduleReducer;
    const { clearScheduleError } = this.props.scheduleAction;
    if (scheduleError) {
      Alert.alert(
        I18n.t("report"),
        I18n.t("getScheduleFail"),
        [
          {
            text: "Ok",
            onPress: e => {
              clearScheduleError();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  };

  render() {
    const listQuestions = this.props.questionReducer.listQuestion;

    let { schedule, isLoading } = this.props.ScheduleReducer;
    let listScheduler = [];
    schedule = Array.isArray(schedule) ? schedule : [];
    schedule.forEach(schedule => {
      schedule.listSchedule.forEach(e => {
        e.targetDate = schedule.targetDate;
        listScheduler.push(e);
      });
    });
    listScheduler = listScheduler.filter(
      e => e.scheduleType === "PRESENTATION"
    );
    listScheduler.forEach(e => {
      e.listQuestions = listQuestions.filter(
        question => question.questionTopicId === e.scheduleId
      );
    });
    const { postSubmitQuestion } = this.props.postSubmitQuestion;

    return (
      <Container>
        <FlatList
          data={listScheduler}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderFlatListItem.bind(this)}
          horizontal={true}
          pagingEnabled={true}
          // showsHorizontalScrollIndicator={true}
          scrollIndicatorInsets={{ top: 10, left: 10, bottom: 10, right: 10 }} //ios
          scrollEventThrottle={10}
          onMomentumScrollEnd={event => {
            this.selectedIndex =
              event.nativeEvent.contentOffset.x / screenWidth;
            console.log("dasddsa", this.selectedIndex);
          }}
        />
        <Loading isShow={isLoading} />
        <ScrollView>
          <Textarea
            bordered
            multiline={false}
            onChangeText={textTitle => this.setState({ textTitle })}
            value={this.state.textTitle}
            placeholder="Nhập tiêu đề"
            style={{
              margin: 5,
              marginBottom: 10,
              padding: 20,
            }}
          />
          <Textarea
          bordered
            onChangeText={textEmail => this.setState({ textEmail })}
            value={this.state.textEmail}
            multiline={false}
            placeholder="Nhập email người gửi"
            style={{
              margin: 5,
              marginBottom: 10,
              padding: 20,
            }}
          />
          <Textarea
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            rowSpan={7}
            bordered
            placeholder="Nội dung câu hỏi"
            style={{
              margin: 5,
              marginBottom: 10,
              padding: 20,
            }}
          />
          <Button
            full
            style={{
              backgroundColor: "#357db2",
              margin: 5,
              marginBottom: 10,
              padding: 20,
            }}
            disabled={this.state.text === ''}
            onPress={() => {
              if (listScheduler[this.selectedIndex] ) {
                postSubmitQuestion(
                  {
                    content: this.state.text,
                    title: this.state.textTitle,
                    email: this.state.textEmail,
                    questionFor: listScheduler[this.selectedIndex].author,
                    scheduleId: listScheduler[this.selectedIndex].scheduleId,
                  },
                  this.props.loginReducer.user,
                  () => {
                    this.setState({
                      text: "",
                      textTitle: "",
                      textEmail: "",
                    });
                    this.props.question_action.getQuestion(this.props.loginReducer.user);;
                  }
                );
              }
            }}
          >
            <Text>SEND</Text>
          </Button>
        </ScrollView>
      </Container>
    );
  }

  renderFlatListItem({ item }) {
    console.log("dsadsa ", item);
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          width: screenWidth,
        }}
      >
        <View
          style={{
            backgroundColor: "#357db2",
            margin: 5,
            marginBottom: 10,
            padding: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              marginBottom: 20,
              fontSize: 20,
            }}
          >
            {item.title.toUpperCase()}
          </Text>
          <Text
            style={{ color: "white", fontStyle: "italic", marginBottom: 10 }}
          >
            {item.author}
          </Text>
          <Text style={{ color: "#aaa", marginBottom: 5 }}>{`Địa điểm: ${
            item.location
          }`}</Text>
          <Text
            style={{ color: "#aaa", marginBottom: 5 }}
          >{`Thời gian: ${new Date(
            item.targetDate
          ).toLocaleTimeString()}   ${new Date(
            item.targetDate
          ).toLocaleDateString()}`}</Text>
        </View>
      </View>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }

  textEclipse(text, length) {
    var _length = length ? length : 55;
    return text.length > _length ? text.substring(0, _length) + "..." : text;
  }
}
function mapStateToProps(state, props) {
  return {
    loginReducer: state.loginReducer,
    ScheduleReducer: state.ScheduleReducer,
    questionReducer: state.questionReducer,
  };
}
function mapToDispatch(dispatch) {
  return {
    question_action: bindActionCreators(question_action, dispatch),
    scheduleAction: bindActionCreators(scheduleAction, dispatch),
    postSubmitQuestion: bindActionCreators(postSubmitQuestion, dispatch),
  };
}

SubmitQuestion = connect(
  mapStateToProps,
  mapToDispatch
)(SubmitQuestion);
export default SubmitQuestion;
