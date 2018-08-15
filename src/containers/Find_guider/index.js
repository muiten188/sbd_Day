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
import * as findGuiderAction from "../../store/actions/containers/findGuider_action";
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

class FindGuider extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const locale = "vn";
    return (
      <Container style={styles.container}>
        <Button full block transparent onPress={() => { Actions.searchHistory() }}>
          <IconVector name='history' size={16} style={styles.colorHeader} />
          <Text uppercase={false} style={styles.colorHeader}>{I18n.t("historyView", {
            locale: "vn"
          })}</Text>
        </Button>
        <Grid style={styles.gridHistory}>
          <Row style={styles.headerHistory}>
            <Text style={{ fontSize: 15 }}>Thông tin tìm kiếm</Text>
          </Row>
          <Row style={styles.rowSearch}>
            <PickerHour></PickerHour>
          </Row>
          <Row style={styles.rowSearch}>
            <PickerDate></PickerDate>
          </Row>
          <Row style={styles.rowSearch}>
            <PickerLocation></PickerLocation>
          </Row>
          <Row style={styles.rowSearch}>
            <PickerGuider></PickerGuider>
          </Row>
          <Row style={styles.rowSearch}>
            <PickerLanguage></PickerLanguage>
          </Row>
        </Grid>
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 45,
          opacity: 0.9,
          backgroundColor: '#007db7'
        }}>
          <Button full block transparent>
            <IconVector name="search" size={20} style={styles.whileText}></IconVector>
            <Text uppercase={false} style={{ color: '#fff', paddingTop: 0 }}>{I18n.t("findGuider2", {
              locale: "vn"
            })}</Text>
          </Button>
        </View>
      </Container>
    );
  }


}
function mapStateToProps(state, props) {
  return {
    findGuiderReducer: state.findGuiderReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    findGuiderAction: bindActionCreators(findGuiderAction, dispatch)
  };
}

FindGuider = connect(mapStateToProps, mapToDispatch)(FindGuider);
export default FindGuider;
