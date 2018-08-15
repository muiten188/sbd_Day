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
import * as guiderRatingAction from "../../store/actions/containers/guider_rating_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ItemResult from '../../components/Item_result';
import ItemDividerProduct from '../../components/Item_divider_product';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Slideshow from 'react-native-slideshow';
import * as helper from '../../helper';
import StarRating from 'react-native-star-rating';
const blockAction = false;
const blockLoadMoreAction = false;

class GuiderRating extends Component {

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
       
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        return (
            <Container style={styles.container}>
                <HeaderContent showButtonLeft={true} headerTitle={helper.textEclipse(I18n.t("rating", {
                    locale: "vn"
                }), 20)} />
                <Grid style={{}}>
                    <Row style={styles.rowProfile}>
                        <Col>
                            <Row style={styles.center}>
                                <Text style={styles.fromTo}>{I18n.t("RatingDes", {
                                    locale: "vn"
                                })}</Text>
                            </Row>
                            <Row style={styles.center}>
                                <Thumbnail large source={{ uri: 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />

                            </Row>
                            <Row style={styles.center} >
                                <Text style={styles.textBold}>{"Vũ Thị Tuyết Mai"}</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={styles.startCenter}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={2}
                            selectedStar={(rating) => { rating }}
                            fullStarColor={'yellow'}
                            starSize={35}
                        />
                    </Row>
                </Grid>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 45,
                    opacity: 0.9,
                    backgroundColor: '#007db7'
                }}>
                    <Button full block transparent>
                        <IconVector name="check" size={20} style={{ color: '#fff' }} />
                        <Text uppercase={false}
                            onPress={() => { Actions.pop(); }}
                            style={{ color: '#fff', paddingTop: 0 }}>
                            {I18n.t("rating", {
                                locale: "vn"
                            })}</Text>
                    </Button>
                </View>
            </Container>
        );
    }

    textEclipse(text) {
        return (((text).length > 125) ?
            (((text).substring(0, 125)) + '...') :
            text)
    }
}
function mapStateToProps(state, props) {
    return {
        guiderRatingReducer: state.guiderRatingReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        guiderRatingAction: bindActionCreators(guiderRatingAction, dispatch)
    };
}

GuiderRating = connect(mapStateToProps, mapToDispatch)(GuiderRating);
export default GuiderRating;
