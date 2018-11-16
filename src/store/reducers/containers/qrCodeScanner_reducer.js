import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  checkInQrCode: null,
  searchErorr: false,
  checked:false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_CHECKIN_BY_QRCODE:
      var _checkInQrCode = null;
      // var _searchErorr=initState.searchErorr;
      _checkInQrCode = action.data
      return {
        ...state,
        checkInQrCode: _checkInQrCode,
        isLoading: action.isLoading,
        searchErorr: false,
      };
    case types.CHECKED_BY_QRCODE:
      return {
        ...state,
        checked:true,
        checkInQrCode:initState.checkInQrCode
      }
    case types.SEARCHING_CHECKIN_BY_QRCODE:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_CHECKIN_BY_QRCODE_ERROR:
      return {
        ...state,
        searchErorr: action.searchErorr,
      };
    case types.SEARCH_CHECKIN_BY_QRCODE_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading,
        checked:initState.checked,
        checkInQrCode:initState.checkInQrCode
      };

    default:
      return state;
  }
}
