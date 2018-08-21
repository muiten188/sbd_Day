import React, { Component } from 'react'
import {
  Icon,
  Item,
  Input,
  Picker,
} from 'native-base'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import renderItems from './renderItems'

export default class extends Component {

  state = {

  }

  _handleValueChange = value => {
    const { onChange } = this.props
    this.setState({ selected: value })
    onChange && onChange(value)
  }
//'transparent'
  render() {

    // by default index should be a key
    const { items, style, inputStyle, inputIconStyle, error, header } = this.props
    const { selected = this.props.selected } = this.state
    return (
      <Item style={[style, {flex:1}]} error={error}>
        {/* <Input disabled value={items[selected] || header} /> */}
        <IconIonicons name="md-arrow-dropdown" size={25} style={{position: 'absolute', top: 7, bottom: 0, right: 0,width:40,zIndex:-999}} />
        <Picker style={{ borderWidth:1,position: 'absolute', top: -5, left: 0, bottom: 0, right: 0, backgroundColor:'transparent'  }}
          mode="dropdown"
          selectedValue={selected}
          onValueChange={this._handleValueChange}
        >
          {renderItems(items)}
        </Picker>
      </Item>
    )
  }
}