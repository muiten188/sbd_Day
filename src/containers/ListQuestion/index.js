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
  Dimensions,TextInput
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
// import * as surveyAction from "../../store/actions/containers/survey_action";
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
        languageSelect: lang,
      });
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
    var listEx = [
      {
        questionTopicId: 1,
        title: "Hỏi thời tiết",
        content: "Ngày mai có mưa không ông?",
        questionFor: "Ông Trời",
        status: "SENDED",
        timeSubmit: 1536918287000,
      },
      {
        questionTopicId: 2,
        title: "Title testing",
        content: "Content testing",
        questionFor: "User testing",
        status: "SENDED",
        timeSubmit: 1536927381000,
      },
      {
        questionTopicId: 2,
        title: "Title testing",
        content: "Content testing",
        questionFor: "User testing",
        status: "SENDED",
        timeSubmit: 1536927381000,
      },
      {
        questionTopicId: 2,
        title: "Title testing",
        content: "Content testing",
        questionFor: "User testing",
        status: "SENDED",
        timeSubmit: 1536927381000,
      },
      {
        questionTopicId: 2,
        title: "Title testing",
        content: "Content testing",
        questionFor: "User testing",
        status: "SENDED",
        timeSubmit: 1536927381000,
      },
      {
        questionTopicId: 2,
        title: "Title testing",
        content: "Content testing",
        questionFor: "User testing",
        status: "SENDED",
        timeSubmit: 1536927381000,
      },
    ];

    const locale = "vn";
    // const { surveyUrl, isLoading, searchErorr } = this.props.surveyReducer;
    return (
      <Container style={{ backgroundColor: "green" }}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          // style={{ flex: 1, padding: 4 }}
          data={listEx}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderFlatListItem.bind(this)}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          scrollIndicatorInsets={{ top: 10, left: 10, bottom: 10, right: 10 }} //ios
          onMomentumScrollBegin={() => {
            // alert('Begin scrolling')
          }}
          onMomentumScrollEnd={() => {
            //alert('End scrolling')
          }}
          onScroll={event => {
            let logData = `Scrolled to x = ${
              event.nativeEvent.contentOffset.x
            }, y =${event.nativeEvent.contentOffset.y}`;
            console.log(logData);
          }}
          scrollEventThrottle={10}
          // horizontal={false}
          // numColumns={1}
        />
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
    return (
      <View
        style={{
          backgroundColor: "#5f9ea0",
          flex: 1,
          width: screenWidth,
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <View style={{ flex: 4 }}>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
        </View>
        <View style={{ flex: 5}}>
        <Form>
        <Textarea rowSpan={5} bordered placeholder="Textarea" />
      </Form>
        </View>
        <Button></Button>
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
    // surveyReducer: state.surveyReducer,
    // loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    // surveyAction: bindActionCreators(surveyAction, dispatch)
  };
}

ListQuestion = connect(
  mapStateToProps,
  mapToDispatch
)(ListQuestion);
export default ListQuestion;
