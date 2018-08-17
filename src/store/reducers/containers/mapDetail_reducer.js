import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listArtifacts: [],
  listMuseums: [],
  listNews: [],
  searchErorr: false,
  valuesForm: {},
  loadEnd: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.QUICK_SEARCH_ALL:
      return {
        ...state,
        listArtifacts: action.listArtifacts,
        listMuseums: action.listMuseums,
        listNews: action.listNews,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.QUICK_SEARCHING_ALL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.QUICK_SEARCH_ALL_ERROR:
      return {
        ...state,
        searchErorr: action.searchErorr,
      };
    case types.QUICK_SEARCH_ALL_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    default:
      return state;
  }
}
