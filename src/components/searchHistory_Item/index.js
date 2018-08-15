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
import { View, Image, FlatList } from "react-native";
import IconVector from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";

import I18n from "../../i18n/i18n";
import * as AppConfig from "../../config/app_config";
import StarRating from 'react-native-star-rating';
const resolveAssetSource = require('resolveAssetSource');
const userAvar = require("../../resources/assets/user.jpg")
let text = "Bảo tàng hồ chí minh"
export default class extends PureComponent {
  static navigationOptions = {
    header: null
  };

  render() {
    const { key, userName, position, phone, avatarUrl, item } = this.props;
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
              <Thumbnail large style={{ borderColor: '#e8eff5', borderWidth: 0.5 }} source={{ uri: 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
              <StarRating
                disabled={false}
                maxStars={5}
                rating={2}
                selectedStar={(rating) => { rating }}
                fullStarColor={'yellow'}
                starSize={16}
              />
            </Col>
            <Col style={{
              paddingLeft: 6,
              paddingRight: 6
            }}>
              <Row style={styles.rowItem}>
                <Col size={70}>
                  <Text style={styles.textBlue}><IconVector name="calendar" size={18} style={styles.iconItem}></IconVector>{" Thứ 5, 12/10/2017"}</Text>
                </Col>
                <Col size={30} style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.textBlue}><IconVector name="clock-o" size={18} style={styles.iconItem}></IconVector>{" 08:00"}</Text>
                </Col>
              </Row>
              <Row style={styles.rowItem}>

                <Text style={styles.textBlue}><Ionicons name="ios-cash" size={18} style={styles.iconItem}>
                  <Text style={styles.fromTo}>{I18n.t("from", {
                    locale: "vn"
                  })}
                  </Text></Ionicons>{"1.000.000 đ"}</Text>
                <Text style={styles.fromTo}>{I18n.t("to", {
                  locale: "vn"
                })}</Text>
                <Text style={styles.textBlue}>{"2.000.000 đ"}</Text>
              </Row>
              <Row style={styles.rowItem}>
                <Text style={styles.fromTo}>{I18n.t("Guider", {
                  locale: "vn"
                })}</Text>
                <Text style={styles.textBold}>{": "} {"Vũ Thị Tuyết Mai"}</Text>
              </Row>
              <Row style={styles.rowItem}>
                <Text style={styles.fromTo}>{I18n.t("museum", {
                  locale: "vn"
                })}</Text>
                <Text style={styles.textBold}>{": "} {"Bảo tàng dân tộc học"}</Text>
              </Row>
              <Row style={styles.rowItem}>
                <Text style={styles.fromTo}>{I18n.t("status", {
                  locale: "vn"
                })}</Text>
                <Text style={{}}>{": "} {"Chuyến đi hoàn thành"}</Text>
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
