import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listMap: [],
  searchErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.MAP_ALL:
      return {
        ...state,
        listMap: action.data,
        isLoading: action.isLoading,
        searchErorr: initState.searchErorr,
      };
    case types.MAP_SEARCHING_ALL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.MAP_ALL_ERROR:
      return {
        ...state,
        searchErorr: true,
      };
    case types.MAP_ALL_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    default:
      return state;
  }
}
