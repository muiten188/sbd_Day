import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listHotNews: [],
  didCheckin: false,
  searchErorr: false,

  isLoadingChecking: false,
  searchCheckingErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_HOT_NEWS:
      return {
        ...state,
        listHotNews: action.data,
        isLoading: action.isLoading,
        searchErorr: initState.searchErorr,
      };
    case types.SEARCHING_HOT_NEWS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_HOT_NEWS_ERROR:
      return {
        ...state,
        searchErorr: action.searchErorr,
      };
    case types.SEARCH_HOT_NEWS_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    case types.SEARCH_CHECK_CHECKIN:
      var _didCheckin = false;
      if (action.data.checkInCode != null && action.data.timeCheckIn != null) {
        _didCheckin = true;
      }
      else {
        _didCheckin = false;
      }
      return {
        ...state,
        didCheckin: _didCheckin
      };
    case types.SEARCHING_CHECK_CHECKIN:
      return {
        ...state,
        isLoadingChecking: action.isLoadingChecking,
      };
    case types.SEARCH_CHECK_CHECKIN_ERROR:
      return {
        ...state,
        searchCheckingErorr: action.searchCheckingErorr,
      };
    case types.SEARCH_CHECK_CHECKIN_CLEAR_ERROR:
      return {
        ...state,
        searchCheckingErorr: initState.searchCheckingErorr,
        isLoadingChecking: initState.isLoadingChecking
      };


    default:
      return state;
  }
}
