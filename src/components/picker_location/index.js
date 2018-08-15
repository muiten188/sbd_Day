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
  Thumbnail,
  Picker
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
      locationSelected: null
    }
    this.state = {
      pickedDate: '10:00'
    }
  }
  render() {
    return (
      <View style={[styles.container]}>
        <Grid>
          <Col style={styles.iconPicker}>
            <IconVector style={styles.colorHeader} name="location-arrow" size={26} />
          </Col>
          <Col style={styles.borderColPicker}>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.locationSelected}
              onValueChange={(value) => { this.setState({ locationSelected: value }) }}
            >
              <Picker.Item label="Tour Hà Nội, Hạ Long, Sapa" value="key0" />
              <Picker.Item label="Tour Hà Nội, Đã Nẵng, Huế" value="key1" />
              <Picker.Item label="Tour Hà Nội, Huế" value="key2" />
              <Picker.Item label="Tour Hà Nội, Thái Bình" value="key3" />
            </Picker>
          </Col>
          <Col style={styles.addLocation}>
            <Button block transparent>
              <IconVector style={[styles.colorHeader,{paddingTop:4}]} name="plus-circle" size={24} />
            </Button>
          </Col>
        </Grid>
      </View>
    );
  }

}
