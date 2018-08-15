import * as types from "../../store/constants/action_types";
const initState = {
  registed: null,
  registing: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        registed: true,
        registing: false,
        action
      };
    case types.REGISTER_EROR:
      return {
        ...state,
        registed: false,
        registing: false,
        action
      };
    case types.REGISTING:
      return {
        ...state,
        registing: true,
        action
      };
    case types.REGISTER_CLEAR:
      return {
        ...state,
        registed: initState.registing,
        registing: initState.registing,
        action
      };
    default:
      return state;
  }
}
