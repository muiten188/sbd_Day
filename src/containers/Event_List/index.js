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

import Icon from "react-native-vector-icons/FontAwesome";
import * as meseumListAction from "../../store/actions/containers/eventList_action";
import Loading from "../../components/Loading";
import IconIonicons from 'react-native-vector-icons/Ionicons';
import EventSlider from '../../components/EventSlider';
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
        const { Presentation, get_Area, search_News, search_HOT_NEWS } = this.props.meseumListAction;
        // get_Area(null, 1, 1000, null);
        search_HOT_NEWS(null, 1, 1000, null)
        // Presentation(null, 1, 1000, null);
        // search_News(null, 1, 1000, null)
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        const { listMuseum, listArea, searchErorr, isLoading, listNews, isLoadingNews, listHotNews, isLoadingHotNews } = this.props.EventlistReducer;
        const { Presentation, clearMuseumError, clearAreaError, search_News } = this.props.meseumListAction;
        if (searchErorr == true) {
            Alert.alert(
                "Thông báo",
                "Tìm kiếm lỗi kiểm tra lại đường truyền.",
                [
                    {
                        text: "Ok",
                        onPress: e => {
                            clearMuseumError();
                        }
                    }
                ],
                { cancelable: false }
            );
        }
        return (
            <Container style={styles.container}>
                <Grid>{/* marginBottom: 45 */}

                    <Row style={{ height: 160, borderBottomWidth: 1, borderBottomColor: '#cecece' }}>
                        <EventSlider listNews={listHotNews}></EventSlider>
                    </Row>
                    <Row>
                        <FlatList
                            ref={ref => {
                                this.list = ref;
                            }}
                            style={{ flex: 1, padding: 4, marginTop: 15 }}
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
        return (
            <TouchableOpacity style={{
                height: 110,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth:  0.25,
                borderColor:'#cecece',
            }}
                onPress={() => { Actions.home({ screenId: item.routerName }) }}>
                <Grid>
                    <Row style={styles.center}>
                        <Icon style={{ color: '#007db7' }} size={35} name={item.IconName}></Icon>
                    </Row>
                    <Row style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text>{I18n.t(item.mName)}</Text>
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
        meseumListAction: bindActionCreators(meseumListAction, dispatch)
    };
}

Eventlist = connect(mapStateToProps, mapToDispatch)(Eventlist);
export default Eventlist;
