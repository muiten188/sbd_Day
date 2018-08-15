import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';

export function get_MuseumDetail(values, user) {
    return dispatch => {
        //dispatch(_searching_Antifact());
        fetch(`${AppConfig.GET_MUSEUM_DETAIL}${values.museumId}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    error = true;
                    dispatch(_seach_MuseumDetailError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson;
                    dispatch(_search_MuseumDetail(data));
                }
                else {
                    if (!error) {
                        dispatch(_seach_MuseumDetailError());
                    }
                }
            })
            .catch(function (error) {
                dispatch(_seach_MuseumDetailError());
            });
    };
}
export function get_Antifact(values, currentPage, pageSize, user) {
    let data = [];
    let dataPost = values || {};
    dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    var error = false;
    return dispatch => {
        //dispatch(_searching_Antifact());
        fetch(`${AppConfig.GET_ANTIFACT}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    error = true;
                    dispatch(_seach_AntifactError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    if (responseJson.data) {
                        data = responseJson.data;
                        dispatch(_search_Antifact(data));
                    } else {
                        dispatch(_seach_AntifactError());
                    }
                }
                else {
                    if (!error) {
                        dispatch(_seach_AntifactError());
                    }
                }
            })
            .catch(function (error) {
                dispatch(_seach_AntifactError());
            });
    };
}
function _search_Antifact(data, valuesForm) {
    return {
        type: types.SEARCH_ANTIFACT,
        data: data,
        isLoading: false,
        valuesForm: valuesForm
    };
}

function _searching_Antifact() {
    return {
        type: types.SEARCHING_ANTIFACT,
        isLoading: true
    };
}

function _search_MuseumDetail(data, valuesForm) {
    return {
        type: types.SEARCH_MUSEUMDETAIL,
        data: data,
        isLoading: false,
        valuesForm: valuesForm
    };
}

function _searching_MuseumDetail() {
    return {
        type: types.SEARCHING_MUSEUMDETAIL,
        isLoading: true
    };
}

function _seach_MuseumDetailError() {
    return {
        type: types.SEARCH_MUSEUMDETAIL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearMuseumDetailError() {
    return {
        type: types.SEARCH_MUSEUMDETAIL_CLEAR_ERROR
    };
}

function _seach_AntifactError() {
    return {
        type: types.SEARCH_ANTIFACT_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearAntifactError() {
    return {
        type: types.SEARCH_ANTIFACT_CLEAR_ERROR
    };
}
function _buildListAntifact(data) {
    var listAreaListed = [];
    var listResult = [];
    var tempArray = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (listAreaListed.indexOf(item.area) == -1) {
            listAreaListed.push(item.area);
            var objectData = {
                area: item.area,
                data: []
            }
            for (j = i; j < data.length; j++) {
                var itemY = data[j];
                if ((objectData.data.indexOf(itemY) == -1) && itemY.area == item.area) {
                    objectData.data.push(itemY);
                }
            }
            listResult.push(objectData);
        }
    }
    return listResult;
}