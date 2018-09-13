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
                <Image style={{ width: 60, height: 60,resizeMode:'contain' }} source={{ uri: _avartar ? _avartar : 'data:image/png;base64,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' }}></Image>
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
