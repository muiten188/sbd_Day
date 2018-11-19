import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    WebView,
    Image
} from "react-native";
import {
    Container,
    Text,
    Button,
    Content,
    Body,
    Thumbnail,
    Form,
    Item,
    Input,
    H1,
    H2,
    H3,
    H6,
    Picker
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import Icon from "react-native-vector-icons/FontAwesome";
import * as partiesAction from "../../store/actions/containers/parties_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as AppConfig from "../../config/app_config";
import * as helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;
class Parties extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const { get_Parties } = this.props.partiesAction;
        const { user } = this.props.loginReducer;
        get_Parties({}, user);
    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps, prevState) {
        const { searchPartiesErorr } = this.props.partiesReducer;
        const { clearPartiesError } = this.props.partiesAction;
        if (searchPartiesErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getPartiesFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearPartiesError();
                }
            }],
                { cancelable: false })
        }
    }

    render() {
        const locale = "vn";
        const { listParties, isLoading, searchPartiesErorr } = this.props.partiesReducer;
        return (
            <Container style={styles.container}>
                <FlatList
                    ref={ref => {
                        this.list = ref;
                    }}
                    style={{ flex: 1, padding: 4 }}
                    data={listParties}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderFlatListItem.bind(this)}
                    horizontal={false}
                    numColumns={1}
                />
                <Loading isShow={isLoading}></Loading>
            </Container >
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        let _avartar = null
        if (item.avatar) {
            _avartar = `${AppConfig.API_HOST_BASE}${item.avatar}`;
        }
        console.log(_avartar);
        return (<Grid style={{ width: '100%', height: 80, paddingLeft: 4, marginBottom: 4 }}>
            <Col style={{ width: 80, marginTop: 10 }}>
                <Image style={{ width: 70, height: 70, resizeMode: 'contain' }} source={_avartar ?{ cache: 'only-if-cached', uri:  _avartar  }:require('../../resources/assets/associate.png')}></Image>
            </Col>
            <Col style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text>
                    {item.name}
                </Text>
                {item.note != null || item.note == '' ? <Text style={{ fontStyle: 'italic',color:'#666666' }}>
                    {item.note}
                </Text> : null}
            </Col>

        </Grid>)
    }

    _keyExtractor(item, index) {
        return index;
    }

    textEclipse(text) {
        return (((text).length > 125) ?
            (((text).substring(0, 125)) + '...') :
            text)
    }
}
function mapStateToProps(state, props) {
    return {
        partiesReducer: state.partiesReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        partiesAction: bindActionCreators(partiesAction, dispatch)
    };
}

Parties = connect(mapStateToProps, mapToDispatch)(Parties);
export default Parties;
