import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  mapDetail: null,
  searchErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.MAP_DETAIL_ALL:
      return {
        ...state,
        mapDetail: action.data,
        isLoading: action.isLoading,
        searchErorr: initState.searchErorr,
      };
    case types.MAP_DETAIL_SEARCHING_ALL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.MAP_DETAIL_ALL_ERROR:
      return {
        ...state,
        searchErorr: true,
      };
    case types.MAP_DETAIL_ALL_CLEAR_ERROR:
      return {
        ...state,
        mapDetail: initState.mapDetail,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };


    default:
      return state;
  }
}
