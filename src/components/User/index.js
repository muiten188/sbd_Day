import React from "react";
const FBSDK = require('react-native-fbsdk');
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  UIManager,
  findNodeHandle,
  AsyncStorage,
  Alert
} from "react-native";
import { Button, Text, Thumbnail, Container, Badge } from "native-base";
import IconVector from "react-native-vector-icons/FontAwesome";
import * as loginAction from "../../authen/actions/login_action";
import * as appAction from "../../store/actions/app_action";
import * as AppConfig from "../../config/app_config";
import styles from "./styles";
import { Actions } from "react-native-router-flux";
import { Grid, Col, Row } from "react-native-easy-grid";
const { LoginButton, LoginManager, ShareDialog, AccessToken, GraphRequestManager, GraphRequest } = FBSDK;
const resolveAssetSource = require("resolveAssetSource");
const userAvar = require("../../resources/assets/user.jpg");
const ICON_SIZE = 24;


class user extends React.Component {
  handleShowPopupError = () => {
    // show error here
  };

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      username: "",
      fullName: "Tên Người Dùng",
      phoneNumber: "",
      birthDay: "",
      email: "",
      avatar: "",
      identification: ""
    };
  }


  componentDidMount() {

  }


  render() {
    const { state } = this;
    const { user, onLogout } = this.props;
    // var oUser = user.user;
    return (
      <View style={styles.viewContain}>
        <Grid>
          <Row style={styles.center}>
            <Thumbnail style={{ width: 130, height: 130, borderRadius: 100,borderWidth:1 }} source={{ uri: 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
          </Row>
        </Grid>
        <Button style={styles.logoutButton} onPress={onLogout} small={true}><Text>Đăng xuất</Text></Button>
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    //loginReducer: state.loginReducer,
  };
}
function mapToDispatch(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
    appAction: bindActionCreators(appAction, dispatch)
  };
}

user = connect(mapStateToProps, mapToDispatch)(user);
export default user;
