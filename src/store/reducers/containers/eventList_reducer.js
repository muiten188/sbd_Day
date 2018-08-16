import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  isLoadingNews:false,
  isLoadingHotNews:false,
  listMuseum: [],
  listHotNews: [],
  listNews: [],
  listArea: [],
  searchNewsError:false,
  searchHotNewsError:false,
  searchErorr: false,
  searchAreaErorr: false,
  valuesForm: {},
  currentPage: 1,
  pageSize: 10,
  loadEnd: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {


    case types.SEARCH_HOT_NEWS:
      return {
        ...state,
        listHotNews: action.data,
        isLoadingHotNews: action.isLoadingHotNews,
        searchHotNewsError: initState.searchHotNewsError,
      };
    case types.SEARCHING_HOT_NEWS:
      return {
        ...state,
        isLoadingHotNews: action.isLoadingHotNews,
      };
    case types.SEARCH_HOT_NEWS_ERROR:
      return {
        ...state,
        searchHotNewsError: action.searchHotNewsError,
      };
    case types.SEARCH_HOT_NEWS_CLEAR_ERROR:
      return {
        ...state,
        searchHotNewsError: initState.searchHotNewsError,
        isLoadingHotNews: initState.isLoadingHotNews
      };

    case types.SEARCH_NEWS:
      return {
        ...state,
        listNews: action.data,
        isLoadingNews: action.isLoadingNews,
        searchNewsError: initState.searchNewsError,
      };
    case types.SEARCHING_NEWS:
      return {
        ...state,
        isLoadingNews: action.isLoadingNews,
      };
    case types.SEARCH_NEWS_ERROR:
      return {
        ...state,
        searchNewsError: action.searchNewsError,
      };
    case types.SEARCH_NEWS_CLEAR_ERROR:
      return {
        ...state,
        searchNewsError: initState.searchNewsError,
        isLoadingNews: initState.isLoadingNews
      };

    case types.SEARCH_MUSEUM:
      return {
        ...state,
        listMuseum: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_MUSEUM:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_MUSEUM_ERROR:
      return {
        ...state,
        searchErorr: action.searchErorr,
      };
    case types.SEARCH_MUSEUM_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    case types.SEARCH_AREA:
      return {
        ...state,
        listArea: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchAreaErorr: initState.searchAreaErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_AREA:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_AREA_ERROR:
      return {
        ...state,
        searchAreaErorr: action.searchAreaErorr,
      };
    case types.SEARCH_AREA_CLEAR_ERROR:
      return {
        ...state,
        searchAreaErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };
    default:
      return state;
  }
}
