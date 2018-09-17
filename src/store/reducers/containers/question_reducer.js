import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  listQuestion: [],
  searchQuestionErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_QUESTION:
      return {
        ...state,
        listQuestion: action.data,
        isLoading: action.isLoading,
        searchQuestionErorr: initState.searchErorr,
      };
    case types.SEARCHING_QUESTION:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_QUESTION_ERROR:
      return {
        ...state,
        searchQuestionErorr: action.searchErorr,
        isLoading:false
      };
    case types.SEARCH_QUESTION_CLEAR_ERROR:
      return {
        ...state,
        searchQuestionErorr: initState.searchErorr,
        isLoading:false
      };

    default:
      return state;
  }
}
