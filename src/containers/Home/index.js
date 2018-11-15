import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  DeviceEventEmitter
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
  Tab, Tabs, TabHeading
} from "native-base";
import styles from "./styles";
import HeaderForm from "../../components/Header_form";
import HeaderContent from "../../components/Header_content";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import Schedule from '../Schedule';
import Parties from '../Parties';
import ItemResult from "../../components/Item_result";
import * as homeAction from "../../store/actions/containers/home_action";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as loginAction from "../../authen/actions/login_action";
import * as helper from '../../helper';
import News from '../News';
import Beacons from 'react-native-beacons-manager'
import IconVector from 'react-native-vector-icons/FontAwesome';
import Eventlist from '../Event_List';
import Profile from '../Profile';
import Notification from '../Notification';
import NotificationDetail from '../Notification_Detail';
import NewsDetail from "../NewsDetail";
import Presentation from "../Presentation";
import PresentationDetail from "../PresentationDetail";
import Product from "../Product";
import ProductDetail from "../ProductDetail";
import Map from "../Map";
import MapDetail from "../MapDetail";
import Survey from "../Survey";
import SurveyDetail from "../SurveyDetail";
import ChangePassword from "../ChangePassword";
import FcmClient from '../../helper/fcmClient';
import * as Appconfig from '../../helper/index';
import SubmitQuestion from "../SubmitQuestion";
import ListQuestion from "../ListQuestion";
import Introduction from "../Introduction";
import Guests from "../Guests";
const blockAction = false;
const blockLoadMoreAction = false;
const blockUUID = false;
const timeoutUUID = null;
const current_uuid = null;
const eventBeacons = null;
class Home extends Component {
  currentApartment = {};
  static navigationOptions = {
    header: null
  };

