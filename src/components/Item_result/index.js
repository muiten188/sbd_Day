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
    const { key, avatarUrl, item } = this.props;
    var urlAvartar = '';
    if (item.imgProfile) {
      urlAvartar = AppConfig.API_HOST + item.imgProfile.replaceAll("\\\\", "/");
    }
    return (
      <View key={key} style={styles.itemList}>
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
        <View style={styles.context}>
          <View style={styles.conInside}>
            <Text style={styles.textContext}></Text>
          </View>
          <Text style={styles.textContext}>{item.museumName}</Text>

        </View>


      </View>
    );
  }
  textEclipse(text) {
    return (((text).length > 20) ?
      (((text).substring(0, 20)) + '...') :
      text)
  }
}
