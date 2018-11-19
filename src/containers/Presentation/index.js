import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
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
    Picker,
    Badge
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import * as PresentationAction from "../../store/actions/containers/presentation_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as AppConfig from "../../config/app_config";
import * as helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;
class Presentation extends Component {

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

    componentDidMount() {
        const { get_Prensentation } = this.props.PresentationAction;
        const { user } = this.props.loginReducer;
        get_Prensentation({}, user);
    }

    async loadSetting() {
        var lang = await helper.getLangSetting();
        if (lang != null) {
            I18n.locale = lang;
            this.setState({
                languageSelect: lang
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { searchPresentationErorr } = this.props.presentationReducer;
        const { clearPrensentationError } = this.props.PresentationAction;
        if (searchPresentationErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getPresentationFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearPrensentationError();
                }
            }],
                { cancelable: false })
        }
    }


    render() {
        const locale = "vn";
        const { listPresentation, isLoading, searchPresentationErorr } = this.props.presentationReducer;
        return (
            <Container>
                <FlatList
                    ref={ref => {
                        this.list = ref;
                    }}
                    style={{ flex: 1, padding: 4 }}
                    data={listPresentation ? listPresentation : []}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderFlatListItem.bind(this)}
                    horizontal={false}
                    numColumns={1}
                />
                <Loading isShow={isLoading}></Loading>
            </Container>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        let _avartar = null
        if (item.avatar) {
            _avartar = `${AppConfig.API_HOST_BASE}${item.avatar}`;
        }
        return (<Grid style={{ width: '100%', minHeight: 80, marginBottom: 6, paddingLeft: 4, paddingTop: 10 }}>
            <Col style={{ width: 80, marginTop: 10 }}>
                <Image style={{ width: 60, height: 60,resizeMode:'contain' }} source={_avartar ?  { uri: _avartar}:require('../../resources/assets/associate.png')}></Image>
            </Col>
            <Col style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <View onPress={() => { Actions.home({ screenId: 'presentationDetail' }) }}>
                    <Text>
                        {item.lastName + ' ' + item.firstName}
                    </Text>
                </View>
                <Text style={{ fontStyle: 'italic',color:'#666666' }}>{I18n.t('Company')}: {item.companyName}</Text>
                <Text style={{ fontStyle: 'italic',color:'#666666' }}>{item.description}</Text>
            </Col>

        </Grid>)
    }

    _keyExtractor(item, index) {
        return index;
    }

    textEclipse(text, length) {
        var _length = length ? length : 55;
        return (((text).length > _length) ?
            (((text).substring(0, _length)) + '...') :
            text)
    }
}
function mapStateToProps(state, props) {
    return {
        presentationReducer: state.presentationReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        PresentationAction: bindActionCreators(PresentationAction, dispatch)
    };
}

Presentation = connect(mapStateToProps, mapToDispatch)(Presentation);
export default Presentation;
