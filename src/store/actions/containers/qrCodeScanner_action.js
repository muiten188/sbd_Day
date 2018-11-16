import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

export function checkInByQrCode(values, user) {
    let data = [];
    let dataPost={};
    try{
        dataPost = {barcode:JSON.parse(values.barcode).code};
    }
    catch(e){
        dispatch(_seach_CHECKIN_BY_QRCODEError());
    }
    var error = false;
    //dataPost = { ...dataPost };
    return async (dispatch) => {
        dispatch(_searching_CHECKIN_BY_QRCODE());
        var _header = await helper.buildHeader(user);
        debugger;
        fetch(`${AppConfig.CHECKIN_BY_QRCODE}?${helper.getQueryString(dataPost)}`, {
            headers: _header,
            method: "POST"
        })
            .then(function (response) {
                if (response.status == 500) {
                    dispatch(_seach_QRCODE_CHECKED());
                    error = true;
                }
                else if (response.status != 200 && response.status != 500) {
                    dispatch(_seach_CHECKIN_BY_QRCODEError());
                }
                else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (!error) {
                    if (responseJson) {
                        data = responseJson
                        dispatch(_search_CHECKIN_BY_QRCODE(data));
                    }
                    else {
                        dispatch(_seach_CHECKIN_BY_QRCODEError());
                    }
                }
            })
            .catch(function (error) {
                dispatch(_seach_CHECKIN_BY_QRCODEError());
            });
    };
}
function _search_CHECKIN_BY_QRCODE(data) {
    return {
        type: types.SEARCH_CHECKIN_BY_QRCODE,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _seach_QRCODE_CHECKED() {
    return {
        type: types.CHECKED_BY_QRCODE,
    };
}

function _searching_CHECKIN_BY_QRCODE() {
    return {
        type: types.SEARCHING_CHECKIN_BY_QRCODE,
        isLoading: true
    };
}

function _seach_CHECKIN_BY_QRCODEError() {
    return {
        type: types.SEARCH_CHECKIN_BY_QRCODE_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearCHECKIN_BY_QRCODEError() {
    return {
        type: types.SEARCH_CHECKIN_BY_QRCODE_CLEAR_ERROR
    };
}