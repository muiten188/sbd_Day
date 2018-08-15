import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';

export function get_MapId(artId, user) {
    let data = [];
    //let dataPost = values || {};
    //dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return dispatch => {
        //dispatch(_searching_Antifact());
        fetch(`${AppConfig.GET_MAPID_ARTID}${artId}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                    dispatch(_seach_MapId_error());
                } else if (response.status != 200) {
                    dispatch(_seach_MapId_error());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson.mapId
                    dispatch(_search_MapID(data));
                }
                else {
                    dispatch(_seach_MapId_error());
                }
            })
            .catch(function (error) {
                dispatch(_seach_MapId_error());
            });
    };
}

function _seach_MapId_error() {
    return {
        type: types.SEARCH_MAPID_DETAIL_ERROR,
        searchErorr:false
    }
}

function _search_MapID(data) {
    return {
        type: types.SEARCH_MAPID_DETAIL,
        data: data
    }
}

export function get_AntifactByID(id, currentPage, pageSize, user) {
    let data = [];

    //let dataPost = values || {};
    //dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return dispatch => {
        //dispatch(_searching_Antifact());
        fetch(`${AppConfig.GET_ANTIFACT_BYID}${id}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_ANTIFACT_DETAILError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson
                    dispatch(_search_ANTIFACT_DETAIL(data));

                }
                else {
                    dispatch(_seach_ANTIFACT_DETAILError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_ANTIFACT_DETAILError());
            });
    };
}
function _search_ANTIFACT_DETAIL(data) {
    return {
        type: types.SEARCH_ANTIFACT_DETAIL,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _searching_ANTIFACT_DETAIL() {
    return {
        type: types.SEARCHING_ANTIFACT_DETAIL,
        isLoading: true
    };
}

function _seach_ANTIFACT_DETAILError() {
    return {
        type: types.SEARCH_ANTIFACT_DETAIL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearANTIFACT_DETAILError() {
    return {
        type: types.SEARCH_ANTIFACT_DETAIL_CLEAR_ERROR
    };
}


export function get_AntifactByTag(values, currentPage, pageSize, user) {
    let data = [];

    let dataPost = values || {};
    //dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return dispatch => {
        //dispatch(_searching_Antifact());
        fetch(`${AppConfig.GET_ANTIFACT_BYTAG}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_AntifactByTagError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson
                    dispatch(_search_AntifactByTag(data));
                }
                else {
                    dispatch(_seach_AntifactByTagError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_AntifactByTagError());
            });
    };
}
function _search_AntifactByTag(data) {
    return {
        type: types.SEARCH_ANTIFACT_BY_TAG,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _searching_Antifact_By_Tag() {
    return {
        type: types.SEARCHING_ANTIFACT_BY_TAG,
        isLoading: true
    };
}

function _seach_AntifactByTagError() {
    return {
        type: types.SEARCH_ANTIFACT_BY_TAG_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearAntifactByTagError() {
    return {
        type: types.SEARCH_ANTIFACT_BY_TAG_CLEAR_ERROR
    };
}