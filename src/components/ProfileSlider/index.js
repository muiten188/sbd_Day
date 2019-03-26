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
    this.state = {
      indexSlider: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    let { data } = nextProps;
    if (data && data.length > 1) {
      if(_intervalSlider){
        clearInterval(_intervalSlider);
      }
      _intervalSlider=setInterval(() => {
        this.setState({ indexSlider: this.state.indexSlider == data.length - 1 ? 0 : this.state.indexSlider + 1 })
        try {
          this.list.scrollToItem({ item: data[this.state.indexSlider], animated: true })
        }
        catch (e) {
          //error 
        }
      }, 4000)
    }
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
    var _data=[];
    if(data.length>0){
      _data=data;
    }
    return (
      <View key={key} style={styles.itemList}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={{ width: '100%' }}
          data={_data}
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
    var productAvatar = null;
    if (item.avatar) {
      productAvatar = `${AppConfig.API_HOST_BASE}${item.avatar}`;
    }
    console.log('item render')
    return (
      <TouchableOpacity
        style={{ padding: 1, borderRadius: 5, marginRight: 10, height: 180, width: width }}
        onPress={() => {
          Actions.home({ screenId: 'productDetail', product: item, listProduct: data });
        }}>
        {item.avatar ?
          <Image style={{ width: width, height: '100%', borderRadius: 5, resizeMode: 'stretch' }} source={{ uri: productAvatar }}></Image>
          :
          <Image style={{ width: width, height: '100%', borderRadius: 5, resizeMode: 'stretch' }} source={require("../../resources/assets/Image_VideoTrailerSBDDay.png")}></Image>
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
