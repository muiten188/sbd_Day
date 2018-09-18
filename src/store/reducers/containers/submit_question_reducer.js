import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  saveSubmitQuestionSuccess: null,
  searchListSubmitQuestionError: false,
  saveSubmitQuestionErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SAVED_SUBMIT_QUESTION:
      return {
        ...state,
        saveSubmitQuestionSuccess: true,
        isLoading: action.isLoading,
        searchListSubmitQuestionError: initState.searchListSubmitQuestionError,
      };
    case types.SAVING_SUBMIT_QUESTION:
      return {
        ...state,
        isLoading: true,
      };
    case types.SAVE_SUBMIT_QUESTION_ERROR:
      return {
        ...state,
        saveSubmitQuestionErorr: false,
        saveSubmitQuestionSuccess: true,
      };
    case types.SAVE_SUBMIT_QUESTION_CLEAR_ERROR:
      return {
        ...state,
        saveSubmitQuestionSuccess: initState.saveSubmitQuestionSuccess,
        saveSubmitQuestionErorr: initState.saveSubmitQuestionErorr,
        isLoading: initState.isLoading
      };
    default:
      return state;
  }
}
