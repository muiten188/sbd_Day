import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert
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
  H3
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as notificationDetailAction from "../../store/actions/containers/notificationDetail_action";
import IconVector from 'react-native-vector-icons/FontAwesome';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import HeaderContent from '../../components/Header_content';
import AutoHeightWebView from 'react-native-autoheight-webview';
import * as helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;

class NotificationDetail extends Component {

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

  }
  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const { notification } = this.props;
    return (
      <Container style={styles.container}>
        <HeaderContent headerTitle={this.textEclipse(notification.title, 30)} showButtonLeft={true} hideRightButton={true} />
        <Content style={{padding:10}}>
          <Text style={{ fontWeight: '500' }}>{notification.title}</Text>

          <AutoHeightWebView style={{ paddingTop: 10 }} source={{
            html: `${notification.content}`
          }}>

          </AutoHeightWebView>  
        </Content>
        <Text style={{ fontWeight: '100', position: 'absolute', bottom: 0, right: 0, fontSize: 12 }}>{notification.createdDate ? new Date(notification.createdDate).toLocaleDateString() : ''} </Text>
      </Container>
    );
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
    notificationDetailReducer: state.notificationDetailReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    notificationDetailAction: bindActionCreators(notificationDetailAction, dispatch)
  };
}

NotificationDetail = connect(mapStateToProps, mapToDispatch)(NotificationDetail);
export default NotificationDetail;
