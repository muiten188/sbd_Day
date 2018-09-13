import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions
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
import Icon from "react-native-vector-icons/FontAwesome";
import * as notificationAction from "../../store/actions/containers/notification_action";
import IconVector from 'react-native-vector-icons/FontAwesome';
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as helper from '../../helper/index';
import AutoHeightWebView from 'react-native-autoheight-webview';
const blockAction = false;
const blockLoadMoreAction = false;

class Notification extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      languageSelect: 'vn'
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
    const { getNotification } = this.props.notificationAction;
    const { user } = this.props.loginReducer;
    getNotification({ pageSize: 1000 }, user);
  }
  componentDidUpdate(prevProps, prevState) {
    const { searchErorr } = this.props.notificationReducer;
    const { clearErrorSearch } = this.props.notificationAction;
    if (searchErorr) {
      Alert.alert(I18n.t('report'), I18n.t('getNotificationFail'), [{
        text: 'Ok',
        onPress: (e) => {
          clearErrorSearch();
        }
      }],
        { cancelable: false })
    }
  }

  render() {
    const { isLoading,
      listNotification,
      searchErorr } = this.props.notificationReducer;
    return (
      <Container style={styles.container}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={{ flex: 1, padding: 4 }}
          data={listNotification}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderFlatListItem.bind(this)}
          horizontal={false}
          numColumns={1}
        />
        <Loading isShow={isLoading}></Loading>
      </Container>
    );
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    return (<Grid style={{
      width: '100%', minHeight: 80, marginBottom: 6,
      paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.5,
      borderBottomColor: '#cecece'
    }}>
      <Col style={{ width: 80, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 60, height: 60 }} source={ require('../../resources/assets/icon/LogoThongBao-SBD-100px-x-100px.png')}></Image>
      </Col>
      <Col style={{ justifyContent: 'center', alignItems: 'flex-start', padding: 6,marginBottom:15 }}>
        <TouchableOpacity onPress={() => { Actions.notificationDetail({ notification: item }) }}>
          <Text style={{ fontWeight: '500', fontSize: 13 }}>{item.title}</Text>
          <AutoHeightWebView style={{ width:200,paddingTop: 10 }} source={{
            html: `${item.content}`
          }}></AutoHeightWebView>

        </TouchableOpacity>
        <View style={{ position: 'absolute', bottom: -5, right: 0 }}>
          <Text style={{ fontWeight: '100', fontSize: 12 }}>{item.createdDate ? `${new Date(item.createdDate).toLocaleTimeString()}   ${new Date(item.createdDate).toLocaleDateString()}` : ''} </Text>
        </View>
      </Col>
    </Grid >)
  }

  _keyExtractor(item, index) {
    return index;
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
    notificationReducer: state.notificationReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    notificationAction: bindActionCreators(notificationAction, dispatch)
  };
}

Notification = connect(mapStateToProps, mapToDispatch)(Notification);
export default Notification;
