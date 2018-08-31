import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
//hot news
export function search_HOT_NEWS(values, user) {
    let data = [];
    let dataPost = values || {};
    var error = false;
    debugger;
    return async (dispatch) => {
        dispatch(_searching_HOT_NEWS());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_PROFILE}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    dispatch(helper.logout());
                } else if (response.status != 200) {
                    error = true;
                    dispatch(_seach_HOT_NEWSError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson;
                    dispatch(_search_HOT_NEWS(data, dataPost));

                }
                else {
                    if (!error) {
                        dispatch(_seach_HOT_NEWSError());
                    }
                }
            })
            .catch(function (error) {
                dispatch(_seach_HOT_NEWSError());
            });
    };
}
function _search_HOT_NEWS(data, valuesForm) {
    return {
        type: types.SEARCH_HOT_NEWS,
        data: data,
        isLoadingHotNews: false,
        valuesForm: valuesForm
    };
}

function _searching_HOT_NEWS() {
    return {
        type: types.SEARCHING_HOT_NEWS,
        isLoadingHotNews: true
    };
}

function _seach_HOT_NEWSError() {
    return {
        type: types.SEARCH_HOT_NEWS_ERROR,
        searchHotNewsError: true,
        isLoadingHotNews: false
    };
}


export function clearHotNewsError() {
    return {
        type: types.SEARCH_HOT_NEWS_CLEAR_ERROR
    };
}