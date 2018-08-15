import React, { Component } from "react";
const FBSDK = require('react-native-fbsdk');
import {
  TouchableOpacity,
  Image,
  View,
  AsyncStorage,
  Alert,
  NativeModules,
  ScrollView,
  Keyboard
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
import * as loginAction from "../../actions/login_action";
import I18n from "../../../i18n/i18n";
import { Field, reduxForm } from "redux-form";
import { InputField } from "../../../components/Element/Form";
import Loading from "../../../components/Loading";
import { Actions } from "react-native-router-flux";
const { LoginButton, LoginManager, ShareDialog, AccessToken, GraphRequestManager, GraphRequest } = FBSDK;
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import * as helper from "../../../helper";
import PropTypes from 'prop-types';
const username = "";
const password = "";

const validateLogin = values => {
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
class login extends React.Component {
  static navigationOptions = {
    header: null
  };

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
      if (result.isCancelled) {
        console.log("Login Cancelled");
      } else {
        console.log("Login Success permission granted:" + result.grantedPermissions);
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            let accessToken = data.accessToken;
            //alert(accessToken.toString());

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              },
              this.responseInfoCallback.bind(this)
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();

          })
      }
    }, function (error) {
      console.log("some error occurred!!");
    })
  }


  constructor(props) {
    super(props);

    this.state = {
      languageSelect: "vn",
      selected1: "key1",
      results: {
        items: []
      }
    };
    I18n.defaultLocale = "vn";
    I18n.locale = "vn";
    // I18n.currentLocale();
    // AccessToken.getCurrentAccessToken().then(
    //   (data) => {
    //     if (data) {
    //       let accessToken = data.accessToken;

    //       const infoRequest = new GraphRequest(
    //         '/me',
    //         {
    //           accessToken: accessToken,
    //           parameters: {
    //             fields: {
    //               string: 'email,name,first_name,middle_name,last_name'
    //             }
    //           }
    //         },
    //         this.responseInfoCallback.bind(this)
    //       );

    //       // Start the graph request.
    //       new GraphRequestManager().addRequest(infoRequest).start();
    //     }
    //   })
    this.loadSetting();
  }

  async loadSetting() {
    var lang = await helper.getLangSetting();
    if (lang != null) {
      I18n.locale=lang;
      this.setState({
        languageSelect: lang
      })
    }
  }


  componentWillMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true });
    GoogleSignin.configure({
      iosClientId: '229107549229-aqk0kgvqoa6ke3e7il56mcrvtqh3q3n8.apps.googleusercontent.com',
      webClientId: '229107549229-mqe085vtq1s6pt07frl00ptcnjb0c7t7.apps.googleusercontent.com'
    })
  }

  componentDidMount() {
    const { loginAction } = this.props;
    const { loginReducer } = this.props;
    //this._setupGoogleSignin();
    const { setUser } = this.props.loginAction;
    helper.getAsyncStorage("@userLogin", (promise) => {
      promise.done((value) => {
        if (value != '' && value != null) {
          var user = JSON.parse(value);
          setUser(user);
        }
      })
    })
  }

  onValueChange(value) {
    I18n.locale = value;
    this.setState({
      languageSelect: value
    });
    
    helper.setAsyncStorage('@lang',value);
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true })
      // const configPlatform = {
      //   ...Platform.select({
      //     ios: {
      //       iosClientId: config.iosClientId
      //     },
      //     android: {}
      //   })
      // }

      await GoogleSignin.configure({
        //...configPlatform,
        webClientId: '229107549229-mqe085vtq1s6pt07frl00ptcnjb0c7t7.apps.googleusercontent.com',
        offlineAccess: false
      })

      const user = await GoogleSignin.currentUserAsync()

      console.log(user)
      this.setState({ user })
    } catch (err) {
      console.warn('Google signin error', err.code, err.message)
    }
  }

  _googleSignIn() {
    const { loginAction } = this.props;
    GoogleSignin.signIn()
      .then(user => {
        console.log(user)
        this.setState({ user: user })
        loginAction.login_Socail(user, "GOOGLE");
      })
      .catch(err => {

        console.warn(err)
      })
      .done()
  }

  _googleSignOut() {
    GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => {
        this.setState({ user: null })
      })
      .done()
  }

  componentDidUpdate() {
    const { loginReducer } = this.props;
    if (
      loginReducer.Logged != null &&
      loginReducer.Logged == false &&
      loginReducer.Loging == false
    ) {
      Alert.alert("Thông báo", "Đăng nhập thất bại");
      loginReducer.Logged = null;
    }
    else if (loginReducer.Logged == true) {
      helper.setAsyncStorage("@userLogin", loginReducer.user);
      // Actions.reset('home');
      Actions.pop();
    }
  }
  render() {
    const { loginAction, handleSubmit, submitting, loginReducer } = this.props;
    const locale = "vn";

    return (
      <Container

      >

        <Loading isShow={loginReducer.Loging} />
        {/* background */}
        <Image
          source={require("../../../resources/assets/splash1.png")}
          style={[styles.backgroundImage]}
        />

        <View style={styles.screen}>
          <View style={styles.loginform}>
            <Grid style={{ width: '100%' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Form style={styles.form}>
                  <View style={styles.item}>
                    {/* <Icon active name="person" /> */}
                    <Field
                      icon="user-circle-o"
                      name="username"
                      placeholder={I18n.t("account")}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    {/* <Icon active name="lock" /> */}
                    <Field
                      icon="key"
                      name="password"
                      placeholder={I18n.t("password")}
                      secureTextEntry={true}
                      component={InputField}
                    />
                  </View>
                  <Button
                    full
                    style={[styles.buttonLogin, { backgroundColor: '#007db7' }]}
                    onPress={handleSubmit(loginAction.login)}
                  >
                    <Text>
                      {I18n.t("login")}
                    </Text>
                  </Button>
                  <Grid>
                    <Col>
                      <Button transparent dark style={[styles.buttonLogin]}
                        onPress={() => {
                          Actions.register();
                        }}>
                        <Text uppercase={false} >
                          {I18n.t("register")}
                        </Text>
                      </Button>
                    </Col>
                    <Col size={1.5}>
                      <Button transparent dark style={[styles.buttonLogin]} >
                        <Text uppercase={false} >
                          {I18n.t("forgotPassword")}
                        </Text>
                      </Button>
                    </Col>
                  </Grid>


                </Form>
              </Row>
              {/* <Row style={{ height: 50 }}>
                <Col style={{ paddingRight: 2 }}>
                  <Button block onPress={this._fbAuth.bind(this)} style={[styles.buttonLogin, styles.buttonLoginFb]}>
                    <Text>Facebook</Text>
                  </Button>
                </Col>
                <Col style={{ paddingLeft: 2 }}>
                  <Button block onPress={this._googleSignIn.bind(this)} style={[styles.buttonLogin, styles.buttonLoginGg]}  >
                    <Text>Google</Text>
                  </Button>
                </Col>
              </Row> */}
            </Grid>
            {/* <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._googleSignIn.bind(this)}
          /> */}
          </View>
        </View>
        <View style={{
          position: 'absolute', bottom: 0, left: 0,
          right: 0, height: 50, backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 130, color: '#fff' }}
            selectedValue={this.state.languageSelect}
            onValueChange={this.onValueChange.bind(this)}
            textStyle={{ color: '#fff' }}
          >
            <Picker.Item label="Việt Nam" value="vn" />
            <Picker.Item label="English" value="en" />
          </Picker>
        </View>
      </Container>
    );
  }
  //facebook call back
  responseInfoCallback(error, result) {
    const { loginAction } = this.props;
    if (error) {
      alert('đăng nhập facebook thất bại.')
      //alert('Error fetching data: ' + error.toString());
    } else {
      console.log(result)
      //alert('login :' + result.name)
      loginAction.login_Socail(result, "FACEBOOK");
      //alert('Success fetching data: ' + result.toString());
    }
  }


}



login.propTypes = {
  loginAction: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  loginReducer: PropTypes.object
};

function mapStateToProps(state, props) {
  return {
    loginReducer: state.loginReducer,
    initialValues: state.loginReducer.userForm
      ? state.loginReducer.userForm
      : {
        username: "",//admin
        password: ""//"123456a@"
      }
  };
}
function mapToDispatch(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}

login = reduxForm({
  form: "LoginForm",
  validate: validateLogin,
  enableReinitialize: true
})(login);
login = connect(mapStateToProps, mapToDispatch)(login);
export default login;