  async detectBeacons() {
    // Tells the library to detect iBeacons
    Beacons.detectIBeacons()
    //Beacons.requestWhenInUseAuthorization();
    // Start detecting all iBeacons in the nearby
    try {
      await Beacons.startRangingBeaconsInRegion('REGION1')
      console.log(`Beacons ranging started succesfully!`)
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`)
    }


  }

  constructor(props) {
    super(props);
    // Print a log of the detected iBeacons (1 per second)
    console.log('home construct')
    this.state = {
      languageSelect: 'vn',
      currentTab: this.props.screenId == "notification" ? 1 : 0,
      initialPage: this.props.screenId == "notification" ? 1 : 0
    };
    this.loadSetting();
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

  componentWillMount() {
    const { user } = this.props.loginReducer;
    if (FcmClient.registed == false) {
      FcmClient.registerFCM(user.userId);
    }
    // FcmClient.newEvent.addListener('fcm-event-user-group', (obj) => {
    //   if (obj.isUser) {
    //     this.setState({ tabActivePosition: 0 })
    //   } else {
    //     this.setState({ tabActivePosition: 1 })
    //   }
    // });

  }

  componentDidMount() {
    const { get_AntifactByUUID } = this.props.homeAction;
    const { setUser } = this.props.loginAction;
    const { user } = this.props.loginReducer;
    // if (!user) {
    //   helper.getAsyncStorage("@userLogin", (promise) => {
    //     promise.done((value) => {
    //       if (value != '' && value != null) {
    //         var user = JSON.parse(value);
    //         setUser(user);
    //       }
    //     })
    //   })
    // }

    // eventBeacons = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
    //   //console.log('Tìm thấy beacon:', data)
    //   if (data.beacons && data.beacons.length > 0) {

    //     if (data.beacons[0].uuid != current_uuid) {
    //       current_uuid = data.beacons[0].uuid;
    //       if (Actions.currentScene == 'News') {
    //         Actions.pop();
    //       }
    //       Actions.News({ beaconUUID: current_uuid })
    //       //get_AntifactByUUID({ beaconUUID: current_uuid });
    //       //blockUUID = true;
    //       // if (timeoutUUID) {
    //       //   clearTimeout(timeoutUUID);
    //       // }
    //       // setTimeout(() => {
    //       //   current_uuid = null;
    //       // }, 30000);
    //     }
    //     console.log('Tìm thấy beacon:', data.beacons[0].uuid)
    //   }
    // })
    // this.detectBeacons();
    // const { notifiTabActive } = this.props;
    // this.setState({ currentTab: 1 })
  }

  componentWillUnmount() {
    const { user } = this.props.loginReducer;
    // FcmClient.unRegisterFCM(user.userId);
    if (eventBeacons) {
      eventBeacons.remove();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props.navigation;
    const { isLoading, listResult } = this.props.homeReducer;
    // if (this.loading.getState() == true) {
    //   this.loading.hide();
    // }
    // if (this.smallLoading.getState() == true) {
    //   this.smallLoading.hide();
    // }
    // if (
    //   listResult.length == 1 &&
    //   listResult[0].apartmentId != this.currentApartment.apartmentId
    // ) {
    //   if (!blockAction) {
    //     blockAction = true;
    //     this.currentApartment = listResult[0];
    //     //push
    //     setTimeout(() => {
    //       blockAction = false;
    //     }, 700);
    //   }
    // }
  }

  render() {
    const locale = "vn";
    const { dispatch } = this.props.navigation;
    const {
      listResult,
      isLoading,
      searchErorr,
      valuesForm,
      currentPage,
      pageSize,
      loadEnd
    } = this.props.homeReducer;
    blockLoadMoreAction = loadEnd;
    const { homeAction } = this.props;
    const { user } = this.props.loginReducer;

    return (

      <Container style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container_outer}
          keyboardVerticalOffset={-350}
        >
          <Grid>
            <Col size={68} style={[styles.grid_col, styles.col_content]}>
              <View style={{ position: 'absolute', bottom: 4, left: 4, width: 34, height: 34 }}>
                <Loading ref={ref => {
                  this.smallLoading = ref;
                }} />
              </View>
              <HeaderContent headerTitle={this.getTextHeader()} showButtonLeft={this.showButtonLeft()} />
              <View style={styles.listResult_container}>
                <Tabs page={this.state.currentTab} locked={true} onChangeTab={(io) => {
                  // if (io.i == 0 && io.from == 0) {
                  //   Actions.reset('home', { screenId: 'eventList' })
                  //   return;
                  // }
                }} tabBarPosition="bottom" tabBarUnderlineStyle={styles.tabBarUnderlineStyle} style={{ backgroundColor: 'transparent' }}>
                  
                  
                  <Tab
                    heading={<TabHeading style={styles.tabHeading}>
                      <Grid>
                        <Row style={styles.iconTab}>
                          <IconVector name="home" style={{color:'#000'}} size={20} />
                        </Row>
                        <Row style={styles.textHeadingTab}>
                          <Text style={styles.textHeaderTab}>{I18n.t("home")}</Text>
                        </Row>
                      </Grid>
                    </TabHeading>}>
                    {this.renderEventTab()}
                  </Tab>



                  <Tab activeTabStyle={{ backgroundColor: "yellow" }} heading={<TabHeading style={styles.tabHeading}>
                    <Grid>
                      <Row style={styles.iconTab}>
                      <Image style={{ width: 18, height: 18 }} source={require('../../resources/assets/icon/ThongBao.png')} ></Image>
                      </Row>
                      <Row style={styles.textHeadingTab}>
                        <Text style={styles.textHeaderTab}>{I18n.t("notification")}</Text>
                      </Row>
                    </Grid>
                  </TabHeading>}>
                    {this.renderNotifiTab()}
                    {/* <Notification /> */}
                  </Tab>

                  {user && user.accountType === 'COORDINATOR' && 
                    <Tab activeTabStyle={{ backgroundColor: "yellow" }} heading={<TabHeading style={styles.tabHeading}>
                    <Grid>
                      <Row style={styles.iconTab}>
                      <Image style={{ width: 18, height: 18 }} source={require('../../resources/assets/icon/DanhSachCauHoi.png')} ></Image>
                      </Row>
                      <Row style={styles.textHeadingTab}>
                        <Text style={styles.textHeaderTab}>{I18n.t("questions")}</Text>
                      </Row>
                    </Grid>
                  </TabHeading>}>
                    {this.renderListQuestionsTab()}
                  </Tab>
                  }


                  <Tab heading={<TabHeading style={styles.tabHeading}>
                    <Grid>
                      <Row style={styles.iconTab}>
                        <IconVector name="user" style={{color:'#000'}} size={20} />
                      </Row>
                      <Row style={styles.textHeadingTab}>
                        <Text style={styles.textHeaderTab}>{I18n.t("profile")}</Text>
                      </Row>
                    </Grid>
                  </TabHeading>}>
                    {this.renderProfileTab()}

                  </Tab>
                </Tabs>
                <Loading
                  ref={ref => {
                    this.loading = ref;
                  }}
                  isShow={isLoading}
                />
              </View>
            </Col>
          </Grid>
        </KeyboardAvoidingView>
      </Container >
    );
  }

  renderProfileTab() {
    switch (this.props.screenId) {
      case "notification":
      case null:
      case undefined:
        return (
          <Profile />
        )
        break;
      case 'changePassword':
        return (
          <ChangePassword />
        )
        break;
      default:
        return (<Profile />)
        break;
    }
  }
  renderListQuestionsTab() {
    return <ListQuestion />;
  }
  renderNotifiTab() {
    switch (this.props.screenId) {
      case "notification":
      case null:
      case undefined:
        return (
          <Notification />
        )
        break;
      case 'notifiDetail':
        return (
          <NotificationDetail />
        )
        break;
      default:
        return (
          <Notification />
        )
        break;
    }
  }

  renderEventTab() {
    Appconfig.currentScreen=this.props.screenId;
    switch (this.props.screenId) {
      case "eventList":
      case null:
      case undefined:
        return (
          <Eventlist />
        )
        break;
      case "schedule":
        return (<Schedule></Schedule>)
        break;
      case "introduction":
        return (<Introduction></Introduction>)
        break;
        case "guests":
          return (<Guests></Guests>)
          break;
      case "parties":
        return (<Parties></Parties>)
        break;
      case "news":
        return (<News></News>)
        break;
      case "newsDetaill":
        return (<NewsDetail newsItem={this.props.newsItem} listAllNews={this.props.listAllNews}></NewsDetail>)
        break;
      case "presentation":
        return (<Presentation></Presentation>)
        break;
      case "presentationDetail":
        return (<PresentationDetail scheduleItem={this.props.scheduleItem} scheduleAllItem={this.props.scheduleAllItem}></PresentationDetail>)
        break;
      case "product":
        return (<Product beacon={this.props.beacon}></Product>)
        break;
      case "productDetail":
        return (<ProductDetail product={this.props.product} listProduct={this.props.listProduct}></ProductDetail>)
        break;
      case "location":
        return (<Map></Map>)
        break;
      case "locationDetail":
        return (<MapDetail map={this.props.map}></MapDetail>)
        break;
      case "survey":
        return (<Survey></Survey>)
        break;
        case "submit_question":
          return (<SubmitQuestion/>)
          break;
      case "surveyDetail":
        return (<SurveyDetail></SurveyDetail>)
        break;

      default:
        return (<Eventlist />)
        break;
    }
  }

  getTextHeader() {
    switch (this.props.screenId) {
      case "eventList":
      case null:
      case undefined:
        return I18n.t("saobacdau_event")
        break;
      case "schedule":
        return I18n.t("Schedule")
      case "parties":
        return I18n.t("Parties")
        break;
      case "news":
        return I18n.t("News")
        break;
      case "newsDetaill":
        return I18n.t("News")
        break;
      case "presentation":
        return I18n.t("Speech")
        break;
      case "presentationDetail":
        return I18n.t("Speech")
        break;
      case "product":
        return I18n.t("Product")
        break;
      case "productDetail":
        return I18n.t("Product")
        break;
      case "location":
        return I18n.t("Location")
        break;
      case "locationDetail":
        return I18n.t("Location")
        break;
      case "survey":
        return I18n.t("Survey")
        break;
      case "surveyDetail":
        return I18n.t("Survey")
        break;
      case "notification":
        return I18n.t("notification")
        break;
      case 'notifiDetail':
        return I18n.t("notification")
        break;
      default:
        return I18n.t("saobacdau_event")
        break;
    }
  }

  showButtonLeft() {
    switch (this.props.screenId) {
      case "eventList":
      case null:
      case undefined:
        return false
        break;
      default:
        return true
        break;
    }
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    const { dispatch } = this.props.navigation;
    const { listResult } = this.props.homeReducer;
    return (
      <TouchableOpacity
        key={item.index}
        style={styles.item_container_full
        }
        onPress={() => {
          if (!blockAction) {
            blockAction = true;
            setTimeout(() => {
              blockAction = false;
            }, 800);
          }
        }}
      >
        <ItemResult
          key={item.index}
          userName={item.ownerName}
          position={item.apartmentName}
          phone={item.ownerPhone}
          avatarUrl={item.avatarUrl}
          item={item}
        />
        {item.paymentStatus == true ? <Icon style={styles.check_half} name="check"></Icon> : null}

      </TouchableOpacity>
    );
  }
  _keyExtractor(item, index) {
    return index;
  }
}
function mapStateToProps(state, props) {
  return {
    homeReducer: state.homeReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    homeAction: bindActionCreators(homeAction, dispatch),
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}
// export default reduxForm({
//   form: "search"
// })(connect(mapStateToProps, mapToDispatch)(search));

// search = reduxForm({
//   form: "search"
//   // enableReinitialize: true
// })(search);
Home = connect(mapStateToProps, mapToDispatch)(Home);
export default Home;
