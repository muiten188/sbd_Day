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
    Right,
    Form,
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import AutoHeightWebView from 'react-native-autoheight-webview';
import * as surveyDetailAction from '../../store/actions/containers/surveyDetail_action';
import { Field, reduxForm,change   } from "redux-form";
import { InputAreaField, CheckBoxField } from "../../components/Element/Form";
import * as helper from '../../helper';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
const validateSurvey = values => {
    const error = {};
    error.username = "";
    error.password = "";
    var username = values.username;
    var password = values.password;
    if (values.username === undefined) {
        username = "";
    }
    if (values.password === undefined) {
        password = "";
    }
    if (username.length == 0 || username == "") {
        error.username = "trống";
    }
    if (password.length == 0 || password == "") {
        error.password = "trống";
    }
    return error;
};

class SurveyDetail extends Component {

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
        const { handleSubmit } = this.props;
        return (
            <Container>
                <Grid>{/* marginBottom: 45 */}
                    <Form style={styles.form}>
                        <View style={{ borderWidth: 0.5, padding: 4, margin: 6 }}>
                            {/* <Icon active name="person" /> */}
                            <Text>
                                Cảm ơn quý khách đã tham dự buổi hội thảo 1. Nếu có thể, quý khách vui lòng cho biết cảm nhận của mình về buổi hội thảo này.
                            </Text>
                        </View>
                        <View style={styles.item}>
                            <Grid>
                                <Col style={styles.label}>
                                    <Text>{I18n.t("Quatity")}</Text>
                                </Col>
                                <Col>
                                    <Grid>
                                        <Col style={styles.center}><Field
                                            icon="user-circle-o"
                                            name="quatityBad"
                                            placeholder={I18n.t("bad")}
                                            label={I18n.t("bad")}
                                            onChange={(values)=>{
                                                this.props.changeFieldValue('quatityNormal', false)
                                                this.props.changeFieldValue('quatityGood', false)
                                            }}
                                            component={CheckBoxField}
                                        />
                                        </Col>
                                        <Col style={styles.center}>
                                            <Field
                                                icon="user-circle-o"
                                                name="quatityNormal"
                                                placeholder={I18n.t("normal")}
                                                label={I18n.t("normal")}
                                                onChange={(values)=>{
                                                    this.props.changeFieldValue('quatityBad', false)
                                                    this.props.changeFieldValue('quatityGood', false)
                                                }}
                                                component={CheckBoxField}
                                            />
                                        </Col>
                                        <Col style={styles.center}>
                                            <Field
                                                icon="user-circle-o"
                                                name="quatityGood"
                                                placeholder={I18n.t("good")}
                                                label={I18n.t("good")}
                                                onChange={(values)=>{
                                                    this.props.changeFieldValue('quatityNormal', false)
                                                    this.props.changeFieldValue('quatityGood', false)
                                                }}
                                                component={CheckBoxField}
                                            />
                                        </Col>
                                    </Grid>
                                </Col>
                            </Grid>
                        </View>
                        <View style={styles.item}>
                            <Grid>
                                <Col style={styles.label}>
                                    <Text>{I18n.t("Quatity")}</Text>
                                </Col>
                                <Col>

                                    <Grid>
                                        <Col style={styles.center}><Field
                                            icon="user-circle-o"
                                            name="helpful"
                                            placeholder={I18n.t("helpful")}
                                            label={I18n.t("helpful")}
                                            component={CheckBoxField}
                                        />
                                        </Col>
                                        <Col style={styles.center}>

                                        </Col>
                                        <Col style={styles.center}>

                                        </Col>
                                    </Grid>
                                </Col>
                            </Grid>
                        </View>
                        <View style={{ minHeight: 140 }}>
                            <Grid>
                                <Col style={styles.label}>
                                    <Text>{I18n.t("comment")}</Text>
                                </Col>
                                <Col>
                                    <Field
                                        name="comment"
                                        placeholder={I18n.t("comment")}
                                        label={I18n.t("good")}
                                        rowSpan={5}
                                        component={InputAreaField}
                                    />
                                </Col>
                            </Grid>
                        </View>
                        <Button
                            full
                            style={[styles.buttonSent, { backgroundColor: '#007db7' }]}
                            onPress={handleSubmit((values) => { alert(JSON.stringify(values)) })}
                        >
                            <Text>
                                {I18n.t("Sent_update")}
                            </Text>
                        </Button>
                    </Form>
                </Grid>
            </Container>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        surveyDetailReducer: state.surveyDetailReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        surveyDetailAction: bindActionCreators(surveyDetailAction, dispatch),
        changeFieldValue: function(field, value) {
            dispatch(change('surveyForm', field, value))
        }
    };
}
SurveyDetail = reduxForm({
    form: "surveyForm",
    validate: validateSurvey,
    enableReinitialize: true
})(SurveyDetail);
SurveyDetail = connect(mapStateToProps, mapToDispatch)(SurveyDetail);
export default SurveyDetail;
