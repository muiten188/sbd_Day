import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listNotification: [],
  searchErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.NOTIFICATION_ALL:
      return {
        ...state,
        listNotification: action.data,
        isLoading: action.isLoading,
        searchErorr: initState.searchErorr,
      };
    case types.NOTIFICATION_SEARCHING_ALL:
      return {
        ...state,
        isLoading: true,
      };
    case types.NOTIFICATION_ALL_ERROR:
      return {
        ...state,
        searchErorr: true,
      };
    case types.NOTIFICATION_ALL_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    default:
      return state;
  }
}