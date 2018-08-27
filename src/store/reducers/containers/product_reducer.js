import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listProduct: [],
  searchErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.PRODUCT_ALL:
      return {
        ...state,
        listProduct: action.data,
        isLoading: action.isLoading,
        searchErorr: initState.searchErorr,
      };
    case types.PRODUCT_SEARCHING_ALL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.PRODUCT_ALL_ERROR:
      return {
        ...state,
        searchErorr: action.searchErorr,
      };
    case types.PRODUCT_ALL_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    default:
      return state;
  }
}
