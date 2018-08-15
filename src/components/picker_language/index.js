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
      pickedDate: '10:00'
    }
  }
  render() {
    return (
      <View style={[styles.container]}>
        <Grid>
          <Col style={styles.iconPicker}>
            <IconVector style={styles.colorHeader} name="language" size={26} />
          </Col>
          <Col style={styles.borderColPicker}>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.locationSelected}
              onValueChange={(value) => { this.setState({ locationSelected: value }) }}
            >
              <Picker.Item label="Tiếng Việt" value="key0" />
              <Picker.Item label="English" value="key1" />
              <Picker.Item label="Francais" value="key2" />
            </Picker>
          </Col>
        </Grid>
      </View>
    );
  }
}
