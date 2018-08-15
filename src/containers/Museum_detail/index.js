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
    Platform,
    Dimensions,
    Easing
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
import * as meseumListAction from "../../store/actions/containers/museumDetail_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ItemResult from '../../components/Item_result';
import Video from "react-native-video";
import ItemResultProduct from '../../components/Item_result_product';
import AutoHeightWebView from 'react-native-autoheight-webview';
import HeaderContent from "../../components/Header_content";
import * as helper from '../../helper';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
// import YouTube from 'react-native-youtube'
import * as AppConfig from "../../config/app_config";
import VideoPlayer from "../../components/VideoPlayer";
const blockAction = false;
const blockLoadMoreAction = false;

class MuseumDetail extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSummary: true,
            backgroundVideo: false
        }
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {
        const { get_Antifact, get_MuseumDetail } = this.props.meseumListAction;
        get_MuseumDetail({ museumId: this.props.paramPassAction.museumId })
        //get_Antifact({ museumId: this.props.paramPassAction.museumId }, 1, 100, null);
        this.loadSetting();
    }
    componentDidUpdate(prevProps, prevState) {

    }

    async loadSetting() {
        var backgroundVideoSetting = await helper.getBackgroundVideoSetting();
        if (backgroundVideoSetting != null) {
            this.setState({
                backgroundVideo: backgroundVideoSetting
            })
        }
    }
    render() {
        const locale = "vn";
        const { paramPassAction } = this.props;
        const { listAntifact, searchAntifactErorr, isLoading, museumDetail } = this.props.museumDetailReducer;
        var videoUrl = null;
        if (paramPassAction && paramPassAction.videoProfile) {
            videoUrl = AppConfig.API_HOST + paramPassAction.videoProfile;
        }
        var imgUrl = null;
        if (paramPassAction && paramPassAction.imgProfile) {
            imgUrl = AppConfig.API_HOST + paramPassAction.imgProfile;
        }
        if (searchAntifactErorr) {
            Alert.alert("Thông báo", "Lấy danh sách hiện vật thất bại", [{
                text: 'Ok',
                onPress: (e) => {
                    this.props.meseumListAction.clearAntifactError();
                }
            }],
                { cancelable: false });
        }
        return (
            <Container style={styles.container}>
                <HeaderContent showButtonLeft={true} headerTitle={paramPassAction.museumName} />
                <Content>
                    <Grid style={{}}>
                        <Row style={styles.rowYoutube}>
                            <VideoPlayer video={{ uri: videoUrl }}
                                volume={0.7}
                                onClosePressed={() => { }}
                                poster={imgUrl}
                                playInBackground={this.state.backgroundVideo}
                            />
                            {/* <Video source={{ uri: videoUrl }}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref
                                }}                                      // Store reference
                                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                onEnd={this.onEnd}                      // Callback when playback finishes
                                onError={this.videoError}               // Callback when video cannot be loaded
                                onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
                                onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
                                onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
                                onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // Callback after fullscreen stopped
                                onProgress={this.setTime}               // Callback every ~250ms with currentTime
                                onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                                style={styles.backgroundVideo} /> */}
                            {/* <YouTube
                            videoId="aJOTlE1K90k"   // The YouTube video ID
                            play={true}             // control playback of video with true/false
                            fullscreen={false}       // control whether the video should play in fullscreen or inline
                            loop={true}             // control whether the video should loop when ended
                            apiKey={'AIzaSyD5kBQtHbhB5M-PJdTpO9asfuUT3TGlQYc'}
                            onReady={e => this.setState({ isReady: true })}
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            onError={e => this.setState({ error: e.error })}

                            style={{ alignSelf: 'stretch', height: 180, width: '100%' }}
                        /> */}
                        </Row>
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
                                    {/* <Button full block transparent iconRight={true} style={styles.buttonTitle}>
                                        <Text uppercase={false} style={styles.textWhile}>{I18n.t("finGuider", {
                                            locale: "vn"
                                        })}</Text>
                                        <Icon name="user" size={15} style={styles.textWhile} />
                                    </Button> */}
                                    <Button transparent onPress={() => {
                                        Actions.productList({ paramPassAction: this.props.paramPassAction });
                                    }} style={{ height: 33 }}>
                                        <Text style={{ color: '#fff' }}>Xem tất cả hiện vật</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </Row>
                        {/* <Row style={{ height: 30 }}>
                            <Col>
                                <Text style={styles.titleProduct}>{I18n.t("product", {
                                    locale: "vn"
                                })}</Text>
                            </Col>
                            <Col>
                                <Button onPress={() => {
                                    Actions.productList({ paramPassAction: this.props.paramPassAction });
                                }} style={{ height: 28, backgroundColor: '#fff', position: 'absolute', right: 4 }}>
                                    <Text style={{ color: '#007db7' }}>Xem tất cả hiên vật</Text>
                                </Button>
                            </Col>
                        </Row> */}
                        <Row style={styles.rowDescription_full}>
                            {/* <ScrollView style={{flex:1}}> */}
                            {/* <Text>
                                    {(paramPassAction.description != "" && paramPassAction.description != null) == true ? I18n.t("description", {
                                        locale: "vn"
                                    }) + museumDetail.content : I18n.t("description", {
                                        locale: "vn"
                                    })}
                                </Text> */}
                            <AutoHeightWebView
                                source={{ html: `<html>${museumDetail.content}</html>` }}
                            />
                            {/* <WebView style={{}} source={{ html: `<html>${museumDetail.content}</html>` }} ></WebView> */}
                            {/* <Button onPress={() => { this.setState({ isSummary: true }) }} style={{ position: 'absolute', bottom: -5, right: 0, height: 30, backgroundColor: '#fff', borderWidth: 0 }}>
                                    <Text uppercase={false} style={{ color: '#007db7' }}>
                                        {I18n.t("summary_button", {
                                            locale: "vn"
                                        })}
                                    </Text>
                                </Button> */}
                            {/* </ScrollView> */}
                        </Row>

                        <Row>
                            {/* <FlatList
                                ref={ref => {
                                    this.list = ref;
                                }}
                                style={styles.listResult}
                                data={listAntifact ? listAntifact : []}
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
                            /> */}
                        </Row>
                        <Loading
                            ref={ref => {
                                this.loading = ref;
                            }}
                            isShow={isLoading}
                        />
                    </Grid>
                </Content>
            </Container>
        );
    }

    renderFlatListItem(dataItem) {
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
                <ItemResultProduct key={item.index}
                    userName={'bach'}
                    position={'bền bền'}
                    phone={'đổi phone'}
                    avatarUrl={'https://q.bstatic.com/images/hotel/max1024x768/101/101428465.jpg'}
                    data={item}></ItemResultProduct>

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
        museumDetailReducer: state.museumDetailReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        meseumListAction: bindActionCreators(meseumListAction, dispatch)
    };
}

MuseumDetail = connect(mapStateToProps, mapToDispatch)(MuseumDetail);
export default MuseumDetail;
