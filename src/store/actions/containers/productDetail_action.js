import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
export function getProductsById(values, user) {
    let dataPost = values || {};
    return async (dispatch) => {
        dispatch(_QUICK_SEARCHing_ALL());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_PRODUCTS_BY_ID}?${helper.getQueryString(dataPost)}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    dispatch(helper.logout());
                } else if (response.status != 200) {
                    dispatch(_seach_ALLError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    dispatch(_getProductsById(responseJson));
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
function _getProductsById(data) {
    return {
        type: types.PRODUCT_DETAIL_ALL,
        data: data,
        isLoading: false,
    };
}

function _QUICK_SEARCHing_ALL() {
    return {
        type: types.PRODUCT_DETAIL_SEARCHING_ALL,
        isLoading: true
    };
}

function _seach_ALLError() {
    return {
        type: types.PRODUCT_DETAIL_ALL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearErrorSearch(){
    return {
        type: types.PRODUCT_DETAIL_ALL_CLEAR_ERROR,
    };
}