import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

import * as helper from '../../../helper';
export function getNotification(values, user) {
    let dataPost = values || {};
    return async (dispatch) => {
        dispatch(_getingNotification());
        var _header = await helper.buildHeader(user);
        var parram = helper.getQueryString(dataPost);
        fetch(`${AppConfig.GET_NOTIFICATION}?${parram}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    dispatch(helper.logout());
                } else if (response.status != 200) {
                    dispatch(_getNotificationError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson.data) {

                    data = responseJson.data;
                    dispatch(_getNotification(data, dataPost));

                }
                else {
                    if (!error) {
                        dispatch(_getNotificationError());
                    }
                }
            })
            .catch(function (error) {
                dispatch(_getNotificationError());
            });
    };
}
function _getNotification(data) {
    return {
        type: types.NOTIFICATION_ALL,
        data: data,
        isLoading: false,
    };
}

function _getingNotification() {
    return {
        type: types.NOTIFICATION_SEARCHING_ALL,
        isLoading: true
    };
}

function _getNotificationError() {
    return {
        type: types.NOTIFICATION_ALL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearErrorSearch() {
    return {
        type: types.NOTIFICATION_ALL_CLEAR_ERROR,
    };
}