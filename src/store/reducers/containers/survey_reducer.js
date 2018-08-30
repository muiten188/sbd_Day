import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  surveyUrl: null,
  searchErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SURVEY_ALL:
      return {
        ...state,
        surveyUrl: action.data,
        isLoading: action.isLoading,
        searchErorr: initState.searchErorr,
      };
    case types.SURVEY_SEARCHING_ALL:
      return {
        ...state,
        isLoading: true,
      };
    case types.SURVEY_ALL_ERROR:
      return {
        ...state,
        searchErorr: true,
      };
    case types.SURVEY_ALL_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    default:
      return state;
  }
}
