import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  listNewsDetail: [],
  searchNewsDetailErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_NEWS_DETAIL:
      return {
        ...state,
        listNewsDetail: action.data,
        isLoading: action.isLoading,
        searchNewsDetailErorr: initState.searchErorr,
      };
    case types.SEARCHING_NEWS_DETAIL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_NEWS_DETAIL_ERROR:
      return {
        ...state,
        searchNewsDetailErorr: action.searchErorr,
        isLoading: false
      };
    case types.SEARCH_NEWS_DETAIL_CLEAR_ERROR:
      return {
        ...state,
        searchNewsDetailErorr: initState.searchErorr,
        isLoading: false
      };

    default:
      return state;
  }
}
