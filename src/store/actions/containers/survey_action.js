import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
export function getSurvey(values, user) {
    let dataPost = values || {};
    return async(dispatch) => {
        dispatch(_getingSurvey());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_SURVEY}?${helper.getQueryString(dataPost)}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    dispatch(helper.logout());
                } else if (response.status != 200) {
                    dispatch(_getSurveyError());
                } else {
                    dispatch(_getSurvey(response._bodyText));
                }
            })
            .catch(function (error) {
                dispatch(_getSurveyError());
            });
    };
}
function _getSurvey(data) {
    return {
        type: types.SURVEY_ALL,
        data: data,
        isLoading: false,
    };
}

function _getingSurvey() {
    return {
        type: types.SURVEY_SEARCHING_ALL,
        isLoading: true
    };
}

function _getSurveyError() {
    return {
        type: types.SURVEY_ALL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearErrorSearch(){
    return {
        type: types.SURVEY_ALL_CLEAR_ERROR,
    };
}