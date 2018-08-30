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
import YouTube from 'react-native-youtube'
import AutoHeightWebView from 'react-native-autoheight-webview';
import ImageZoom from 'react-native-image-pan-zoom';
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
      <Container style={styles.itemList}>
        {data.type == "IMAGE" ?
          <ImageZoom cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height}>
            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: _newsImage ? _newsImage : 'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-0/p160x160/37788759_376325759564081_7138969239251058688_n.jpg?_nc_cat=0&oh=866eee8eff38a889c92e554cdd113be2&oe=5C03A380' }}></Image>
          </ImageZoom>
          : null}
        {
          data.type == "VIDEO" && _video ?
            <Content style={{ width: '100%', minHeight: 220 }}>
              {/* <VideoPlayer video={{ uri: _video }}
                volume={0.7}
                onClosePressed={() => { }}
                playInBackground={false}
              /> */}
              <AutoHeightWebView source={{
                uri: data.path
              }}>

              </AutoHeightWebView>
              {/* <YouTube
                videoId="vvvvcpwFw5o"   // The YouTube video ID
                play={true}             // control playback of video with true/false
                fullscreen={false}       // control whether the video should play in fullscreen or inline
                loop={true}             // control whether the video should loop when ended
                apiKey={"AIzaSyCpumcHqM6clMWURCg2hwW0MefeA11hpfA"}
                //onReady={e => this.setState({ isReady: true })}
                //onChangeState={e => this.setState({ status: e.state })}
                //onChangeQuality={e => this.setState({ quality: e.quality })}
                //onError={e => this.setState({ error: e.error })}
                showFullscreenButton={false}
                style={{ alignSelf: 'stretch', height: 250 }}
              /> */}
            </Content> : null
        }
      </Container>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }
}
