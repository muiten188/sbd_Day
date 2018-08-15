import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
export function get_AntifactByUUID(values, user) {
  let data = [];

  let dataPost = values || {};
  //dataPost = { ...dataPost };
  return dispatch => {
    //dispatch(_searching_Antifact());
    fetch(`${AppConfig.GET_ANTIFACT_BY_UUID}?${helper.getQueryString(dataPost)}`, {
      headers: helper.buildHeader(user),
      method: "GET"
    })
      .then(function (response) {
        if (response.status == 401) {
          //dispatch(_logout());
        } else if (response.status != 200) {
          dispatch(_seach_ANTIFACT_BY_UUIDError());
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        if (responseJson) {
          data = responseJson
          //dispatch(_search_ANTIFACT_BY_UUID(data));
          Actions.museumProduct({ paramPassAction: data });
        }
        else {
          dispatch(_seach_ANTIFACT_BY_UUIDError());
        }
      })
      .catch(function (error) {
        dispatch(_seach_ANTIFACT_BY_UUIDError());
      });
  };
}
function _search_ANTIFACT_BY_UUID(data) {
  return {
    type: types.SEARCH_ANTIFACT_BY_UUID,
    data: data,
    isLoading: false,
    valuesForm: null
  };
}

function _searching_ANTIFACT_BY_UUID() {
  return {
    type: types.SEARCHING_ANTIFACT_BY_UUID,
    isLoading: true
  };
}

function _seach_ANTIFACT_BY_UUIDError() {
  return {
    type: types.SEARCH_ANTIFACT_BY_UUID_ERROR,
    searchErorr: true,
    isLoading: false
  };
}
export function clearANTIFACT_BY_UUIDError() {
  return {
    type: types.SEARCH_ANTIFACT_BY_UUID_CLEAR_ERROR
  };
}