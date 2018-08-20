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
import PickerHour from '../../components/picker_hour';
import PickerDate from '../../components/picker_date';
import PickerLocation from '../../components/picker_location';
import PickerGuider from '../../components/picker_guider';
import PickerLanguage from '../../components/picker_language';
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

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
    const locale = "vn";
    return (
      <Container style={styles.container}>
        
      </Container>
    );
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
