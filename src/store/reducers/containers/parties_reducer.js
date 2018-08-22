import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  listParties: [],
  searchPartiesErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_PARTIES:
      return {
        ...state,
        listParties: action.data,
        isLoading: action.isLoading,
        searchPartiesErorr: initState.searchPartiesErorr,
      };
    case types.SEARCHING_PARTIES:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_PARTIES_ERROR:
      return {
        ...state,
        searchPartiesErorr: true
      };
    case types.SEARCH_PARTIES_CLEAR_ERROR:
      return {
        ...state,
        searchAntifactDetailErorr: initState.searchErorr,
        isLoading: initState.isLoading,
        searchPartiesErorr: initState.searchPartiesErorr
      };


    default:
      return state;
  }
}
