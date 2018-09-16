/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Index from './src';
import { PermissionsAndroid } from 'react-native';
const height = Dimensions.get('window').height;
export default class App extends Component{

  componentWillMount() {
    this.requestLocationPermission();
  }

  render() {
    return (
      <Index />
    );
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          'title': 'Thông báo cấp quyền',
          'message': 'Ứng dụng cần quyền vị trí để thao tác với beacon'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
}