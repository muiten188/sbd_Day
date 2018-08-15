import React, { PureComponent, Component } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  H3,
  H2,
  H1,
  Item,
  Thumbnail
} from "native-base";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
import * as AppConfig from "../../config/app_config";
const resolveAssetSource = require('resolveAssetSource');
const userAvar = require("../../resources/assets/user.jpg")
let text = "Bảo tàng hồ chí minh"

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
export default class extends PureComponent {
  static navigationOptions = {
    header: null
  };

  render() {
    const { ikey, avatarUrl, item } = this.props;
    var urlAvartar = null;
    if (item.thumbnail) {
      urlAvartar = AppConfig.API_HOST + item.thumbnail.replaceAll("\\\\", "/")
    }
    return (
      <View style={styles.itemList}>{
        ikey == 0 ?
          <View style={styles.itemList}>
            <View style={{ width: '100%' }}>
              {/* <Thumbnail
          style={styles.thumbnail_avatar}
          source={avatarUrl ? {
            uri: `${avatarUrl}`
          } : userAvar
          }
          ref={(thumbnail) => { this.thumbnail = thumbnail; }}
          onError={(e) => {
            this.thumbnail.setNativeProps({ src: [resolveAssetSource(userAvar)] })
          }}
        /> */}
              <Image
                source={{ uri: urlAvartar }}
                style={styles.imageHotel}
              />

            </View>
            <View style={styles.context}>

              <Text style={styles.textContextTitle}>{this.textEclipse(item.title)}</Text>
              <Text style={styles.textContextDes}>{this.textEclipseDes(item.description)}</Text>

            </View>
          </View>
          : <View style={styles.itemList}>
            <Grid>
              <Col size={0.55}>
                <Image
                  source={{ uri: urlAvartar }}
                  style={styles.imageHotel2}
                />
              </Col>
              <Col>
                <View style={[styles.context, { paddingLeft: 6}]}>

                  <Text style={styles.textContextTitle}>{this.textEclipseDes(item.title)}</Text>
                  <Text style={styles.textContextDes}>{this.textEclipseDes(item.description)}</Text>

                </View>
              </Col>
            </Grid>
          </View>
      }</View>
    );
  }
  textEclipse(text) {
    return (((text).length > 50) ?
      (((text).substring(0, 50)) + '...') :
      text)
  }
  textEclipseDes(text) {
    return (((text).length > 120) ?
      (((text).substring(0, 120)) + '...') :
      text)
  }
}
