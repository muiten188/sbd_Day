import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  H3,
  H5,
  Item,
  Input
} from "native-base";
import { StatusBar, Image, Platform } from 'react-native';
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Grid, Col, Row } from "react-native-easy-grid/";
import styles from "./styles";
import I18n from "../../i18n/i18n";
import { Actions } from 'react-native-router-flux';
//import Presentation from '../../containers/Presentation';
export default class extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      textSearch: ''
    }
  }
  render() {
    let _onBack = () => {
      Actions.pop();
    };
    const {
      showButtonLeft,
      headerTitle,
      onBack,
      hideRightButton,
      search,
      onSearch
    } = this.props;
    if (onBack) {
      _onBack = onBack;
    }
    return (
      <Header style={[styles.header, Platform.OS === 'ios' ? { height: 65 } : { height: 45 }]}>
        {/* <StatusBar backgroundColor="#007db7"></StatusBar> */}
        <Grid>
          {showButtonLeft == true ? (
            <Col style={styles.itemButtonHeader}>
              <Button transparent onPress={_onBack} style={{ width: '100%' }}>
                <IconVector name="chevron-circle-left" size={20} style={styles.whileText} />
              </Button>
            </Col>
          ) : null}
          {
            !search ? <Col style={styles.itemHeaderBody}>
              <Row>
                <Col style={styles.iconTitle}>
                  <Image source={require("../../resources/assets/icon_title.png")} style={{ height: 35, resizeMode: 'contain' }}></Image>
                </Col>
                <Col style={styles.itemHeaderBody}>
                  <Text style={styles.whileText}>{headerTitle ? headerTitle : I18n.t("saobacdau_event")}</Text>
                </Col>
              </Row>

            </Col> :
              <Col style={styles.itemHeaderBody}>
                <Row>
                  <Input style={{ color: '#fff' }} placeholder={I18n.t("find", {
                    locale: "vn"
                  })} placeholderTextColor={"#fff"} value={this.state.textSearch} onChangeText={(value) => { this.setState({ textSearch: value }); onSearch(value) }} />
                </Row>

              </Col>
          }

          {!hideRightButton ?
            <Col style={styles.itemHeaderEnd}>
              <Button transparent onPress={() => {
                if (onSearch) {
                  onSearch(this.state.textSearch)
                }
                else {
                  Actions.Presentation();
                }
              }}>
                <IconVector name="search" size={20} style={{ color: '#fff' }} />
              </Button>
            </Col>
            : null
          }
          {!hideRightButton ?
            <Col style={styles.itemHeaderEnd}>
              <Button transparent onPress={() => { Actions.qrScanner() }}>
                <IconIonicons name="md-qr-scanner" size={24} style={{ color: '#fff' }} />
              </Button>
            </Col>
            : null
          }

        </Grid>
      </Header>
    );
  }
}
