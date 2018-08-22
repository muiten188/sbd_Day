import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';

export function get_Parties(values, user) {
    let data = [];
    //let dataPost = values || {};
    //dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return async(dispatch) => {
        
        dispatch(_searching_PARTIES());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_PARTIES}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    dispatch(helper.logout());
                } else if (response.status != 200) {
                    dispatch(_seach_Partiesrror());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson.listData
                    dispatch(_search_Parties(data));
                }
                else {
                    dispatch(_seach_PartiesError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_PartiesError());
            });
    };
}
function _search_Parties(data) {
    return {
        type: types.SEARCH_PARTIES,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _searching_PARTIES() {
    return {
        type: types.SEARCHING_PARTIES,
        isLoading: true
    };
}

function _seach_PartiesError() {
    return {
        type: types.SEARCH_PARTIES_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearPartiesError() {
    return {
        type: types.SEARCH_PARTIES_CLEAR_ERROR
    };
}
