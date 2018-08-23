import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  listNews: [],
  searchNewsErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_NEWS:
      return {
        ...state,
        listNews: action.data,
        isLoading: action.isLoading,
        searchNewsErorr: initState.searchErorr,
      };
    case types.SEARCHING_NEWS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_NEWS_ERROR:
      return {
        ...state,
        searchNewsErorr: action.searchErorr,
        isLoading:false
      };
    case types.SEARCH_NEWS_CLEAR_ERROR:
      return {
        ...state,
        searchNewsErorr: initState.searchErorr,
        isLoading:false
      };

    default:
      return state;
  }
}
