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
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import VideoPlayer from "../../components/VideoPlayer";
let _intervalSlider = null;
let currentListIndex = 0;
export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexSlider: 0
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
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
    const { data } = this.props;
    var _newsImage = null;
    var _video = null;
    if (data.type == "IMAGE" && data.path) {
      _newsImage = `${AppConfig.API_HOST_BASE}${data.path}`;
    } else if (data.type == "VIDEO" && data.path) {
      _video = `${AppConfig.API_HOST_BASE}${data.path}`;
    }
    return (
      <View style={styles.itemList}>
        {data.type == "IMAGE" ?
          <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: _newsImage ? _newsImage : 'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-0/p160x160/37788759_376325759564081_7138969239251058688_n.jpg?_nc_cat=0&oh=866eee8eff38a889c92e554cdd113be2&oe=5C03A380' }}></Image>
          : null}
        {
          data.type == "VIDEO" && _video ?
            <View style={{width:'100%',height:220}}>
              <VideoPlayer video={{ uri: _video }}
                volume={0.7}
                onClosePressed={() => { }}
                playInBackground={false}
              />
            </View> : null
        }
      </View>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }
}
