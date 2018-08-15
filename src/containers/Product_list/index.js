import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
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
import * as productListAction from "../../store/actions/containers/productList_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ItemResult from '../../components/Item_result';
import Video from "react-native-video";
import ItemResultProductDevider from '../../components/Item_divider_product';
import ItemResultProduct from '../../components/Item_result_product';

import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
// import YouTube from 'react-native-youtube'
import * as AppConfig from "../../config/app_config";
import VideoPlayer from "../../components/VideoPlayer";
const blockAction = false;
const blockLoadMoreAction = false;

class ProductList extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSummary: true
        }
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {
        const { get_Antifact } = this.props.productListAction;
        const { paramPassAction, beaconUUID } = this.props;
        var objGetAntifact = {};
        if (paramPassAction && paramPassAction.museumId) {
            objGetAntifact = { museumId: paramPassAction.museumId };
        }
        if (beaconUUID) {
            objGetAntifact.beaconUUID = beaconUUID;
        }
        get_Antifact(objGetAntifact, 1, 100000, null);
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        const { paramPassAction } = this.props;
        const { get_Antifact } = this.props.productListAction;
        const { listAntifact, searchAntifactErorr, isLoading } = this.props.productListReducer;
        
        if (searchAntifactErorr) {
            Alert.alert("Thông báo", "Lấy danh sách hiện vật thất bại", [{
                text: 'Ok',
                onPress: (e) => {
                    this.props.productListAction.clearAntifactError();
                }
            }],
                { cancelable: false });
        }
        return (
            <Container style={styles.container}>
                <HeaderContent showButtonLeft={true} headerTitle={'Tất cả vật phẩm'} />
                <ScrollView>
                    <Grid style={{}}>
                        <Row style={{ height: 30 }}>
                            <Text style={styles.titleProduct}>{I18n.t("product", {
                                locale: "vn"
                            })}</Text>
                        </Row>
                        <Row>
                            <FlatList
                                ref={ref => {
                                    this.list = ref;
                                }}
                                refreshControl={
                                    <RefreshControl
                                        colors={["#9Bd35A", "#689F38"]}
                                        refreshing={isLoading}
                                        onRefresh={() => {
                                            //this.loading.show();
                                            get_Antifact({ museumId: paramPassAction.museumId }, 1, 100000, null);

                                        }
                                        }
                                    />
                                }
                                style={styles.listResult}
                                data={listAntifact ? listAntifact : []}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.renderFlatListItem.bind(this)}
                                horizontal={false}
                                numColumns={1}
                                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            />
                        </Row>
                        <Loading
                            ref={ref => {
                                this.loading = ref;
                            }}
                            isShow={isLoading}
                        />
                    </Grid>
                </ScrollView>
            </Container>
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
                    Actions.museumProduct({ paramPassAction: item });
                }}
            >
                <ItemResultProductDevider key={item.index}
                    
                    data={item}></ItemResultProductDevider>

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
        productListReducer: state.productListReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        productListAction: bindActionCreators(productListAction, dispatch)
    };
}

ProductList = connect(mapStateToProps, mapToDispatch)(ProductList);
export default ProductList;
