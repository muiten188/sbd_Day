import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  listGuests: [],
  searchGuestsErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_GUESTS:
    return {
      ...state,
      listGuests: action.data,
      isLoading: action.isLoading,
      searchGuestsErorr: initState.searchGuestsErorr,
    };
  case types.SEARCHING_GUESTS:
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case types.SEARCH_GUESTS_ERROR:
    return {
      ...state,
      searchGuestsErorr: true
    };
  case types.SEARCH_GUESTS_CLEAR_ERROR:
    return {
      ...state,
      isLoading: initState.isLoading,
      searchGuestsErorr: initState.searchGuestsErorr
    };


    default:
      return state;
  }
}
