import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
export function get_presentationDetail(values, user) {
    let data = [];
    let dataPost = values || {};
    var error = false;
    return async (dispatch) => {
        dispatch(_searching_presentationDetail());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_PRESENTATION_DETAIL}?${helper.getQueryString(dataPost)}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status != 200) {
                    error = true;
                    dispatch(_seach_presentationDetailError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson;
                    dispatch(_search_presentationDetail(data, dataPost));
                }
                else {
                    if (!error) {
                        dispatch(_seach_presentationDetailError());
                    }
                }
            })
            .catch(function (error) {
                dispatch(_seach_presentationDetailError());
            });
    };
}

function _search_presentationDetail(data, valuesForm) {
    return {
        type: types.SEARCH_PRESENTATION_DETAIL,
        data: data,
        isLoading: false,
    };
}

function _searching_presentationDetail() {
    return {
        type: types.SEARCHING_PRESENTATION_DETAIL,
        isLoading: true
    };
}

function _seach_presentationDetailError() {
    return {
        type: types.SEARCH_PRESENTATION_DETAIL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearpresentationDetailError() {
    return {
        type: types.SEARCH_PRESENTATION_DETAIL_CLEAR_ERROR
    };
}