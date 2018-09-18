import * as AppConfig from "../../../config/app_config";
import * as helper from "../../../helper";
import * as types from "../../constants/action_types";
import I18n from "../../../i18n/i18n";

export function postSubmitQuestion(values, user) {
  return async dispatch => {
    dispatch(_saveing_Submit_Question());
    let error = false;
console.log('xac nhan');

    fetch(`${AppConfig.GET_SUBMIT_QUESTION}`, {
      method: "POST", 
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "JSESSIONID": user.jSessionId
      },
      body: JSON.stringify({
        "content": values.content,
        "questionFor": values.guestName,
        // "scheduleId": values.scheduleId,
        "title": values.title
      }),
    })
      .then(function(response) {
        console.log('log nua ne',response);
        
        if (response.status != 200) {
          dispatch(_save_Submit_Question(false));
          error = true;
        } else {
          return response.json();
        }
      })
      .then(function(responseJson) {
        if (responseJson) {
          console.log('submit',responseJson);
          alert(I18n.t('submit_question_successfully'))
          dispatch(_save_Submit_Question(true, responseJson));
        } else {
          if (!error) {
            dispatch(_save_Submit_Question(false));
          }
        }
      })
      .catch(function(error) {
        console.log('cuoi cung',error);
        
        dispatch(_save_Submit_Question(false));
      });
  };
}

function _saveing_Submit_Question() {
  return {
    type: types.SAVING_SUBMIT_QUESTION,
    isLoading: true,
  };
}

function _save_Submit_Question(isSuccess) {
  if (isSuccess) {
    return {
      type: types.SAVED_SUBMIT_QUESTION,
      isLoading: false,
      saveSubmit_QuestionErorr: false,
    };
  } else {
    return {
      type: types.SAVE_SUBMIT_QUESTION_ERROR,
      isLoading: false,
      saveSubmit_QuestionErorr: true,
    };
  }
}
export function clear_Save_Submit_Question_Error() {
  return {
    type: types.SAVE_SUBMIT_QUESTION_CLEAR_ERROR,
  };
}