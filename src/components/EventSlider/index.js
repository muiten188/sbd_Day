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
import * as AppConfig from "../../config/app_config";
let intervalSlider = null;
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let _intervalSlider=null;
let currentListIndex = 0;
export default class extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      indexSlider: 0
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
    _intervalSlider = setInterval(() => {
      this.setState({ indexSlider: this.state.indexSlider == this.props.listNews.length - 1 ? 0 : this.state.indexSlider + 1 })
      try {
        this.list.scrollToItem({ item: this.props.listNews[this.state.indexSlider], animated: true })
      }
      catch (e) {
        //error 
      }
    }, 4000)
  }

  componentWillUnmount() {
    if (_intervalSlider) {
      clearInterval(_intervalSlider);
    }
  }

  static navigationOptions = {
    header: null
  };

  render() {
    const { key, avatarUrl, item, listNews } = this.props;
    var urlAvartar = null;
    var _item = null;
    if (listNews.length > 0) {
      _item = listNews[this.state.indexSlider];
      if (_item && _item.thumbnail) {
        urlAvartar = AppConfig.API_HOST + _item.thumbnail.replaceAll("\\\\", "/")
      }
    }
    return (
      <View key={key} style={styles.itemList}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={{ width: '100%', height: 95 }}
          data={[...listNews]}
          keyExtractor={this._keyExtractor}
          renderItem={this.buildMenuItem.bind(this)}
          horizontal={true}
          scrollEnabled={true}
        />
        <Button transparent style={{ width: 40, position: 'absolute', right: 0, top: 25, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            this.list.scrollToEnd()
          }}>
          <Icon size={20} name="arrow-right"></Icon>
        </Button>
        <Button transparent style={{ width: 40, position: 'absolute', left: 0, top: 25, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            this.list.scrollToIndex({ index: 0 })
          }}>
          <Icon size={20} name="arrow-left"></Icon>
        </Button>
      </View>
    );
  }

  buildMenuItem(dataItem) {
    var index = dataItem.index;
    const { listNews } = this.props;
    return (
      <TouchableOpacity style={{ padding: 5, borderRadius: 5, marginRight: 10, height: 90, width: 90, backgroundColor: index == this.state.indexSlider ? '#007db7' : '#cecece' }}
        onPress={() => { Actions.home({ screenId: 'eventList' }) }}>
        <Image style={{ flex: 1 }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/YouTube_play_buttom_icon_%282013-2017%29.svg/1280px-YouTube_play_buttom_icon_%282013-2017%29.svg.png' }}></Image>
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
