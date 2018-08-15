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
  List, ListItem,
  Text,
  H3,
  H2,
  H1,
  Item,
  Thumbnail
} from "native-base";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import IconVector from 'react-native-vector-icons/FontAwesome';
import * as AppConfig from "../../config/app_config";

export default class extends PureComponent {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      pickedDate: '10:00'
    }
  }
  render() {
    return (
      <View style={[styles.container]}>
        <Grid>
          <Col style={styles.iconPicker}>
            <IconVector style={styles.colorHeader} name="clock-o" size={26} />
          </Col>
          <Col style={styles.borderColPicker}>
            <FlatList
              ref={ref => {
                this.list = ref;
              }}
              horizontal={true}
              style={styles.listResult}
              data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderFlatListItem.bind(this)}
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            />
          </Col>
        </Grid>
      </View>
    );
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    return (
      <TouchableOpacity
        key={item.index}
        style={[
          styles.item_container_half, dataItem.index == 1 ? styles.activeHour : {}]
        }
      >
        {dataItem.index == 1 ? <Text>10:00</Text> : <Text>12:00</Text>}

      </TouchableOpacity>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }
}
