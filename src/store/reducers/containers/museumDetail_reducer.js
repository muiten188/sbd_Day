import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  listAntifact: [],
  museumDetail: {},
  museumDetailError: false,
  searchAntifactErorr: false,
  valuesForm: {},
  currentPage: 1,
  pageSize: 10,
  loadEnd: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_ANTIFACT:
      return {
        ...state,
        listAntifact: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchAntifactErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_ANTIFACT:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_ANTIFACT_ERROR:
      return {
        ...state,
        searchAntifactErorr: action.searchErorr,
        isLoading: false
      };
    case types.SEARCH_ANTIFACT_CLEAR_ERROR:
      return {
        ...state,
        searchAntifactErorr: initState.searchErorr
      };
    //museum detail
    case types.SEARCH_MUSEUMDETAIL:
    
      return {
        ...state,
        museumDetail: action.data,
        isLoading: action.isLoading,
        museumDetailError: initState.museumDetailError,
      };
    case types.SEARCHING_MUSEUMDETAIL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_MUSEUMDETAIL_ERROR:
      return {
        ...state,
        museumDetailError: action.museumDetailError,
        isLoading: false
      };
    case types.SEARCH_MUSEUMDETAIL_CLEAR_ERROR:
      return {
        ...state,
        museumDetailError: initState.museumDetailError
      };

    default:
      return state;
  }
}
