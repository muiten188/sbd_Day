import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  antifactDetail: {},
  listAntifactByTag: [],
  searchAntifactDetailErorr: false,
  searchAntifactBytagErorr: false,
  searchMapidErorr:false,
  valuesForm: {},
  currentPage: 1,
  pageSize: 10,
  loadEnd: false,
  mapId:null
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_ANTIFACT_DETAIL:
      return {
        ...state,
        antifactDetail: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchAntifactDetailErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_ANTIFACT_DETAIL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_ANTIFACT_DETAIL_ERROR:
      return {
        ...state,
        searchAntifactDetailErorr: action.searchErorr,
      };
    case types.SEARCH_ANTIFACT_DETAIL_CLEAR_ERROR:
      return {
        ...state,
        searchAntifactDetailErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    //antifact by tag
    case types.SEARCH_ANTIFACT_BY_TAG:
      return {
        ...state,
        listAntifactByTag: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchAntifactBytagErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_ANTIFACT_BY_TAG:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_ANTIFACT_BY_TAG_ERROR:
      return {
        ...state,
        searchAntifactBytagErorr: action.searchErorr,
      };
    case types.SEARCH_ANTIFACT_BY_TAG_CLEAR_ERROR:
      return {
        ...state,
        searchAntifactBytagErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };
    //mapid
    case types.SEARCH_MAPID_DETAIL:
      return {
        ...state,
        searchMapidErorr: initState.searchMapidErorr,
        isLoading: false,
        mapId: action.data
      };
    case types.SEARCHING_MAPID_DETAIL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_MAPID_DETAIL_ERROR:
      return {
        ...state,
        searchMapidErorr: true,
        isLoading: false,
      };
    case types.SEARCH_MAPID_DETAIL_CLEAR_ERROR:
      return {
        ...state,
        searchMapidErorr: initState.searchMapidErorr,
        isLoading: false
      };

    default:
      return state;
  }
}
