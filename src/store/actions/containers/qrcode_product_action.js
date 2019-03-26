import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';


export function searchProductByQrCode(values, user) {
    let data = [];
    let dataPost = {};
    debugger;
    dataPost = values ? values : {};
    var error = false;
    return async (dispatch) => {
        dispatch(_searching_Product_BY_QRCODE());
        var _header = await helper.buildHeader(user);
        debugger;
        fetch(`${AppConfig.GET_PRODUCT_BY_QRCODE}?${helper.getQueryString(dataPost)}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    dispatch(_search_Product_BY_QRCODE(responseJson));

                }
                else {
                    dispatch(_seach_Product_BY_QRCODEError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_Product_BY_QRCODEError());
            });
    };
}
function _search_Product_BY_QRCODE(data) {
    return {
        type: types.SEARCH_PRODUCT_BY_QRCODE,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _searching_Product_BY_QRCODE() {
    return {
        type: types.GETTING_PRODUCT_BY_QRCODE,
        isLoading: true
    };
}

function _seach_Product_BY_QRCODEError() {
    return {
        type: types.GETTING_PRODUCT_BY_QRCODE_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearProduct_BY_QRCODEError() {
    return {
        type: types.CLEAR_SEARCH_PRODUCT_BY_QRCODE
    };
}