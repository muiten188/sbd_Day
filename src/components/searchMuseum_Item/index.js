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
import { View, Image, FlatList, ScrollView } from "react-native";
import IconVector from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";

import I18n from "../../i18n/i18n";
import * as AppConfig from "../../config/app_config";

const resolveAssetSource = require('resolveAssetSource');
//const userAvar = require("../../resources/assets/user.jpg")
let text = "Bảo tàng hồ chí minh"
export default class extends PureComponent {
  static navigationOptions = {
    header: null
  };

  render() {
    const { key, data } = this.props;
    var avatarUrl = null;
    if (data && data.imgProfile) {
      avatarUrl = `${AppConfig.API_HOST}${data.imgProfile}`
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
        <Grid>
          <Row style={{ width: '100%' }}>
            <Col style={styles.avatar}>
              <Thumbnail square style={{
                borderColor: '#e8eff5',
                borderWidth: 0.5,
                width: 100,
                height: 80,
                resizeMode: 'cover'
              }}
                source={{ uri: avatarUrl ? avatarUrl : 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
            </Col>
            <Col style={{
              paddingLeft: 6,
              paddingRight: 6
            }}>
              <Row style={styles.rowItem}>
                <Text style={styles.textBold}>{data ? data.museumName : ""}</Text>
              </Row>
              <Row style={styles.rowItemDes}>
                <ScrollView style={{ height: '100%' }}>
                  <Text style={{}}>{data ? data.description : ''}</Text>
                </ScrollView>
              </Row>
            </Col>
          </Row>
          {/* <Row style={styles.rowListAva}>
            <FlatList
              style={styles.listResult}
              data={[{}, {}, {}, {}, {}, {}]}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderFlatListItem.bind(this)}
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
              horizontal={true}
            />
          </Row> */}
          <Row style={{ height: 10 }}>
          </Row>
        </Grid>


      </View>
    );

  }
  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    return (
      <View
        key={item.index}
        style={
          styles.item_container_half
        }
        onPress={() => {
          // if (!blockAction) {
          //     blockAction = true;

          // }
        }}
      >
        <Thumbnail large style={{ borderColor: '#e8eff5', borderWidth: 0.5 }} source={{ uri: 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />


      </View>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }
  textEclipse(text) {
    return (((text).length > 20) ?
      (((text).substring(0, 20)) + '...') :
      text)
  }
}
