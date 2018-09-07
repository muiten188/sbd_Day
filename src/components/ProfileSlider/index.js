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
  Thumbnail,
} from "native-base";
import { View, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
import YouTube from 'react-native-youtube';
import * as AppConfig from "../../config/app_config";
let intervalSlider = null;
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let _intervalSlider = null;
let currentListIndex = 0;
export default class extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  static navigationOptions = {
    header: null
  };

  render() {
    const { key, avatarUrl, item, data } = this.props;

    return (
      <View key={key} style={styles.itemList}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={{ width: '100%' }}
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this.buildMenuItem.bind(this)}
          horizontal={true}
        />
      </View>
    );
  }

  buildMenuItem(dataItem) {
    var index = dataItem.index;
    var item = dataItem.item;
    const { data } = this.props;
    var _newsImage = null;
    if (item.type == "IMAGE" && item.path) {
      _newsImage = `${AppConfig.API_HOST_BASE}${item.path}`;
    }
    console.log('item render')
    return (
      <TouchableOpacity
        style={{ padding: 1, borderRadius: 5, marginRight: 10, height: 180, width: width }}
        onPress={() => {
          if (item.type == "IMAGE") {
            Actions.preview({ data: item })
          }
        }}>
        {item.type == "VIDEO" ?
          <Image style={{ width:width,height:'100%', borderRadius: 5,resizeMode:'stretch',backgroundColor:'red' }} source={_newsImage?{ uri:_newsImage  }:require("../../resources/assets/Image_VideoTrailerSBDDay.png")}></Image>
          :
          <Image style={{ width: width, height: '100%', borderRadius: 5 }} source={{ uri: _newsImage }}></Image>
        }
      </TouchableOpacity>
    )
  }

  _keyExtractor(item, index) {
    return index;
  }

  textEclipse(text) {
    return (((text).length > 30) ?
      (((text).substring(0, 30)) + '...') :
      text)
  }

  textEclipseDes(text) {
    return (((text).length > 60) ?
      (((text).substring(0, 60)) + '...') :
      text)
  }
}
