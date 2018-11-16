import * as AppConfig from "../../../config/app_config";
import * as helper from "../../../helper";
import * as types from "../../constants/action_types";

export function getQuestion(user) {
  return async dispatch => {
    dispatch(_searching_Question());
    var _header = await helper.buildHeader(user);
    _header.CURRENT_USER_ID = user.userId;

    fetch(`${AppConfig.GET_QUESTION}`, {
      headers: _header,
      method: "GET",
    })
      .then(function(response) {
        // if (response.status == 401) {
        //   dispatch(helper.logout());
        // } else if (response.status != 200) {
        //   dispatch(_seach_QuestionError());
        // } else {
          return response.json();
        // }
      })
      .then(responseJson => {
        if (responseJson.listData) {
          data = responseJson.listData;
          dispatch(_search_Question(data));
        } else {
          if (!error) {
            dispatch(_seach_QuestionError());
          }
        }
      })
      .catch(function(error) {
        dispatch(_seach_QuestionError());
      });
  };
}

function _search_Question(data) {
  return {
    type: types.SEARCH_QUESTION,
    data: data,
    isLoading: false,
  };
}

function _searching_Question() {
  return {
    type: types.SEARCHING_QUESTION,
    isLoading: true,
  };
}

function _seach_QuestionError() {
  return {
    type: types.SEARCH_QUESTION_ERROR,
    searchErorr: true,
    isLoading: false,
  };
}
export function clearQuestionError() {
  return {
    type: types.SEARCH_QUESTION_CLEAR_ERROR,
  };
}
