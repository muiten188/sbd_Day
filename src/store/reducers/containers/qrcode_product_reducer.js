import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  objProduct: null,
  searchErorr: false,
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_PRODUCT_BY_QRCODE:
      return {
        ...state,
        objProduct: action.data,
        isLoading: action.isLoading,
        searchErorr: false,
      };
    case types.GETTING_PRODUCT_BY_QRCODE:
      return {
        ...state,
        isLoading: true,
      };
    case types.GETTING_PRODUCT_BY_QRCODE_ERROR:
      return {
        ...state,
        searchErorr: true,
        isLoading: false,
      };
    case types.CLEAR_SEARCH_PRODUCT_BY_QRCODE:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        objProduct:initState.objProduct,
        isLoading: initState.isLoading
      };

    default:
      return state;
  }
}