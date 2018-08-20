import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
const FBSDK = require('react-native-fbsdk');
const { LoginManager } = FBSDK;
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
import { InputField } from "../../components/Element/Form/index";
import IconVector from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as profileAction from "../../store/actions/containers/profile_action";
import Loading from "../../components/Loading";
import User from "../../components/User";
import { Field, reduxForm, change } from "redux-form";
import { InputAreaField, CheckBoxField, DropdownField } from "../../components/Element/Form";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as loginAction from "../../authen/actions/login_action";
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
    helper.clearAsyncStorage();
    loginAction.logout();
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
          <Row style={styles.row}>
            <Col>
              <Field
                icon="user-circle-o"
                name="quatityNormal"
                placeholder={I18n.t("normal")}
                label={I18n.t("normal")}
                selected={0}
                items={["bach1", "bach2", "bach3", "bach4", "bach5"]}
                component={DropdownField}
              />
            </Col>
            <Col>
            </Col>
            <Col>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }


}
function mapStateToProps(state, props) {
  return {
    profileReducer: state.profileReducer,
    loginReducer: state.loginReducer
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
