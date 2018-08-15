import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listComment: [],
  saveCommentSuccess: null,
  searchListCommentError: false,
  saveCommentErorr: false,
  currentPage: 1,
  pageSize: 10,
  loadEnd: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_COMMENT:
      return {
        ...state,
        listComment: action.data,
        isLoading: action.isLoading,
        searchListCommentError: initState.searchListCommentError,
      };
    case types.SEARCHING_COMMENT:
      return {
        ...state,
        isLoading: true,
      };
    case types.SEARCH_COMMENT_ERROR:
      return {
        ...state,
        searchListCommentError: false,
      };
    case types.SEARCH_COMMENT_CLEAR_ERROR:
      return {
        ...state,
        searchHotNewsError: initState.searchHotNewsError,
        isLoadingHotNews: initState.isLoadingHotNews,
        listComment: initState.listComment
      };

    case types.SAVED_COMMENT:
      return {
        ...state,
        saveCommentSuccess: true,
        isLoading: action.isLoading,
        searchListCommentError: initState.searchListCommentError,
      };
    case types.SAVING_COMMENT:
      return {
        ...state,
        isLoading: true,
      };
    case types.SAVE_COMMENT_ERROR:
      return {
        ...state,
        saveCommentErorr: false,
        saveCommentSuccess: true,
      };
    case types.SAVE_COMMENT_CLEAR_ERROR:
      return {
        ...state,
        saveCommentSuccess: initState.saveCommentSuccess,
        saveCommentErorr: initState.saveCommentErorr,
        isLoading: initState.isLoading
      };
    default:
      return state;
  }
}
