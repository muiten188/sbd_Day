import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import Register from '../../authen/containers/Register';
import Login from '../../authen/containers/Login';
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
        {user ?null:<Image
                  source={require("../../resources/assets/Honda-Logo.jpg")}
                  style={[styles.backgroundImage]}
        />}
        {user ? <View style={{ flex: 1 }}><User user={user} onLogout={this.onLogout.bind(this)}></User><Grid style={styles.Grid}>
          <Content>
            <Row style={styles.row}>
              <Col size={1}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Text>{I18n.t("fullName")}</Text>
                </View>
              </Col>
              <Col size={2}>
                <View style={{ flex: 1, marginTop: 5, borderColor: '#cecece' }}>
                  <Field
                    name="name"
                    placeholder={''}
                    label={I18n.t("fullName")}
                    component={InputField}
                    disabled
                  />
                </View>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col size={1}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Text>{I18n.t("email")}</Text>
                </View>
              </Col>
              <Col size={2}>
                <View style={{ flex: 1, marginTop: 5, borderColor: '#cecece' }}>
                  <Field
                    name="email"
                    placeholder={''}
                    label={I18n.t("email")}
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
              <View style={{ flex: 1,  marginTop: 5,  borderColor: '#cecece' }}>
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
              <View style={{ flex: 1,  marginTop: 5,  borderColor: '#cecece' }}>
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
          <Row style={{ position: 'absolute', bottom: 20 }}>
            <Button block style={{ width: '98%', marginLeft: 5, backgroundColor: '#007db7' }} onPress={this.onLogout.bind(this)}><Text>Đăng xuất</Text></Button>
          </Row></View> :
          <Grid>
            <Row>
              
            </Row>
            <Row style={{ height: 50, marginTop: 20}}>
              <Col>
                <Button block style={{ width: '98%', marginLeft: 5, backgroundColor: '#007db7' }} onPress={() => {
                  Actions.login()
                }}><Text>Đăng nhập</Text></Button>
              </Col>
              <Col>
                <Button block style={{ width: '98%', marginLeft: 5, backgroundColor: '#007db7' }} onPress={() => {
                  Actions.register()
                }}><Text>Đăng ký</Text></Button>
              </Col>

            </Row>
          </Grid>
          // <Register></Register>
          // <Login></Login>

        }

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
