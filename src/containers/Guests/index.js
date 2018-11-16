import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    FlatList,
    Alert,
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
import * as GuestsAction from "../../store/actions/containers/guests_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as AppConfig from "../../config/app_config";
import * as helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;
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

    componentDidMount() {
        const { get_Guests } = this.props.GuestsAction;
        const { user } = this.props.loginReducer;
        get_Guests({}, user);
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
        const { searchGuestsErorr } = this.props.guestsReducer;
        const { clearGuestsError } = this.props.GuestsAction;
        if (searchGuestsErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getGuestsFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearGuestsError();
                }
            }],
                { cancelable: false })
        }
    }


    render() {
        const locale = "vn";
        const { listGuests, isLoading, searchGuestsErorr } = this.props.guestsReducer;
        return (
            <Container>
                <FlatList
                    ref={ref => {
                        this.list = ref;
                    }}
                    style={{ flex: 1, padding: 4 }}
                    data={listGuests ? listGuests : []}
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
        return (<Grid style={{ width: '100%', minHeight: 80, marginBottom: 6, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 10, borderBottomWidth: 0.5,
        borderBottomColor: '#cecece' }}>
            <Col style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <View onPress={() => { Actions.home({ screenId: 'guestsDetail' }) }}>
                    <Text>
<<<<<<< HEAD
                        {item.fullName}
=======
                        {item.fullname}
>>>>>>> e69016542224767c8931f3b3d9fcfc3963090317
                    </Text>
                </View>
                <Text style={{ fontStyle: 'italic',color:'#666666' }}>{I18n.t('Company')}: {item.companyName}</Text>
                {/* {item.phoneNumber && <Text style={{ fontStyle: 'italic',color:'#666666' }}>{I18n.t('Phone')}: {item.phoneNumber}</Text>}
                {item.email && <Text style={{ fontStyle: 'italic',color:'#666666' }}>{I18n.t('Email')}: {item.email}</Text>} */}
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
        guestsReducer: state.guestsReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        GuestsAction: bindActionCreators(GuestsAction, dispatch)
    };
}

Guests = connect(mapStateToProps, mapToDispatch)(Guests);
export default Guests;
