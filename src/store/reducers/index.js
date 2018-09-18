//authen
import loginReducer from "../../authen/reducers/login_reducer";
import registerReducer from "../../authen/reducers/register_reducer";
//app
import homeReducer from "./containers/home_reducer";
import EventlistReducer from "./containers/eventList_reducer";
import ScheduleReducer from "./containers/schedule_reducer";
import newsReducer from "./containers/news_reducer";
import partiesReducer from "./containers/parties_reducer";
import notificationReducer from "./containers/notification_reducer";
import notificationDetailReducer from "./containers/notificationDetail_reducer";
import profileReducer from "./containers/profile_reducer";
import changePasswordReducer from "./containers/changePassword_reducer";
import commentReducer from "./component/comment_reducer";
import newsDetailReducer from "./containers/newsDetail_reducer";
import guiderReducer from "./containers/guider_reducer";
import guiderRatingReducer from "./containers/guider_rating_reducer";
import app_Reducer from "./app_reducer";
import qrCodeScannerReducer from './containers/qrCodeScanner_reducer';
import presentationReducer from './containers/presentation_reducer';
import guestsReducer from './containers/guests_reducer';
import presentationDetailReducer from './containers/presentationDetail_reducer';
import surveyReducer from './containers/survey_reducer';
import surveyDetailReducer from './containers/surveyDetail_reducer';
import productReducer from './containers/product_reducer';
import productDetail_reducer from './containers/productDetail_reducer';
import mapReducer from './containers/map_reducer';
import mapDetailReducer from './containers/mapDetail_reducer';
import museumMapReducer from './containers/MuseumMap_reducer';
import router_Reducer from "./router/router_reducer";
import questionReducer from "./containers/question_reducer";
import * as types from "../constants/action_types";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { Actions } from "react-native-router-flux";
import * as helper from '../../helper/index';
const appReducer = combineReducers({
  loginReducer,
  registerReducer,
  guestsReducer,
  homeReducer,
  EventlistReducer,
  ScheduleReducer,
  newsReducer,
  partiesReducer,
  newsDetailReducer,
  guiderReducer,
  guiderRatingReducer,
  notificationReducer,
  notificationDetailReducer,
  profileReducer,
  changePasswordReducer,
  commentReducer,
  qrCodeScannerReducer,
  presentationReducer,
  presentationDetailReducer,
  surveyReducer,
  surveyDetailReducer,
  productReducer,
  productDetail_reducer,
  mapReducer,
  mapDetailReducer,
  museumMapReducer,
  app_Reducer,
  router_Reducer,
  questionReducer,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGGED_OUT) {
    state.loginReducer = undefined;
    helper.clearAsyncStorage();
    Actions.reset('login');
  }
  return appReducer(state, action);
};
export default rootReducer;