import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  listAntifact: [],
  schedule: {},
  scheduleError: false,
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
    case types.SEARCH_Schedule:
    
      return {
        ...state,
        schedule: action.data,
        isLoading: action.isLoading,
        scheduleError: initState.scheduleError,
      };
    case types.SEARCHING_Schedule:
      return {
        ...state,
        isLoading: true,
      };
    case types.SEARCH_Schedule_ERROR:
      return {
        ...state,
        scheduleError: true,
        isLoading: false
      };
    case types.SEARCH_Schedule_CLEAR_ERROR:
      return {
        ...state,
        scheduleError: initState.scheduleError,
        isLoading: false
      };

    default:
      return state;
  }
}
