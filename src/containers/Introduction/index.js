import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import I18n from '../../i18n/i18n';
import { Actions } from 'react-native-router-flux';
import * as helper from '../../helper';

const SCALE_RATIO = 3;
class Introduction extends Component {
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignSelf: 'center' }}>
          <TouchableOpacity
            style={{
              borderRadius: 16 * SCALE_RATIO,
              backgroundColor: '#ffffff',
              borderStyle: 'solid',
              borderWidth: 0.7 * SCALE_RATIO,
              borderColor: '#f0f3f6',
              paddingVertical: 4.7 * SCALE_RATIO,
              width: 93 * SCALE_RATIO
            }}
            onPress={() => {
                Actions.home({ screenId: 'presentation' });
            }}
          >
            <Text
              style={{
                fontSize: 5.3 * SCALE_RATIO * 1.1,
                fontWeight: 'normal',
                fontStyle: 'normal',
                textAlign: 'center',
                backgroundColor: 'transparent',
                color: '#000'
              }}
            >
              {I18n.t('_presentation')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 4 * SCALE_RATIO,
              borderRadius: 16 * SCALE_RATIO,
              backgroundColor: '#ffffff',
              borderStyle: 'solid',
              borderWidth: 0.7 * SCALE_RATIO,
              borderColor: '#f0f3f6',
              paddingVertical: 4.7 * SCALE_RATIO,
              width: 93 * SCALE_RATIO
            }}
            onPress={() => {
                Actions.home({ screenId: 'location' });
            }}
          >
            <Text
              style={{
                fontSize: 5.3 * SCALE_RATIO * 1.1,
                fontWeight: 'normal',
                fontStyle: 'normal',
                textAlign: 'center',
                backgroundColor: 'transparent',
                color: '#000'
              }}
            >
              {I18n.t('Map')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 4 * SCALE_RATIO,
              borderRadius: 16 * SCALE_RATIO,
              backgroundColor: '#ffffff',
              borderStyle: 'solid',
              borderWidth: 0.7 * SCALE_RATIO,
              borderColor: '#f0f3f6',
              paddingVertical: 4.7 * SCALE_RATIO,
              width: 93 * SCALE_RATIO
            }}
            onPress={() => {
                Actions.home({ screenId: 'guests' });
            }}
          >
            <Text
              style={{
                fontSize: 5.3 * SCALE_RATIO * 1.1,
                fontWeight: 'normal',
                fontStyle: 'normal',
                textAlign: 'center',
                backgroundColor: 'transparent',
                color: '#000'
              }}
            >
              {I18n.t('Guests')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Introduction;
