import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from "react-native";
import {
  Container,
  Text,
  Grid,
  Col, 
} from "native-base";
import { connect } from "react-redux";
import * as question_action from '../../store/actions/containers/question_action';
import * as scheduleAction from "../../store/actions/containers/schedule_action";
import Loading from "../../components/Loading";
import I18n from "../../i18n/i18n";
import * as helper from "../../helper";
let screenWidth = Dimensions.get("window").width;
class ListQuestion extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      languageSelect: "vi",
    };
    this.loadSetting();
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

  render() {
    const listQuestions = this.props.questionReducer.listQuestion;

    let { schedule, isLoading } = this.props.ScheduleReducer;
    let listScheduler = [];
    schedule =  Array.isArray(schedule) ? schedule : [];
    schedule.forEach(schedule => {
      schedule.listSchedule.forEach(e => {
        e.targetDate = schedule.targetDate;
        listScheduler.push(e);
      });
    });
    listScheduler = listScheduler.filter(e => e.scheduleType === 'PRESENTATION');
    listScheduler.forEach(e => {
      e.listQuestions = listQuestions.filter(question => question.questionTopicId === e.scheduleId);
    });

    return (
      <Container>
        <FlatList
          data={listScheduler}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderFlatListItem.bind(this)}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          scrollIndicatorInsets={{ top: 10, left: 10, bottom: 10, right: 10 }} //ios
          scrollEventThrottle={10}
        />
        <Loading isShow={isLoading}></Loading>
      </Container>
    );
  }

  renderFlatListItem({ item }) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          width: screenWidth,
        }}
      >
      <ScrollView>
        <View style={{ backgroundColor: '#357db2', margin: 5, marginBottom: 10, padding: 20 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 20, fontSize: 18 }}>{item.title.toUpperCase()}</Text>
          <Text style={{ color: 'white', fontStyle: 'italic', marginBottom: 10 }}>{item.author}</Text>
          <Text style={{ color: '#aaa', marginBottom: 5 }}>{`${I18n.t('LocationQ')}: ${item.location}`}</Text>
          <Text style={{ color: '#aaa', marginBottom: 5 }}>{`${I18n.t('Time')}: ${new Date(item.targetDate).toLocaleTimeString()}   ${new Date(item.targetDate).toLocaleDateString()}`}</Text>
        </View>
        <Text style={{ fontStyle: 'italic', margin: 5}}>{`--- ${I18n.t('ListQuestion')}`}</Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: screenWidth }}>
          { (item.listQuestions && item.listQuestions.length > 0) && <FlatList
            ref={ref => {
              this.list = ref;
            }}
            style={{ flex: 1, padding: 4, width: screenWidth }}
            data={item.listQuestions || []}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderQuestionFlatListItem.bind(this)}
            horizontal={false}
            numColumns={1}
          /> ||    <Text style={{ marginBottom: 10, color: '#aaa' }}>{I18n.t('NoQuestion')}</Text>
          }
        </View>
      </ScrollView>
      </View>
    );
  }

  renderQuestionFlatListItem({item}) {
    return (<Grid style={{
      width: '100%', marginBottom: 6,
      paddingTop: 5, paddingBottom: 5, borderBottomWidth: 0.5,
      borderBottomColor: '#cecece'
    }}>
      <Col style={{ justifyContent: 'center', alignItems: 'flex-start', padding: 6, marginBottom: 15 }}>
        <View>
          <Text style={{ fontWeight: 'bold' }}>{`${I18n.t('Title')}: ${item.title}`}</Text>
          <Text style={{ marginTop: 6 }}>{`${I18n.t('QuestionFor')}: ${item.questionFor}`}</Text>
          <Text style={{ marginBottom: 20, marginTop: 6 }}>{`${I18n.t('Content')}: ${item.content}`}</Text>
        </View>
        <View style={{ position: 'absolute', bottom: -5, right: 0 }}>
          <Text style={{ fontWeight: '100', fontSize: 12 }}>{item.timeSubmit ? `${new Date(item.timeSubmit).toLocaleTimeString()}   ${new Date(item.timeSubmit).toLocaleDateString()}` : ''} </Text>
        </View>
      </Col>
    </Grid >)
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
    questionReducer: state.questionReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    question_action: bindActionCreators(question_action, dispatch),
    scheduleAction: bindActionCreators(scheduleAction, dispatch)
  };
}

ListQuestion = connect(
  mapStateToProps,
  mapToDispatch
)(ListQuestion);
export default ListQuestion;
