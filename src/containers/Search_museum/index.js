import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView
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
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as searchMuseumAction from "../../store/actions/containers/searchMuseum_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ItemSearchMuseum from '../../components/searchMuseum_Item';
import ItemSearchArtifact from '../../components/searchArtifact_Item';
import ItemSearchNews from '../../components/searchNews_Item';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Slideshow from 'react-native-slideshow';
import * as helper from '../../helper';
import YouTube from 'react-native-youtube'
const blockAction = false;
const blockLoadMoreAction = false;
let _searchText='';
class SearchMuseum extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSummary: true,
            position: 1,
            searchNews: false,
            searchMuseum: false,
            searchArtifact: false
        }
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        const { searchErorr } = this.props.searchMuseumReducer;
        const { clearErrorSearch } = this.props.searchMuseumAction;
        if (searchErorr) {
            Alert.alert("Thông báo", "Tìm kiếm thất bại", [{
                text: 'Ok',
                onPress: (e) => {
                    clearErrorSearch();
                }
            }],
                { cancelable: false });
        }
    }

    onTextSearchChange(value) {
        const { searchMuseumAction } = this.props;
        _searchText=value;
        if (!blockAction && value != '') {
            blockAction = true;
            searchMuseumAction.QUICK_SEARCH_ALL({ 
                text: value, 
                searchNews: this.state.searchNews,
                searchMuseum: this.state.searchMuseum,
                searchArtifact: this.state.searchArtifact});
            setTimeout(() => {
                blockAction = false;
            }, 1500);
        }
    }

    render() {
        const locale = "vn";
        const { listMuseums, listNews, listArtifacts, isLoading } = this.props.searchMuseumReducer;
        const { searchNews, searchArtifact, searchMuseum } = this.state;
        const { searchMuseumAction } = this.props;
        return (
            <Container>
                <HeaderContent showButtonLeft={true} search={true} onSearch={this.onTextSearchChange.bind(this)} />
                <ScrollView style={styles.container}>
                    <Grid style={{}}>
                        <Row>
                            <Text>Gợi ý tìm kiếm</Text>

                        </Row>
                        <Row>
                            <Col style={{ width: 80 }}>
                                <TouchableOpacity onPress={() => { 
                                    searchMuseumAction.QUICK_SEARCH_ALL({ 
                                        text: _searchText, 
                                        searchNews: !this.state.searchNews,
                                        searchMuseum: this.state.searchMuseum,
                                        searchArtifact: this.state.searchArtifact});
                                    this.setState({ searchNews: !this.state.searchNews })
                                }
                                }>
                                    <Badge style={searchNews ? { backgroundColor: 'red' } : { backgroundColor: '#cecece' }}><Text>Tin tức</Text></Badge>
                                </TouchableOpacity>
                            </Col>

                            <Col style={{ width: 90 }}>
                                <TouchableOpacity onPress={() => { 
                                    searchMuseumAction.QUICK_SEARCH_ALL({ 
                                        text: _searchText, 
                                        searchNews: this.state.searchNews,
                                        searchMuseum: !this.state.searchMuseum,
                                        searchArtifact: this.state.searchArtifact});
                                    this.setState({ searchMuseum: !this.state.searchMuseum }) }}>
                                    <Badge style={searchMuseum ? { backgroundColor: 'red' } : { backgroundColor: '#cecece' }}><Text>Bảo tàng</Text></Badge>
                                </TouchableOpacity>
                            </Col>
                            <Col style={{ width: 90 }}>
                                <TouchableOpacity onPress={() => { 
                                    searchMuseumAction.QUICK_SEARCH_ALL({ 
                                        text: _searchText, 
                                        searchNews: this.state.searchNews,
                                        searchMuseum: this.state.searchMuseum,
                                        searchArtifact: !this.state.searchArtifact});
                                    this.setState({ searchArtifact: !this.state.searchArtifact }) 
                                    }}>
                                    <Badge
                                        style={searchArtifact ? { backgroundColor: 'red' } : { backgroundColor: '#cecece' }}
                                    ><Text>Hiện vật</Text></Badge>
                                </TouchableOpacity>
                            </Col>

                        </Row>
                        {listNews && listNews.length > 0 ?
                            <Row style={{ height: 35, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18 }}>Tin tức</Text>
                            </Row> : null}
                        <Row>
                            <FlatList
                                ref={ref => {
                                    this.list = ref;
                                }}
                                style={styles.listNews}
                                data={listNews ? listNews : []}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.renderFlatListNewsItem.bind(this)}
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
                        </Row>
                        {
                            listMuseums && listMuseums.length > 0 ?
                                <Row style={{ height: 35, justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>Bảo tàng</Text>
                                </Row> : null
                        }
                        <Row>
                            <FlatList
                                ref={ref => {
                                    this.list = ref;
                                }}
                                style={styles.listMuseums}
                                data={listMuseums ? listMuseums : []}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.renderFlatListMuseumItem.bind(this)}
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
                        </Row>
                        {listArtifacts && listArtifacts.length ?
                            <Row style={{ height: 35, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18 }}>Hiện vật</Text>
                            </Row> : null
                        }
                        <Row>
                            <FlatList
                                ref={ref => {
                                    this.list = ref;
                                }}
                                style={styles.listMuseums}
                                data={listArtifacts ? listArtifacts : []}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.renderFlatListArtifactItem.bind(this)}
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
                        </Row>
                    </Grid>

                </ScrollView>
            </Container>
        );
    }

    renderFlatListMuseumItem(dataItem) {
        const item = dataItem.item;
        return (
            <TouchableOpacity
                key={item.index}
                style={
                    styles.item_container_half
                }
                onPress={() => {
                    Actions.museumDetail({ paramPassAction: item });
                }}
            >
                <ItemSearchMuseum data={item}></ItemSearchMuseum>
            </TouchableOpacity>
        );
    }

    renderFlatListNewsItem(dataItem) {
        const item = dataItem.item;
        return (
            <TouchableOpacity
                key={item.index}
                style={
                    styles.item_container_half
                }
                onPress={() => {
                    Actions.newsPreview({ news: item })
                }}
            >
                <ItemSearchNews data={item}></ItemSearchNews>
            </TouchableOpacity>
        );
    }

    renderFlatListArtifactItem(dataItem) {
        const item = dataItem.item;
        return (
            <TouchableOpacity
                key={item.index}
                style={
                    styles.item_container_half
                }
                onPress={() => {
                    Actions.museumProduct({ paramPassAction: item });
                }}
            >
                <ItemSearchArtifact data={item}></ItemSearchArtifact>
            </TouchableOpacity>
        );
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
        searchMuseumReducer: state.searchMuseumReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        searchMuseumAction: bindActionCreators(searchMuseumAction, dispatch)
    };
}

SearchMuseum = connect(mapStateToProps, mapToDispatch)(SearchMuseum);
export default SearchMuseum;
