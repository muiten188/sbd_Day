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
    WebView,
    Image,
    Dimensions
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
import * as mapDetailAction from '../../store/actions/containers/mapDetail_action';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as helper from '../../helper';
import * as appConfig from '../../config/app_config';
import ImageZoom from 'react-native-image-pan-zoom';
class MapDetail extends Component {

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
        const { getMapsById } = this.props.mapDetailAction;
        const { user } = this.props.loginReducer;
        const { map } = this.props;
        getMapsById({ mapsId: map.mapsId }, user);
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
        const { searchErorr } = this.props.mapDetailReducer;
        const { clearErrorSearch } = this.props.mapDetailAction;
        if (searchErorr) {
            Alert.alert(I18n.t('report'), I18n.t('getMapDetailFail'), [{
                text: 'Ok',
                onPress: (e) => {
                    clearErrorSearch();
                }
            }],
                { cancelable: false })
        }
    }

    render() {
        const { news } = this.props;
        const { mapDetail, searchErorr, isLoading } = this.props.mapDetailReducer;
        var mapImageUrl = null;
        if (mapDetail.path && mapDetail.path != "") {
            mapImageUrl = `${appConfig.API_HOST_BASE}${mapDetail.path}`;
        }
        return (
            <Container>
                <ImageZoom cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={Dimensions.get('window').width}
                    imageHeight={Dimensions.get('window').height}>
                    <Image style={{ flex: 1, resizeMode: 'contain', marginTop: -100 }} source={{ uri: mapImageUrl ? mapImageUrl : 'http://www.uwgb.edu/UWGBCMS/media/Maps/images/map-icon.jpg' }}></Image>
                </ImageZoom>
            </Container>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        mapDetailReducer: state.mapDetailReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        mapDetailAction: bindActionCreators(mapDetailAction, dispatch)
    };
}

MapDetail = connect(mapStateToProps, mapToDispatch)(MapDetail);
export default MapDetail;
