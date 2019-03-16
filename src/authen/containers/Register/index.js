import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  AsyncStorage,
  Alert,
  NativeModules
} from "react-native";
import {
  Container,
  Spinner,
  Text,
  Button,
  Header,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Thumbnail,
  Picker,
  Left,
  Right
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import theme from "../../../themes/default/styles";
import * as registerAction from "../../actions/register_action";
import I18n from "../../../i18n/i18n";
import { Field, reduxForm } from "redux-form";
import { InputField } from "../../../components/Element/Form";
import Loading from "../../../components/Loading";
import { Actions } from "react-native-router-flux";
import * as types from "../../../store/constants/action_types";
import * as helper from "../../../helper";
const username = "";
const password = "";
const confirmPassword = "";
const name = "";
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined
const validate = values => {
  const error = {};
  error.username = "";
  error.password = "";
  error.confirmPassword = "";
  error.name = "";
  error.email = "";
  var username = values.username;
  var password = values.password;
  var confirmPassword = values.confirmPassword;
  var name = values.name;
  var email = values.email;
  if (values.username === undefined) {
    username = "";
  }
  if (values.password === undefined) {
    password = "";
  }
  if (values.confirmPassword === undefined) {
    confirmPassword = "";
  }
  if (values.name === undefined) {
    name = "";
  }
  if (values.email === undefined) {
    email = "";
  }
  if (username.length == 0 || username == "") {
    error.username = "trống";
  }
  if (password.length == 0 || password == "") {
    error.password = "trống";
  }
  if (confirmPassword.length == 0 || confirmPassword == "") {
    error.confirmPassword = "trống";
  }
  if (confirmPassword !== password) {
    error.confirmPassword = "không khớp";
  }
  if (name.length == 0 || name == "") {
    error.name = "trống";
  }
  if (email.length == 0 || email == "") {
    error.email = "trống";
  }
  return error;
};

class register extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      languageSelect: "vn",
      selected1: "key1",
      results: {
        items: []
      }
    };
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {
    const { registerAction } = this.props;
    const { registerReducer } = this.props;
  }

  onValueChange(value) {
    this.setState({
      languageSelect: value
    });
  }

  componentDidUpdate() {
    const { registerReducer, registerAction } = this.props;
    if (registerReducer.action && registerReducer.action.type != types.REGISTER_CLEAR) {
      if (
        registerReducer.registed != null &&
        registerReducer.registed == false &&
        registerReducer.registed == false
      ) {
        Alert.alert("Thông báo", "Đăng ký thất bại", [{
          text: 'Ok',
          onPress: (e) => {
            registerAction.clearRegister();
          }
        }],
          { cancelable: false });
      }
      else if (registerReducer.registed == true) {
        Alert.alert("Thông báo", "Đăng ký thành công", [{
          text: 'Ok',
          onPress: (e) => {
            registerAction.clearRegister();
            Actions.reset('login');
          }
        }],
          { cancelable: false });

      }
    }
  }

  render() {
    const { registerAction, handleSubmit, submitting, registerReducer } = this.props;
    const locale = "vn";
    // if (
    //   registerReducer.Logged != null &&
    //   registerReducer.Logged == false &&
    //   registerReducer.registing == false
    // ) {
    //   Alert.alert("Thông báo", "Đăng nhập thất bại");
    //   registerReducer.Logged = null;
    // }

    return (
      <Container

      >

        <Loading isShow={registerReducer.registing} />
        {/* background */}
        {/* <Image
          source={require("../../../resources/assets/splash1.png")}
          style={[styles.backgroundImage]}
        /> */}
        <Content contentContainerStyle={{ justifyContent: 'center', alignItems: "center"}}>
          <View style={styles.loginform}>
            <Form style={styles.form}>
              <View style={styles.item}>
                {/* <Icon active name="person" /> */}
                <Field
                  icon="user-circle-o"
                  name="name"
                  placeholder={I18n.t("lastName", {
                    locale: locale ? locale : "vi"
                  })}
                  component={InputField}
                />
              </View>
              <View style={styles.item}>
                {/* <Icon active name="person" /> */}
                <Field
                  icon="user-circle-o"
                  name="email"
                  placeholder={I18n.t("email", {
                    locale: locale ? locale : "vi"
                  })}
                  validate={email}
                  component={InputField}
                />
              </View>
              <View style={styles.item}>
                {/* <Icon active name="person" /> */}
                <Field
                  icon="user-circle-o"
                  name="username"
                  placeholder={I18n.t("account", {
                    locale: locale ? locale : "vi"
                  })}
                  component={InputField}
                />
              </View>
              <View style={styles.item}>
                {/* <Icon active name="lock" /> */}
                <Field
                  icon="key"
                  name="password"
                  placeholder={I18n.t("password", {
                    locale: locale ? locale : "vi"
                  })}
                  secureTextEntry={true}
                  component={InputField}
                />
              </View>
              <View style={styles.item}>
                {/* <Icon active name="lock" /> */}
                <Field
                  icon="key"
                  name="confirmPassword"
                  placeholder={I18n.t("confirmPassword", {
                    locale: locale ? locale : "vi"
                  })}
                  secureTextEntry={true}
                  component={InputField}
                />
              </View>
              <Button
                full
                style={[styles.buttonLogin, { backgroundColor: '#007db7' }]}
                onPress={handleSubmit(registerAction.register)}
              >
                <Text>
                  {I18n.t("register", {
                    locale: this.state.languageSelect
                      ? this.state.languageSelect
                      : "vi"
                  })}
                </Text>
              </Button>
              <Button transparent block dark style={[styles.buttonLogin]}
                onPress={() => {
                  Actions.login()
                }}>
                <Text uppercase={false} >
                  {I18n.t("login", {
                    locale: this.state.languageSelect
                      ? this.state.languageSelect
                      : "vi"
                  })}
                </Text>
              </Button>
            </Form>
            {/* <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._googleSignIn.bind(this)}
          /> */}
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    registerReducer: state.registerReducer,
    initialValues: state.registerReducer.userForm
      ? state.registerReducer.userForm
      : {
        name: "",//"Bùi đình"
        username: "",//"bachbd"
        password: "",//"123456a@"
        confirmPassword: ""//'123456a@'
      }
  };
}
function mapToDispatch(dispatch) {
  return {
    registerAction: bindActionCreators(registerAction, dispatch)
  };
}

register = reduxForm({
  form: "RegisterForm",
  validate,
  enableReinitialize: true
})(register);
register = connect(mapStateToProps, mapToDispatch)(register);
export default register;
