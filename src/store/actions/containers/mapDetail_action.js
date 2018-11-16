import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
export function getMapsById(values, user) {
    let dataPost = values || {};
    return async (dispatch) => {
        dispatch(_getingMap());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_MAP_BY_ID}?${helper.getQueryString(dataPost)}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status != 200) {
                    dispatch(_seach_ALLError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    dispatch(_getMapsById(responseJson));
                }
                else {
                    dispatch(_seach_ALLError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_ALLError());
            });
    };
}
function _getMapsById(data) {
    return {
        type: types.MAP_DETAIL_ALL,
        data: data,
        isLoading: false,
    };
}

function _getingMap() {
    return {
        type: types.MAP_DETAIL_SEARCHING_ALL,
        isLoading: true
    };
}

function _seach_ALLError() {
    return {
        type: types.MAP_DETAIL_ALL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearErrorSearch(){
    return {
        type: types.MAP_DETAIL_ALL_CLEAR_ERROR,
    };
}