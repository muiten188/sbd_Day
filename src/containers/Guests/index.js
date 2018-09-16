import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import I18n from '../../i18n/i18n';
import { Actions } from 'react-native-router-flux';
import * as helper from '../../helper';

const SCALE_RATIO = 3;
class Guests extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      languageSelect: 'vi'
    };
    this.loadSetting();
  }

  async loadSetting() {
    var lang = await helper.getLangSetting();
    if (lang != null) {
      I18n.locale = lang;
      this.setState({
        languageSelect: lang
      });
    }
  }

  render() {
    const locale = 'vn';
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow' }}>
        <View style={{ alignSelf: 'center' }}>
          
        </View>
      </View>
    );
  }
}
export default Guests;
