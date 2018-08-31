import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listHotNews: [],
  searchErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_HOT_NEWS:
      return {
        ...state,
        listHotNews: action.data,
        isLoadingHotNews: action.isLoadingHotNews,
        searchHotNewsError: initState.searchHotNewsError,
      };
    case types.SEARCHING_HOT_NEWS:
      return {
        ...state,
        isLoadingHotNews: action.isLoadingHotNews,
      };
    case types.SEARCH_HOT_NEWS_ERROR:
      return {
        ...state,
        searchHotNewsError: action.searchHotNewsError,
      };
    case types.SEARCH_HOT_NEWS_CLEAR_ERROR:
      return {
        ...state,
        searchHotNewsError: initState.searchHotNewsError,
        isLoadingHotNews: initState.isLoadingHotNews
      };

    default:
      return state;
  }
}
