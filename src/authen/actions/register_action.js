import { AsyncStorage } from "react-native";
import { Keyboard } from "react-native";
import * as types from "../../store/constants/action_types";
import * as AppConfig from "../../config/app_config";
import { Actions } from 'react-native-router-flux';

function getQueryString(params) {
  return Object.keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join("&");
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");
}

export function register(user) {

  return dispatch => {
    //dispatch(_register(true, user));
    Keyboard.dismiss();
    //Actions.home()
    dispatch(_registing());
    let error = false;
    fetch(`${AppConfig.REGISTER}?${getQueryString(user)}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        
        if (response.status != 200) {
          dispatch(_register(false));
          error = true;
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson) {
          var oUser = responseJson;
          dispatch(_register(true, oUser));

        }
        else {
          if (!error) {
            dispatch(_register(false));
          }
        }
      })
      .catch(function (error) {
        dispatch(_register(false));
      });
  };
}

export function _registing() {
  return {
    type: types.REGISTING,
    Loging: true
  };
}

export function _register(status, user) {
  if (status) {
    return {
      type: types.REGISTER_SUCCESS,
      user: user,
      Logged: status
    };
  } else {
    return {
      type: types.REGISTER_EROR,
      Logged: status
    };
  }
}

export function clearRegister(){
  return {
    type: types.REGISTER_CLEAR,
  };
}