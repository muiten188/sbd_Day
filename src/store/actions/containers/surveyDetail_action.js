import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
export function QUICK_SEARCH_ALL(values, user) {
    let listArtifacts = [];
    let listMuseums=[];
    let listNews=[];
    let dataPost = values || {};
    return dispatch => {
        dispatch(_QUICK_SEARCHing_ALL());
        fetch(`${AppConfig.GET_ALLLIST}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_ALLError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    listArtifacts=responseJson.artifacts;
                    listMuseums=responseJson.museums;
                    listNews=responseJson.news;
                    dispatch(_QUICK_SEARCH_ALL(listArtifacts,listMuseums,listNews));
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
function _QUICK_SEARCH_ALL(listArtifacts,listMuseums,listNews) {
    return {
        type: types.QUICK_SEARCH_ALL,
        listArtifacts: listArtifacts,
        listMuseums:listMuseums,
        listNews:listNews,
        isLoading: false,
    };
}

function _QUICK_SEARCHing_ALL() {
    return {
        type: types.QUICK_SEARCHING_ALL,
        isLoading: true
    };
}

function _seach_ALLError() {
    return {
        type: types.QUICK_SEARCH_ALL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearErrorSearch(){
    return {
        type: types.QUICK_SEARCH_ALL_CLEAR_ERROR,
    };
}