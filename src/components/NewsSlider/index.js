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
    setInterval(() => {
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
    if (intervalSlider) {
      clearInterval(intervalSlider);
    }
  }

  static navigationOptions = {
    header: null
  };

  render() {
    const { key, avatarUrl, item, listNews } = this.props;
    return (
      <View key={key} style={styles.itemList}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={{ width: '100%', height: 70 }}
          data={listNews}
          keyExtractor={this._keyExtractor}
          renderItem={this.buildMenuItem.bind(this)}
          horizontal={true}
          scrollEnabled={true}
        />
        <Button transparent style={{ width: 30, position: 'absolute', right: 0, top: 13, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            this.list.scrollToEnd()
          }}>
          <Icon style={{ opacity: 0.6 }} size={17} name="arrow-right"></Icon>
        </Button>
        <Button transparent style={{ width: 30, position: 'absolute', left: 0, top: 13, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            this.list.scrollToIndex({ index: 0 })
          }}>
          <Icon style={{ opacity: 0.6 }} size={17} name="arrow-left"></Icon>
        </Button>
      </View>
    );
  }

  buildMenuItem(dataItem) {
    var index = dataItem.index;
    var item = dataItem.item;
    const { listAllNews } = this.props;
    let _avartar = null;
    if (item.avatar) {
      _avartar = `${AppConfig.API_HOST_BASE}${item.avatar}`;
    }
    return (
      <TouchableOpacity style={{ padding: 5, borderRadius: 5, marginRight: 10, height: 60, width: 60, backgroundColor: index == this.state.indexSlider ? '#007db7' : '#cecece' }}
        onPress={() => { Actions.pop(), Actions.home({ screenId: 'newsDetaill', newsItem: item, listAllNews: listAllNews }) }}>
        <Image style={{ flex: 1 }} source={{ uri: _avartar ? _avartar : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/YouTube_play_buttom_icon_%282013-2017%29.svg/1280px-YouTube_play_buttom_icon_%282013-2017%29.svg.png' }}></Image>
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
