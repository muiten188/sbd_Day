import * as types from "../../constants/action_types";
import { FETCH_CATCH } from "../../constants/action_types";
const initState = {
  isLoading: false,
  antifactByUUID: [],
  listAntifactByTag: [],
  searchAntifactByUUIDErorr: false,
  searchAntifactBytagErorr: false,
  valuesForm: {},
  currentPage: 1,
  pageSize: 10,
  loadEnd: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_ANTIFACT_BY_UUID:
      return {
        ...state,
        antifactByUUID: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchAntifactByUUIDErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_ANTIFACT_BY_UUID:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_ANTIFACT_BY_UUID_ERROR:
      return {
        ...state,
        searchAntifactByUUIDErorr: action.searchErorr,
      };
    case types.SEARCH_ANTIFACT_BY_UUID_CLEAR_ERROR:
      return {
        ...state,
        searchAntifactByUUIDErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    default:
      return state;
  }
}
