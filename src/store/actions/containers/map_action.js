import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
export function getMaps(values, user) {
    let dataPost = values || {};
    return async(dispatch) => {
        dispatch(_getingMaps());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_MAPS}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    dispatch(helper.logout());
                } else if (response.status != 200) {
                    dispatch(_getMapsError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    dispatch(_getMaps(responseJson.listData));
                }
                else {
                    dispatch(_getMapsError());
                }
            })
            .catch(function (error) {
                dispatch(_getMapsError());
            });
    };
}
function _getMaps(data) {
    return {
        type: types.MAP_ALL,
        data: data,
        isLoading: false,
    };
}

function _getingMaps() {
    return {
        type: types.MAP_SEARCHING_ALL,
        isLoading: true
    };
}

function _getMapsError() {
    return {
        type: types.MAP_ALL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearErrorSearch(){
    return {
        type: types.MAP_ALL_CLEAR_ERROR,
    };
}