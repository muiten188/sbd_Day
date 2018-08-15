import { AsyncStorage } from "react-native";
import { Keyboard } from "react-native";
import * as types from "../../store/constants/action_types";
import * as AppConfig from "../../config/app_config";
import { Actions } from 'react-native-router-flux';

export function login_Socail(user, typeSocail) {
  return dispatch => {
    dispatch(_loging());
    var _user = {};
    if (typeSocail == "GOOGLE") {
      _user.firstName = user.givenName;
      _user.lastName = user.familyName;
      _user.socialIdentification=user.id;
      _user.loginMethod = typeSocail;
      _user.name = user.name;
    }
    else if(typeSocail=="FACEBOOK"){
      _user.firstName = user.first_name;
      _user.lastName = user.last_name;
      _user.socialIdentification=user.id;
      _user.loginMethod = typeSocail;
      _user.name = user.name;
    }
    let error = false;
    fetch(`${AppConfig.LOGIN_SOCAIL}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(_user)
    })
      .then(function (response) {
        if (response.status != 200) {
          dispatch(_login(false));
          error = true;
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson && responseJson.user) {
          var oUser = responseJson;
          dispatch(_login(true, oUser));

        }
        else {
          if (!error) {
            dispatch(_login(false));
          }
        }
      })
      .catch(function (error) {
        dispatch(_login(false));
      });
  };
}

export function login(user) {

  return dispatch => {
    //dispatch(_login(true, user));
    Keyboard.dismiss();
    //Actions.home()
    dispatch(_loging());
    let error = false;
    fetch(`${AppConfig.LOGIN}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(function (response) {
        if (response.status != 200) {
          dispatch(_login(false));
          error = true;
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson && responseJson.user) {
          var oUser = responseJson;
          dispatch(_login(true, oUser));

        }
        else {
          if (!error) {
            dispatch(_login(false));
          }
        }
      })
      .catch(function (error) {
        dispatch(_login(false));
      });
  };
}

export function setFormLogin(userForm) {
  return {
    type: types.EXPORT_FORM,
    userForm: userForm
  };
}

export function _loging() {
  return {
    type: types.LOGIN,
    Loging: true
  };
}

export function _login(status, user) {
  if (status) {
    return {
      type: types.LOGIN_SUCCESS,
      user: user,
      Logged: status
    };
  } else {
    return {
      type: types.LOGIN_EROR,
      Logged: status
    };
  }
}

export function setUser(user) {
  return dispatch => {
    dispatch(_login(true, user));
  };
}

export function logout() {
  return {
    type: types.LOGGED_OUT
  };
}
