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
import ItemResult from '../../components/Item_result';
import * as AppConfig from "../../config/app_config";
import { Actions } from "react-native-router-flux";
export default class extends PureComponent {
  static navigationOptions = {
    header: null
  };

  render() {
    const { key, userName, position, phone, avatarUrl, item, data } = this.props;
    return (
      <View key={key} style={styles.itemList}>
        <View style={styles.headerList}>
          <Text style={styles.headerListText}>{data.area}</Text>
        </View>

        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={styles.listResult}
          data={data ? data.data : []}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderFlatListItem.bind(this)}
          numColumns={2}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > 0) {
              // // this.onEndReachedCalledDuringMomentum = true;
              // if (
              //     !blockLoadMoreAction &&
              //     !(listResult.length < pageSize)
              // ) {

              //     blockLoadMoreAction = true;
              //     this.smallLoading.show(),
              //         setTimeout(() => {
              //             searchAction.loadMore(
              //                 valuesForm,
              //                 currentPage,
              //                 pageSize,
              //                 user
              //             )
              //         }, 0);

              //     setTimeout(() => {
              //         if (loadEnd != true) {
              //             blockLoadMoreAction = false;
              //         }
              //     }, 700);
              // }
            }
          }}
          onEndReachedThreshold={0.7}
        />
      </View>
    );
  }
  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    return (
      <TouchableOpacity
        key={item.index}
        style={
          styles.item_container_half
        }
        onPress={() => {
          Actions.museumDetail({ paramPassAction: item });
        }}
      >
        <ItemResult
          key={item.index}
          userName={'bach'}
          position={'bền bền'}
          phone={'đổi phone'}
          avatarUrl={'https://q.bstatic.com/images/hotel/max1024x768/101/101428465.jpg'}
          item={item}>
        </ItemResult>

      </TouchableOpacity>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }
}
