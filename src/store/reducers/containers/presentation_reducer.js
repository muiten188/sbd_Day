import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  listPresentation: [],
  searchPresentationErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_PRESENTATION:
    return {
      ...state,
      listPresentation: action.data,
      isLoading: action.isLoading,
      searchPresentationErorr: initState.searchPresentationErorr,
    };
  case types.SEARCHING_PRESENTATION:
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case types.SEARCH_PRESENTATION_ERROR:
    return {
      ...state,
      searchPresentationErorr: true
    };
  case types.SEARCH_PRESENTATION_CLEAR_ERROR:
    return {
      ...state,
      isLoading: initState.isLoading,
      searchPresentationErorr: initState.searchPresentationErorr
    };


    default:
      return state;
  }
}
