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
import HeaderContent from "../../components/Header_content";
import * as changePasswordAction from "../../store/actions/containers/changePassword_action";
import Loading from "../../components/Loading";
import User from "../../components/User";
import { Field, reduxForm, change } from "redux-form";
import { InputAreaField, CheckBoxField, DropdownField, InputField } from "../../components/Element/Form";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as loginAction from "../../authen/actions/login_action";
// import { RNCamera, FaceDetector } from 'react-native-camera';
import * as helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;

const validateChangePassword = values => {
  const error = {};
  // 
  error.password = "";
  error.newPassword = "";
  error.rePassword = "";
  var password = values.password;
  var newPassword = values.newPassword;
  var rePassword = values.rePassword;
  if (values.password === undefined) {
    password = "";
  }
  if (values.newPassword === undefined) {
    newPassword = "";
  }
  if (values.rePassword === undefined) {
    rePassword = "";
  }
  if (password.length == 0 || password == "") {
    error.password = "trống";
  }
  if (newPassword.length == 0 || newPassword == "") {
    error.newPassword = "trống";
  }
  if (rePassword.length == 0 || rePassword == "") {
    error.rePassword = "trống";
  }
  if (newPassword.length > 0 && newPassword.length < 6) {
    error.newPassword = "ít nhất 6 ký tự";
  }
  if (rePassword.length > 0 && rePassword.length < 6) {
    error.rePassword = "ít nhất 6 ký tự";
  }
  if (!(rePassword.length == 0 || rePassword == "") && rePassword != newPassword) {
    error.rePassword = "Không khớp";
  }
  return error;
};

class ChangePassword extends Component {

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

  render() {
    const locale = "vn";
    const { user } = this.props.loginReducer;
    const { handleSubmit } = this.props;
    return (
      <Container style={styles.container}>
        <HeaderContent headerTitle={I18n.t("changePassword")} showButtonLeft={true} />
        <Grid style={styles.Grid}>

          <Row style={styles.row}>
            <Col size={1}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{I18n.t("userName")}</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                <Field
                  name="userName"
                  placeholder={I18n.t("userName")}
                  label={I18n.t("userName")}
                  component={InputField}
                  
                />
              </View>
            </Col>
          </Row>

          <Row style={styles.row}>
            <Col size={1}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{I18n.t("oldPassword")}</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                <Field
                  name="password"
                  placeholder={I18n.t("oldPassword")}
                  label={I18n.t("oldPassword")}
                  component={InputField}
                  
                />
              </View>
            </Col>
          </Row>

          <Row style={styles.row}>
            <Col size={1}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{I18n.t("newPassword")}</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                <Field
                  name="newPassword"
                  placeholder={I18n.t("newPassword")}
                  label={I18n.t("newPassword")}
                  component={InputField}
                  
                />
              </View>
            </Col>
          </Row>

          <Row style={styles.row}>
            <Col size={1}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{I18n.t("confirmPassword")}</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: '#cecece' }}>
                <Field
                  name="rePassword"
                  placeholder={I18n.t("confirmPassword")}
                  label={I18n.t("confirmPassword")}
                  component={InputField}
                  
                />
              </View>
            </Col>
          </Row>
          <Button block style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }}
            onPress={() => {
              handleSubmit((values) => { alert(JSON.stringify(values)) });
            }}
          >
            <Text>{I18n.t("changePassword")}</Text>
          </Button>
        </Grid>
      </Container >
    );
  }


}
function mapStateToProps(state, props) {
  return {
    changePasswordReducer: state.changePasswordReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    changePasswordAction: bindActionCreators(changePasswordAction, dispatch),
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}
ChangePassword = reduxForm({
  form: "changePwForm",
  validate: validateChangePassword,
  enableReinitialize: true
})(ChangePassword);
ChangePassword = connect(mapStateToProps, mapToDispatch)(ChangePassword);
export default ChangePassword;
