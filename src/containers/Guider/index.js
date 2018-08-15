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
import * as guiderAction from "../../store/actions/containers/guider_action";
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

class Guider extends Component {

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

                <HeaderContent showButtonLeft={true} headerTitle={helper.textEclipse("Phan Thị Ánh Kim", 20)} />
                <Grid style={{}}>
                    <Row style={styles.rowProfile}>
                        <Grid style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Col style={styles.avartarCol}>
                                <Thumbnail large source={{ uri: 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
                            </Col>
                            <Col style={{
                                justifyContent: "center",
                                alignItems: "flex-start"
                            }}>
                                <Row>
                                    <Text style={styles.fromTo}>{I18n.t("Guider", {
                                        locale: "vn"
                                    })}</Text>
                                    <Text style={styles.textBold}>{": "} {"Vũ Thị Tuyết Mai"}</Text>
                                </Row>
                                <Row>
                                    <Text style={styles.fromTo}>{I18n.t("experience", {
                                        locale: "vn"
                                    })}</Text>
                                    <Text style={styles.textBold}>{": "}3 năm</Text>
                                </Row>
                                <Row>
                                    <Text style={styles.fromTo}>{I18n.t("language", {
                                        locale: "vn"
                                    })}</Text>
                                    <Text style={styles.textBold}>{": "}{"Tiếng Việt"}</Text>
                                </Row>
                                <Row>
                                    <Col>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={2}
                                            selectedStar={(rating) => { rating }}
                                            fullStarColor={'yellow'}
                                            starSize={20}
                                        />
                                    </Col>
                                    <Col>
                                        <Button transparent style={{ height: 25, marginLeft: '30%' }}
                                            onPress={() => { Actions.guiderRating() }}>
                                            <IconVector name="edit" size={18} />
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Grid>
                    </Row>
                    <Row style={styles.rowBar}>

                    </Row>
                    <Row style={{ height: 30 }}>
                        <Text style={styles.titleProduct}>{I18n.t("introduce", {
                            locale: "vn"
                        })}</Text>
                    </Row>
                    <Row style={styles.rowDescription_full}>
                        <ScrollView style={styles.container}>
                            <Text>
                                {`🔥 🔥 NGẠO THIÊN MOBILE - CHÍNH THỨC RA MẮT 05.06.2018. CHƠI LÀ NGHIỀN !!! 🔥🔥

Huynh muội ơi!
🔥 Vào 10h00 ngày 05/06, Siêu phẩm Tiên Hiệp 2018, NGẠO THIÊN MOBILE, chính thức phát hành Open Beta. Cùng Đóa Nhi CHƠI LÀ NGHIỀN nha <3

RẤT RẤT nhiều event nhân VIPcode trong tuần đầu tiên ra mắt, huynh tỷ nhanh nhanh vào Fanpage để cập nhật nhé.`}
                            </Text>
                            <Text>
                                {`🔥 🔥 NGẠO THIÊN MOBILE - CHÍNH THỨC RA MẮT 05.06.2018. CHƠI LÀ NGHIỀN !!! 🔥🔥

Huynh muội ơi!
🔥 Vào 10h00 ngày 05/06, Siêu phẩm Tiên Hiệp 2018, NGẠO THIÊN MOBILE, chính thức phát hành Open Beta. Cùng Đóa Nhi CHƠI LÀ NGHIỀN nha <3

RẤT RẤT nhiều event nhân VIPcode trong tuần đầu tiên ra mắt, huynh tỷ nhanh nhanh vào Fanpage để cập nhật nhé.`}
                            </Text>
                            <Text>
                                {`🔥 🔥 NGẠO THIÊN MOBILE - CHÍNH THỨC RA MẮT 05.06.2018. CHƠI LÀ NGHIỀN !!! 🔥🔥

Huynh muội ơi!
🔥 Vào 10h00 ngày 05/06, Siêu phẩm Tiên Hiệp 2018, NGẠO THIÊN MOBILE, chính thức phát hành Open Beta. Cùng Đóa Nhi CHƠI LÀ NGHIỀN nha <3

RẤT RẤT nhiều event nhân VIPcode trong tuần đầu tiên ra mắt, huynh tỷ nhanh nhanh vào Fanpage để cập nhật nhé.`}
                            </Text>
                            <Text>
                                {`🔥 🔥 NGẠO THIÊN MOBILE - CHÍNH THỨC RA MẮT 05.06.2018. CHƠI LÀ NGHIỀN !!! 🔥🔥

Huynh muội ơi!
🔥 Vào 10h00 ngày 05/06, Siêu phẩm Tiên Hiệp 2018, NGẠO THIÊN MOBILE, chính thức phát hành Open Beta. Cùng Đóa Nhi CHƠI LÀ NGHIỀN nha <3

RẤT RẤT nhiều event nhân VIPcode trong tuần đầu tiên ra mắt, huynh tỷ nhanh nhanh vào Fanpage để cập nhật nhé.`}
                            </Text>
                        </ScrollView>
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
                        <Text uppercase={false} style={{ color: '#fff', paddingTop: 0 }}>{I18n.t("chooseGuider", {
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
        guiderReducer: state.guiderReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        guiderAction: bindActionCreators(guiderAction, dispatch)
    };
}

Guider = connect(mapStateToProps, mapToDispatch)(Guider);
export default Guider;
