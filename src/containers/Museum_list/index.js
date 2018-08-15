import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl
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
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as meseumListAction from "../../store/actions/containers/museumList_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import NewsSlider from '../../components/NewsSlider';
import ItemDivider from '../../components/Item_divider';
import ItemNews from '../../components/Item_news';
import Comment from "../../components/Comment";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

const blockAction = false;
const blockLoadMoreAction = false;

class MuseumList extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            areaId: null
        }
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {
        const { search_Museum, get_Area, search_News,search_HOT_NEWS } = this.props.meseumListAction;
        get_Area(null, 1, 1000, null);
        search_HOT_NEWS(null, 1, 1000, null)
        search_Museum(null, 1, 1000, null);
        search_News(null, 1, 1000, null)
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        const { listMuseum, listArea, searchErorr, isLoading, listNews, isLoadingNews, listHotNews, isLoadingHotNews } = this.props.museumListReducer;
        const { search_Museum, clearMuseumError, clearAreaError, search_News } = this.props.meseumListAction;
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
                <Content>
                    <Grid>{/* marginBottom: 45 */}

                        <Row style={{ height: 180 }}>
                            <NewsSlider listNews={listHotNews}></NewsSlider>
                        </Row>
                        <Row style={{ paddingBottom: 6, paddingTop: 6, height: 50, borderBottomWidth: 0.5, borderBottomColor: '#cecece' }}>
                            <FlatList
                                style={styles.listResult}
                                data={[{ areaName: "Tất cả", areaId: null }, ...listArea]}
                                keyExtractor={this._keyExtractor}
                                renderItem={(dataItem) => {
                                    var item = dataItem.item;
                                    return (
                                        <TouchableOpacity style={{
                                            minWidth: 50,
                                            width: 'auto',
                                            marginRight: 4,
                                            paddingLeft: 6,
                                            paddingRight: 6,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                            onPress={() => {
                                                this.setState({ areaId: item.areaId })
                                                search_Museum(item.areaId ? { areaId: item.areaId } : null, 1, 100, null);
                                            }}>
                                            <Grid>
                                                <Row style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <IconVector style={this.state.areaId == item.areaId ? { color: '#007db7' } : {}} size={15} name="map-o"></IconVector>
                                                </Row>
                                                <Row style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={this.state.areaId == item.areaId ? { color: '#007db7' } : {}}>{item.areaName}</Text>
                                                </Row>
                                            </Grid>
                                        </TouchableOpacity>
                                    )
                                }}
                                horizontal={true}
                            />
                        </Row>
                        <Row>
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        colors={["#9Bd35A", "#689F38"]}
                                        refreshing={isLoading}
                                        onRefresh={() => {
                                            //this.loading.show();
                                            setTimeout(() => {
                                                search_Museum(this.state.areaId ? { areaId: this.state.areaId } : null, 1, 100, null);
                                            }, 0);

                                        }
                                        }
                                    />
                                }
                                style={styles.listResult}
                                data={listMuseum}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.renderFlatListItem.bind(this)}
                                horizontal={false}
                                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                onEndReached={({ distanceFromEnd }) => {
                                    if (distanceFromEnd > 0) {
                                        // // this.onEndReachedCalledDuringMomentum = true;
                                        // if (
                                        //     !blockLoadMoreAction &&
                                        //     !(listResult.length < pageSize)
                                        // ) {

                                        //     blockLoadMoreAction = true;
                                        //     this.smallLoading.show(),
                                        //         setTimeout(() => {
                                        //             searchAction.loadMore(
                                        //                 valuesForm,
                                        //                 currentPage,
                                        //                 pageSize,
                                        //                 user
                                        //             )
                                        //         }, 0);

                                        //     setTimeout(() => {
                                        //         if (loadEnd != true) {
                                        //             blockLoadMoreAction = false;
                                        //         }
                                        //     }, 700);
                                        // }
                                    }
                                }}
                                onEndReachedThreshold={0.7}
                            />
                            <Loading
                                ref={ref => {
                                    this.loading = ref;
                                }}
                                isShow={isLoading}
                            />
                        </Row>
                        {(listNews && listNews.length > 0) ?
                            <Row style={{ height: 40 }}>
                                <Col><Text style={styles.textSide}>Tin tức</Text></Col>
                            </Row>
                            : null
                        }
                        {(listNews && listNews.length > 0) ?
                            <Row style={styles.rowNews}>
                                <FlatList
                                    ref={ref => {
                                        this.list = ref;
                                    }}
                                    refreshControl={
                                        <RefreshControl
                                            colors={["#9Bd35A", "#689F38"]}
                                            refreshing={isLoadingNews ? isLoadingNews : false}
                                            onRefresh={() => {
                                                //this.loading.show();
                                                setTimeout(() => {
                                                    search_News(null, 1, 1000, null);
                                                }, 0);

                                            }
                                            }
                                        />
                                    }
                                    style={styles.listResult}
                                    data={[...listNews]}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={this.renderNewsFlatListItem.bind(this)}
                                    horizontal={false}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                    onEndReachedThreshold={0.7}
                                />
                            </Row>
                            : null
                        }
                    </Grid>
                    {/* <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 45,
                    opacity: 0.9,
                    backgroundColor: '#007db7'
                }}>
                    <Button full block transparent>
                        <IconIonicons name="md-qr-scanner" size={20} style={{ color: '#fff' }} />
                        <Text uppercase={false} style={{ color: '#fff', paddingTop: 0 }}>{I18n.t("guideText", {
                            locale: "vn"
                        })}</Text>
                    </Button>
                </View> */}
                </Content>
            </Container>
        );
    }

    renderNewsFlatListItem(dataItem) {
        const item = dataItem.item;
        //console.log(item);
        return (
            <TouchableOpacity
                key={item.index}
                style={
                    dataItem.index == 0 ?
                        styles.item_container_new :
                        styles.item_container_new2
                }
                onPress={() => {
                    // if (!blockAction) {
                    //     blockAction = true;
                    Actions.newsPreview({ news: item })
                    // }
                }}
            >
                <ItemNews data={item} ikey={dataItem.index}

                    item={item}></ItemNews>
            </TouchableOpacity>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        //console.log(item);
        return (
            <View
                key={item.index}
                style={
                    styles.item_container_half
                }
                onPress={() => {
                    // if (!blockAction) {
                    //     blockAction = true;

                    // }
                }}
            >
                <ItemDivider data={item}></ItemDivider>
            </View>
        );
    }

    _keyExtractor(item, index) {
        return index;
    }
}
function mapStateToProps(state, props) {
    return {
        museumListReducer: state.museumListReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        meseumListAction: bindActionCreators(meseumListAction, dispatch)
    };
}

MuseumList = connect(mapStateToProps, mapToDispatch)(MuseumList);
export default MuseumList;
