import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
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
  ListItem,
  Left,
  CheckBox,
  Icon,
  Right,
  Picker
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import IconVector from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as profileAction from "../../store/actions/containers/profile_action";
import Loading from "../../components/Loading";
import User from "../../components/User";
import { Field, reduxForm, change } from "redux-form";
import { InputAreaField, CheckBoxField, DropdownField, InputField } from "../../components/Element/Form";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as loginAction from "../../authen/actions/login_action";
import FcmClient from '../../helper/fcmClient';

// import { RNCamera, FaceDetector } from 'react-native-camera';
import * as helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;

const validateProfile = values => {
  const error = {};
  error.username = "";
  error.password = "";
  var username = values.username;
  var password = values.password;
  if (values.username === undefined) {
    username = "";
  }
  if (values.password === undefined) {
    password = "";
  }
  if (username.length == 0 || username == "") {
    error.username = "trống";
  }
  if (password.length == 0 || password == "") {
    error.password = "trống";
  }
  return error;
};

class Profile extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      backgroundVideo: false,
      notification: false,
      languageSelect: 'vi'
    }
    this.loadSetting();
  }

  componentDidMount() {
    const { user } = this.props.loginReducer;

  }

  async loadSetting() {
    // var backgroundVideoSetting = await helper.getBackgroundVideoSetting();
    // var notifiSetting = await helper.getnotifiSetting()

    // if (backgroundVideoSetting != null) {
    //   this.setState({
    //     backgroundVideo: backgroundVideoSetting
    //   })
    // }
    // if (notifiSetting != null) {
    //   this.setState({
    //     notification: notifiSetting
    //   })
    // }
    var lang = await helper.getLangSetting();
    if (lang != null) {
      I18n.locale = lang;
      this.setState({
        languageSelect: lang
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  onLogout() {
    const { loginAction } = this.props;
    const { user } = this.props.loginReducer;
    //helper.clearAsyncStorage();
    loginAction.logout();
    FcmClient.unRegisterFCM(user.userId);
    try {
      LoginManager.logOut();
    } catch (error) {

    }
    // Actions.reset('login');
  }

  // settingVideoChange() {
  //   this.setState({
  //     backgroundVideo: !this.state.backgroundVideo
  //   })
  //   helper.setAsyncStorage("@backgroundVideo", !this.state.backgroundVideo);
  //   helper.backgroundVideoSetting = !this.state.backgroundVideo
  // }

  // settingNotifiChange() {
  //   this.setState({
  //     notification: !this.state.notification
  //   })
  //   helper.setAsyncStorage("@notifi", !this.state.notification);
  //   helper.notifiSetting = !this.state.notification
  // }

  render() {
    const locale = "vn";
    const { user } = this.props.loginReducer;

    const { handleSubmit } = this.props;
    return (
      <Container style={styles.container}>
        {true ? <User user={user} onLogout={this.onLogout.bind(this)}></User> :
          <Button full
            onPress={() => {
              Actions.login();
            }}
            style={{ margin: 15 }}>
            <Text>Đăng nhập</Text>
          </Button>}
        <Grid style={styles.Grid}>
          <Content>
            <Row style={styles.row}>
              <Col size={1}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>{I18n.t("fullName")}</Text>
                </View>
              </Col>
              <Col size={2}>
                <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                  <Field
                    name="fullName"
                    placeholder={I18n.t("fullName")}
                    label={I18n.t("fullName")}
                    component={InputField}
                    disabled
                  />
                </View>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col size={1}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>{I18n.t("phone")}</Text>
                </View>
              </Col>
              <Col size={2}>
                <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                  <Field
                    name="phoneNumber"
                    placeholder={I18n.t("phone")}
                    label={I18n.t("phone")}
                    component={InputField}
                    disabled
                  />
                </View>
              </Col>
            </Row>

            <Row style={styles.row}>
              <Col size={1}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>{I18n.t("email")}</Text>
                </View>
              </Col>
              <Col size={2}>
                <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                  <Field
                    name="email"
                    placeholder={I18n.t("email")}
                    label={I18n.t("email")}
                    component={InputField}
                    disabled
                  />
                </View>
              </Col>
            </Row>

            <Row style={styles.row}>
              <Col size={1}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>{I18n.t("Company")}</Text>
                </View>
              </Col>
              <Col size={2}>
                <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                  <Field
                    name="companyName"
                    placeholder={I18n.t("Company")}
                    label={I18n.t("Company")}
                    component={InputField}
                    disabled
                  />
                </View>
              </Col>
            </Row>

            {/* <Row style={styles.row}>
            <Col size={1}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{I18n.t("position")}</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                <Field
                  name="phoneNumber"
                  placeholder={I18n.t("position")}
                  label={I18n.t("position")}
                  component={InputField}
                  disabled
                />
              </View>
            </Col>
          </Row> */}

            {/* <Row style={styles.row}>
            <Col size={1}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{I18n.t("position")}</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                <Field
                  name="email"
                  placeholder={I18n.t("position")}
                  label={I18n.t("position")}
                  component={InputField}
                  disabled
                />
              </View>
            </Col>
          </Row> */}
            {/* <Button block style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }}
            onPress={() => { Actions.changePassword() }}>
            <Text>{I18n.t("changePassword")}</Text>
          </Button> */}
          </Content>
        </Grid>
      </Container >
    );
  }


}
function mapStateToProps(state, props) {
  var _user = Object.assign({}, state.loginReducer.user)
  _user.fullName = _user.lastName + " " + _user.firstName;
  return {
    profileReducer: state.profileReducer,
    loginReducer: state.loginReducer,
    initialValues: _user
  };
}
function mapToDispatch(dispatch) {
  return {
    profileAction: bindActionCreators(profileAction, dispatch),
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}
Profile = reduxForm({
  form: "profileForm",
  validate: validateProfile,
  enableReinitialize: true
})(Profile);
Profile = connect(mapStateToProps, mapToDispatch)(Profile);
export default Profile;
