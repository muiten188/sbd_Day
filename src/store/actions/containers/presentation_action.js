import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
export function get_Prensentation(values, user) {
    let data = [];
    //let dataPost = values || {};
    //dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return async(dispatch) => {
        
        dispatch(_searching_Prensentation());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_PRESENTATION}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status != 200) {
                    dispatch(_seach_Prensentationrror());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson.listData
                    dispatch(_search_Prensentation(data));
                }
                else {
                    dispatch(_seach_PrensentationError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_PrensentationError());
            });
    };
}
function _search_Prensentation(data) {
    return {
        type: types.SEARCH_PRESENTATION,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _searching_Prensentation() {
    return {
        type: types.SEARCHING_PRESENTATION,
        isLoading: true
    };
}

function _seach_PrensentationError() {
    return {
        type: types.SEARCH_PRESENTATION_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearPrensentationError() {
    return {
        type: types.SEARCH_PRESENTATION_CLEAR_ERROR
    };
}
