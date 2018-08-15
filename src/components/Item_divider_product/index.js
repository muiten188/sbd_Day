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
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
import ItemResultProduct from '../../components/Item_result_product';
import * as AppConfig from "../../config/app_config";
import { Actions } from "react-native-router-flux";
export default class extends PureComponent {
  static navigationOptions = {
    header: null
  };

  render() {
    const { key, userName, position, phone, avatarUrl, data } = this.props;
    return (
      <View key={key} style={styles.itemList}>
        <View style={styles.headerList}>
          <Text style={styles.headerListText}>{data.tagId}</Text>
        </View>

        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={styles.listResult}
          data={data.data}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderFlatListItem.bind(this)}
          numColumns={2}
          horizontal={false}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        />
      </View>
    );
  }
  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    var urlAvartar = null;
    if (item.artImageProfile) {
      urlAvartar = AppConfig.API_HOST + item.artImageProfile.replaceAll("\\\\", "/")
    }
    return (
      <TouchableOpacity
        key={item.index}
        style={
          styles.item_container_half
        }
        onPress={() => {
          Actions.museumProduct({ paramPassAction: item });
        }}
      >
        <ItemResultProduct
          key={item.index}
          avatarUrl={urlAvartar ? urlAvartar : 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg'}
          data={item}>
        </ItemResultProduct>

      </TouchableOpacity>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }
}
