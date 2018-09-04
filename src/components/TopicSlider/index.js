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
      this.setState({ indexSlider: this.state.indexSlider == this.props.listTopic.length - 1 ? 0 : this.state.indexSlider + 1 })
      try {
        this.list.scrollToItem({ item: this.props.listTopic[this.state.indexSlider], animated: true })
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
    const { key, avatarUrl, item, listTopic } = this.props;
    return (
      <View key={key} style={styles.itemList}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={{ width: '100%', height: 70 }}
          data={[...listTopic]}
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
    const { listTopicAll } = this.props;
    return (
      <TouchableOpacity style={{ padding: 5, borderRadius: 5,justifyContent: "center",
      alignItems: "center", marginRight: 10, height: 60, width: 60, backgroundColor: index == this.state.indexSlider ? '#007db7' : '#cecece' }}
        onPress={() => { Actions.pop(),Actions.home({ screenId: 'presentationDetail', scheduleItem: item, scheduleAllItem: listTopicAll }) }}>
        {/* <Image style={{ flex: 1 }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/YouTube_play_buttom_icon_%282013-2017%29.svg/1280px-YouTube_play_buttom_icon_%282013-2017%29.svg.png' }}></Image> */}
        <Icon name="tasks" size={30}></Icon>
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
