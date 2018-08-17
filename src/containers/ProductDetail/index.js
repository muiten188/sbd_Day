import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    Linking,
    WebView
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
import EventSlider from '../../components/EventSlider';
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
            languageSelect: 'vi'
        };
        this.loadSetting();
    }

    componentDidMount() {

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

    }

    render() {
        const { news } = this.props;
        return (
            <Container>
                <Grid>{/* marginBottom: 45 */}
                    <Row style={{ height: 100 }}>
                        <EventSlider listNews={[{}, {}, {}, {}, {}]}></EventSlider>
                    </Row>
                    <Row>
                        <ScrollView>
                            <View style={[styles.Item, { marginTop: 10 }]}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Product') + " : "}</Text> Smart Tourist
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Company') + " : "}</Text> Digital transformotion in SDC
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Date') + " : "}</Text> Digital transformotion in SDC
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Time') + " : "}</Text> Digital transformotion in SDC
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Location') + " : "}</Text> Digital transformotion in SDC
                                </Text>
                            </View>
                            <View style={styles.Item}>
                                <Text>
                                    <Text style={{ fontWeight: '500' }}>{I18n.t('Introduce') + " : "}</Text>
                                </Text>
                                <Text>      -Digital transformotion in SDC</Text>
                                <Text>      -Digital transformotion in SDC</Text>
                                <Text>      -Digital transformotion in SDC</Text>
                            </View>
                        </ScrollView>
                    </Row>
                    <Row style={{ height: 70, borderTopWidth: 1, borderTopColor: '#cecece' }}>
                        <ProductSlider listNews={[{}, {}, {}]}></ProductSlider>
                    </Row>
                </Grid>
            </Container>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        productDetailReducer: state.productDetailReducer,
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
