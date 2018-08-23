import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';

export function get_NewsDetail(values, user) {
    let data = [];
    let dataPost = values || {};
    var error = false;
    return async (dispatch) => {
        dispatch(_searching_NewsDetail());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_NEWS_DETAIL}?${helper.getQueryString(dataPost)}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    dispatch(helper.logout());
                } else if (response.status != 200) {
                    error = true;
                    dispatch(_seach_NewsDetailError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson;
                    dispatch(_search_NewsDetail(data, dataPost));
                }
                else {
                    if (!error) {
                        dispatch(_seach_NewsDetailError());
                    }
                }
            })
            .catch(function (error) {
                dispatch(_seach_NewsDetailError());
            });
    };
}

function _search_NewsDetail(data, valuesForm) {
    return {
        type: types.SEARCH_NEWS_DETAIL,
        data: data,
        isLoading: false,
    };
}

function _searching_NewsDetail() {
    return {
        type: types.SEARCHING_NEWS_DETAIL,
        isLoading: true
    };
}

function _seach_NewsDetailError() {
    return {
        type: types.SEARCH_NEWS_DETAIL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearNewsDetailError() {
    return {
        type: types.SEARCH_NEWS_DETAIL_CLEAR_ERROR
    };
}