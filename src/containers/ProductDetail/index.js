import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    Dimensions,
    WebView,
    Platform
} from "react-native";
import {
    Container,
    Text,
    Button,
    Content,
    Item,
    Left,
    Right
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import AutoHeightWebView from 'react-native-autoheight-webview';
import * as productDetailAction from '../../store/actions/containers/productDetail_action';
import ProductDetailSlider from '../../components/ProductDetailSlider';
import ProductSlider from '../../components/ProductSlider';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as helper from '../../helper';
class ProductDetail extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            languageSelect: 'vi',
        };
        this.loadSetting();
    }

    componentDidMount() {
        const { getProductsById } = this.props.productDetailAction;
        const { user } = this.props.loginReducer;
        const { product } = this.props;
        getProductsById({ productId: product.productId }, user)
    }

    componentWillUnmount() {
        const { clearErrorSearch } = this.props.productDetailAction;
        clearErrorSearch();
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
        const { searchErorr } = this.props.productDetailReducer;
        const { clearErrorSearch } = this.props.productDetailAction;
        if (searchErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getProductDetailFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearErrorSearch();
                }
            }],
                { cancelable: false });
        }
    }

    render() {
        const { searchErorr, isLoading, productDetail } = this.props.productDetailReducer;
        const { listProduct, product } = this.props;
        return (
            <Container>

                <Grid>{/* marginBottom: 45 */}
                    <Content>
                        {productDetail.profiles && productDetail.profiles.length > 0 ?
                            <Row style={{ height: 160 }}>
                                <ProductDetailSlider data={productDetail.profiles}></ProductDetailSlider>
                            </Row> : null}
                        <Row>
                            <View style={[styles.Item, { marginTop: 10 }]}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Product') + " : "}</Text> {productDetail.name}
                                </Text>
                            </View>
                        </Row>
                        <Row>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('description') + " : "}</Text> {productDetail.company}
                                </Text>
                            </View>
                        </Row>
                        {/* <View style={styles.Item}>
                            <Text>
                                <Text style={{ fontWeight: '500' }}>{I18n.t('Date') + " : "}</Text> {productDetail.targetDate ? new Date(productDetail.targetDate).toLocaleDateString() : ''}
                            </Text>
                        </View>
                        <Row>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Time') + " : "}</Text> {productDetail.fromTime} - {productDetail.toTime}
                                </Text>
                            </View>
                        </Row> */}
                        {/* <Row>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Location') + " : "}</Text> {productDetail.location}
                                </Text>
                            </View>
                        </Row> */}
                        <Row>
                            <View style={styles.Item}>
                                {/* <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Introduce') + " : "}</Text>
                                </Text> */}
                                {productDetail.description ?
                                    <AutoHeightWebView
                                        defaultHeight={2000}
                                        // scalesPageToFit={Platform.OS === 'Android' ? true : false}
                                        enableAnimation={true}
                                        style={{ paddingRight: 10 }} source={{
                                            html: `${productDetail.description}`
                                        }}>

                                    </AutoHeightWebView> : null}
                            </View>
                        </Row>
                    </Content>
                    {/* {listProduct.length > 1 ? <Row style={{ height: 70, borderTopWidth: 1, borderTopColor: '#cecece' }}>
                        <ProductSlider listProduct={this.remove(listProduct, product)} listAllProduct={listProduct}></ProductSlider>
                    </Row> : null} */}
                </Grid>

            </Container >
        );
    }

    remove(array, element) {
        var _arr = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] != element) {
                _arr.push(array[i])
            }
        }
        return _arr;
    }
}
function mapStateToProps(state, props) {
    return {
        productDetailReducer: state.productDetail_reducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        productDetailAction: bindActionCreators(productDetailAction, dispatch)
    };
}

ProductDetail = connect(mapStateToProps, mapToDispatch)(ProductDetail);
export default ProductDetail;
