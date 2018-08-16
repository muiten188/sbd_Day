//authen
import loginReducer from "../../authen/reducers/login_reducer";
import registerReducer from "../../authen/reducers/register_reducer";
//app
import homeReducer from "./containers/home_reducer";
import EventlistReducer from "./containers/eventList_reducer";
import ScheduleReducer from "./containers/schedule_reducer";
import newsReducer from "./containers/news_reducer";
import partiesReducer from "./containers/parties_reducer";
import findGuiderReducer from "./containers/findGuider_reducer";
import profileReducer from "./containers/profile_reducer";
import commentReducer from "./component/comment_reducer";
import searchHistoryReducer from "./containers/searchHistory_reducer";
import guiderReducer from "./containers/guider_reducer";
import guiderRatingReducer from "./containers/guider_rating_reducer";
import app_Reducer from "./app_reducer";
import qrCodeScannerReducer from './containers/qrCodeScanner_reducer';
import searchMuseumReducer from './containers/searchMuseum_reducer';
import museumMapReducer from './containers/MuseumMap_reducer';
import router_Reducer from "./router/router_reducer";
import * as types from "../constants/action_types";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const appReducer = combineReducers({
  loginReducer,
  registerReducer,
  homeReducer,
  EventlistReducer,
  ScheduleReducer,
  newsReducer,
  partiesReducer,
  searchHistoryReducer,
  guiderReducer,
  guiderRatingReducer,
  findGuiderReducer,
  profileReducer,
  commentReducer,
  qrCodeScannerReducer,
  searchMuseumReducer,
  museumMapReducer,
  app_Reducer,
  router_Reducer,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGGED_OUT) {
    state.loginReducer = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;