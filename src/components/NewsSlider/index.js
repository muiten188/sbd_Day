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
export default class extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      indexSlider: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listNews !== this.state.listNews) {
      if (intervalSlider) {
        clearInterval(intervalSlider);
      }
      if (nextProps.listNews && nextProps.listNews.length > 0) {
        intervalSlider = setInterval(() => {
          console.log('change index slider')
          this.setState({
            indexSlider: this.state.indexSlider == nextProps.listNews.length - 1 ? 0 : this.state.indexSlider + 1
          })
        }, 5000)
      }
    }


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
    var urlAvartar = null;
    var _item = null;
    if (listNews.length > 0) {
      _item = listNews[this.state.indexSlider];
      if (_item && _item.thumbnail) {
        urlAvartar = AppConfig.API_HOST + _item.thumbnail.replaceAll("\\\\", "/")
      }
    }
    return (
      <TouchableOpacity key={key} style={styles.itemList}
        onPress={() => {
          if (_item) {
            Actions.newsPreview({ news: _item })
          }
        }}
      >
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
          source={{ uri: urlAvartar ? urlAvartar : 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }}
          style={styles.imageHotel}
        />
        <View style={styles.context}>
          <View style={styles.conInside}>
            <Text style={styles.textContext}></Text>
          </View>
          <Text style={styles.textContextTitle}>{this.textEclipse(_item ? _item.title : '')}</Text>
          <Text style={styles.textContext}>{this.textEclipseDes(_item ? _item.description : '')}</Text>
        </View>
        <View style={{ height: 4, width: '100%' }}>
          <Grid>
            <Row>
              <FlatList
                ref={ref => {
                  this.list = ref;
                }}
                style={{ flex: 1 }}
                data={listNews}
                keyExtractor={this._keyExtractor}
                renderItem={this.buildFooterBar.bind(this)}
                horizontal={true}
                scrollEnabled={false}
              />
            </Row>
          </Grid>
        </View>
      </TouchableOpacity>
    );
  }

  buildFooterBar(dataItem) {
    var index = dataItem.index;
    const { listNews } = this.props;
    var _width = width / listNews.length;
    return (
      <Col style={{ marginRight: 3, height: 4, width: _width, backgroundColor: index == this.state.indexSlider ? '#007db7' : '#cecece' }}>
        {/* <View style={{
          marginRight:5,
          backgroundColor: 'red'
        }}>
        <Text>abc</Text>
        </View> */}
      </Col>
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
