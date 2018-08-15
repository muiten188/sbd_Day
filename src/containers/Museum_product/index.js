import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    WebView
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
import * as meseumProductAction from "../../store/actions/containers/museumProduct_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Comment from "../../components/Comment";
import ItemResult from '../../components/Item_result';
import ItemResultProduct from '../../components/Item_result_product';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Slideshow from 'react-native-slideshow';
import * as AppConfig from "../../config/app_config";
import * as helper from '../../helper';
import AutoHeightWebView from 'react-native-autoheight-webview';
import VideoPlayer from "../../components/VideoPlayer";
const blockAction = false;
const blockLoadMoreAction = false;
const interval = null;
class MuseumProduct extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSummary: true,
            position: 1
        }
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {
        const { get_AntifactByID, get_AntifactByTag, get_MapId } = this.props.meseumProductAction;
        const { paramPassAction } = this.props;
        interval = setInterval(() => {
            this.setState({
                position: this.state.position === 3 ? 0 : this.state.position + 1
            });
        }, 2000);
        if (paramPassAction && paramPassAction.artId) {
            get_AntifactByID(paramPassAction.artId, 1, 100, null);
        }
        if (paramPassAction && paramPassAction.beacon) {
            get_MapId(paramPassAction.beacon, {})
        }
        if (paramPassAction && paramPassAction.tagId && paramPassAction.artId) {
            get_AntifactByTag({ tagId: paramPassAction.tagId, currId: paramPassAction.artId }, 1, 100, null);
        }
    }

    componentWillUnmount() {
        if (interval) {
            clearInterval(interval);
        }
        const { antifactDetail } = this.props.museumProductReducer;
        antifactDetail.artContent = null;
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        const { antifactDetail, listAntifactByTag, isLoading, mapId } = this.props.museumProductReducer;
        var attachments = []
        if (antifactDetail && antifactDetail.attachments) {
            for (var i = 0; i < antifactDetail.attachments.length; i++) {
                var item = antifactDetail.attachments[i];
                if (item.filePath) {
                    var object = {
                        url: AppConfig.API_HOST + item.filePath
                    }
                    attachments.push(object);
                }
            }
        }
        var videoUrl = null;
        if (antifactDetail && antifactDetail.artVideoProfile) {
            videoUrl = AppConfig.API_HOST + antifactDetail.artVideoProfile;
        }
        var imgUrl = null;
        if (antifactDetail && antifactDetail.artImageProfile) {
            imgUrl = AppConfig.API_HOST + antifactDetail.artImageProfile;
        }
        return (
            <Container style={styles.container}>
                <HeaderContent showButtonLeft={true} headerTitle={antifactDetail ? antifactDetail.artName : "..."} />
                <Content>
                    <Grid style={{ flex: 1 }}>
                        {
                            (videoUrl != null || attachments.length > 0) ?
                                < Row style={styles.rowYoutube}>
                                    {videoUrl ? <VideoPlayer video={{ uri: videoUrl }}
                                        volume={0.5}
                                        onClosePressed={() => { }}
                                        poster={imgUrl}
                                    /> : <Slideshow
                                            height={150}
                                            arrowSize={0}
                                            position={this.state.position}
                                            onPositionChanged={position => this.setState({ position })}
                                            dataSource={attachments} />
                                    }
                                </Row> : null
                        }
                        <Row style={styles.rowBar}>
                            <Grid>
                                <Col>
                                    {/* <Button full block transparent iconLeft={true} style={styles.buttonTitle}>
                                        <Icon name="user" size={15} style={styles.textWhile} />
                                        <Text uppercase={false} style={styles.textWhile}>{I18n.t("locationGuide", {
                                            locale: "vn"
                                        })}</Text>
                                    </Button> */}
                                </Col>
                                <Col>
                                    <Button full block transparent onPress={() => {
                                        Actions.museumMap({ mapId: mapId })
                                    }} iconRight={true} style={styles.buttonTitle}>
                                        <Text uppercase={false} style={styles.textWhile}>{I18n.t("diagram", {
                                            locale: "vn"
                                        })}</Text>
                                        <Icon name="map" size={15} style={styles.textWhile} />
                                    </Button>
                                </Col>
                            </Grid>
                        </Row>
                        <Row style={styles.rowDescription_full}>
                            <ScrollView style={{ flex: 1 }}>
                                <Text>
                                    {antifactDetail ? antifactDetail.artDescription : '...'}
                                </Text>
                            </ScrollView>
                        </Row>
                        <Row style={{ flex: 1, paddingLeft: 4 }}>
                            {antifactDetail && antifactDetail.artContent ?
                                <AutoHeightWebView style={{ flex: 1 }} source={{ html: `<html>${antifactDetail.artContent}</html>` }} ></AutoHeightWebView>
                                : null}
                        </Row>
                        <Row style={{ height: 30 }}>
                            <Text style={styles.titleProduct}>{I18n.t("similar_product", {
                                locale: "vn"
                            })}</Text>
                        </Row>

                        <Row>
                            <FlatList
                                ref={ref => {
                                    this.list = ref;
                                }}
                                style={styles.listResult}
                                data={listAntifactByTag ? listAntifactByTag : []}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.renderFlatListItem.bind(this)}
                                numColumns={2}
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
                        <Comment objectId={this.props.paramPassAction.artId} type={"ARTIFACT"}></Comment>
                    </Grid>
                    <Loading
                        ref={ref => {
                            this.loading = ref;
                        }}
                        isShow={isLoading}
                    />
                </Content>
            </Container >
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
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
                <ItemResultProduct
                    data={item}
                    avatarUrl={'https://q.bstatic.com/images/hotel/max1024x768/101/101428465.jpg'}
                    item={item}>
                </ItemResultProduct>

            </View>
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
        museumProductReducer: state.museumProductReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        meseumProductAction: bindActionCreators(meseumProductAction, dispatch)
    };
}

MuseumProduct = connect(mapStateToProps, mapToDispatch)(MuseumProduct);
export default MuseumProduct;
