import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  presentationDetail: {},
  searchPresentationDetailErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_PRESENTATION_DETAIL:
      return {
        ...state,
        presentationDetail: action.data,
        isLoading: action.isLoading,
        searchPresentationDetailErorr: initState.searchErorr,
      };
    case types.SEARCHING_PRESENTATION_DETAIL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_PRESENTATION_DETAIL_ERROR:
      return {
        ...state,
        searchPresentationDetailErorr: action.searchErorr,
        isLoading: false
      };
    case types.SEARCH_PRESENTATION_DETAIL_CLEAR_ERROR:
      return {
        ...state,
        searchPresentationDetailErorr: initState.searchErorr,
        isLoading: false
      };

    default:
      return state;
  }
}
