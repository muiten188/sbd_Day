import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
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
import YouTube from 'react-native-youtube';
import Icon from "react-native-vector-icons/FontAwesome";
import * as eventListAction from "../../store/actions/containers/eventList_action";
import Loading from "../../components/Loading";
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ProfileSlider from '../../components/ProfileSlider';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as values from '../../helper/values';
import * as helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;

class Eventlist extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            languageSelect: 'vn'
        };
        this.loadSetting();
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


    componentDidMount() {
        const { search_HOT_NEWS, search_CHECK_CHECKIN } = this.props.eventListAction;
        const { user } = this.props.loginReducer;
        search_HOT_NEWS(null, user)
        search_CHECK_CHECKIN(null, user)
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        const { isLoading, listHotNews, searchErorr } = this.props.EventlistReducer;
        return (
            <Container style={styles.container}>
                <Grid>{/* marginBottom: 45 */}

                    <Row style={{ height: 190 }}>
                        <ProfileSlider data={listHotNews}></ProfileSlider>
                    </Row>
                    <Row>
                        <FlatList
                            ref={ref => {
                                this.list = ref;
                            }}
                            style={{ flex: 1, padding: 4, paddingTop: 0, marginTop: 0 }}
                            data={values.list_Menu ? values.list_Menu : []}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.buildMenuItem.bind(this)}
                            horizontal={false}
                            numColumns={2}
                        />
                    </Row>
                </Grid>
            </Container>
        );
    }

    buildMenuItem(dataItem) {
        var index = dataItem.index;
        var item = dataItem.item;
        const { listNews } = this.props;
        const { didCheckin } = this.props.EventlistReducer;
        return (
            <TouchableOpacity style={[{
                height: 110,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0,
                borderColor: '#cecece',
            }]}
                onPress={() => {
                    if ((!didCheckin && item.mName == "Checkin")) {
                        Actions.qrScanner()
                    }
                    else{
                        Actions.home({ screenId: item.routerName })
                    }
                }}>

                <Grid>
                    <Row style={styles.center}>
                        <Icon style={{ color: '#007db7' }} size={35} name={item.IconName}></Icon>
                    </Row>
                    <Row style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text>{didCheckin && item.mName == "Checkin" ? I18n.t('didCheckin')+"  " : I18n.t(item.mName)}  
                            {didCheckin && item.mName == "Checkin" ? <Icon style={{
                                color: 'green',
                            }} size={25} name={"check-circle"}></Icon> : null}
                        </Text>
                    </Row>
                </Grid>

            </TouchableOpacity>
        )
    }

    _keyExtractor(item, index) {
        return index;
    }
}
function mapStateToProps(state, props) {
    return {
        EventlistReducer: state.EventlistReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        eventListAction: bindActionCreators(eventListAction, dispatch)
    };
}

Eventlist = connect(mapStateToProps, mapToDispatch)(Eventlist);
export default Eventlist;
