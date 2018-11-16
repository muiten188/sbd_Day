import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
export function get_Guests(values, user) {
    let data = [];
    return async(dispatch) => {
        
        dispatch(_searching_Guests());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_GUESTS}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                // if (response.status == 401) {
                //     dispatch(helper.logout());
                // } else if (response.status != 200) {
                //     dispatch(_seach_Guestsrror());
                // } else {
                    return response.json();
                // }
            })
            .then((responseJson) => {
                if (responseJson) {
                    const listGuests = responseJson;
                    listGuests.sort((a,b) => (a.companyName > b.companyName) ? 1 : ((b.companyName > a.companyName) ? -1 : 0) );
                    dispatch(_search_Guests(listGuests));
                }
                else {
                    dispatch(_seach_GuestsError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_GuestsError());
            });
    };
}
function _search_Guests(data) {
    return {
        type: types.SEARCH_GUESTS,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _searching_Guests() {
    return {
        type: types.SEARCHING_GUESTS,
        isLoading: true
    };
}

function _seach_GuestsError() {
    return {
        type: types.SEARCH_GUESTS_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearGuestsError() {
    return {
        type: types.SEARCH_GUESTS_CLEAR_ERROR
    };
}
