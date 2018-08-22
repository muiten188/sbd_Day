import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';

export function get_News(values, sada, user) {
    let data = [];
    let dataPost = values || {};
    var error = false;
    return async (dispatch) => {
        //dispatch(_searching_News());
        dispatch(() => {
            debugger;
            return {
                type: types.LOGGED_OUT
            }
        });
        // var _header = await helper.buildHeader(user);
        // fetch(`${AppConfig.GET_NEWS}`, {
        //     headers: _header,
        //     method: "GET"
        // })
        //     .then(function (response) {
        //         if (response.status == 401) {
        //             dispatch(helper.logout);
        //         } else if (response.status != 200) {
        //             error=true;
        //             dispatch(_seach_NewsError());
        //         } else {
        //             return response.json();
        //         }
        //     })
        //     .then((responseJson) => {
        //         if (responseJson) {
        //             if (responseJson.data) {
        //                 data = responseJson.data;
        //                 dispatch(_search_News(data, dataPost));
        //             } else {
        //                 dispatch(_seach_NewsError());
        //             }
        //         }
        //         else {
        //             if(!error){
        //                 dispatch(_seach_NewsError());
        //             }        
        //         }
        //     })
        //     .catch(function (error) {
        //         dispatch(_seach_NewsError());
        //     });
    };
}

function _search_News(data, valuesForm) {
    return {
        type: types.SEARCH_NEWS,
        data: data,
        isLoading: false,
    };
}

function _searching_News() {
    return {
        type: types.SEARCHING_NEWS,
        isLoading: true
    };
}

function _seach_NewsError() {
    return {
        type: types.SEARCH_NEWS_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearNewsError() {
    return {
        type: types.SEARCH_NEWS_CLEAR_ERROR
    };
}