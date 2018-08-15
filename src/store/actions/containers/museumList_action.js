import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
//hot news
export function search_HOT_NEWS(values, currentPage, pageSize, user) {
    let data = [];
    let dataPost = values || {};
    dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return dispatch => {
        dispatch(_searching_HOT_NEWS());
        fetch(`${AppConfig.GET_HOT_NEWS}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_HOT_NEWSError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    if (responseJson.data) {
                        data = responseJson.data;
                        dispatch(_search_HOT_NEWS(data, dataPost));
                    } else {
                        dispatch(_seach_HOT_NEWSError());
                    }
                }
                else {
                    dispatch(_seach_HOT_NEWSError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_HOT_NEWSError());
            });
    };
}
function _search_HOT_NEWS(data, valuesForm) {
    return {
        type: types.SEARCH_HOT_NEWS,
        data: data,
        isLoadingHotNews: false,
        valuesForm: valuesForm
    };
}

function _searching_HOT_NEWS() {
    return {
        type: types.SEARCHING_HOT_NEWS,
        isLoadingHotNews: true
    };
}

function _seach_HOT_NEWSError() {
    return {
        type: types.SEARCH_HOT_NEWS_ERROR,
        searchHotNewsError: true,
        isLoadingHotNews: false
    };
}
//news
export function search_News(values, currentPage, pageSize, user) {
    let data = [];
    let dataPost = values || {};
    dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return dispatch => {
        dispatch(_searching_News());
        fetch(`${AppConfig.GET_NEWS}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_NewsError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    if (responseJson.data) {
                        data = responseJson.data;
                        dispatch(_search_News(data, dataPost));
                    } else {
                        dispatch(_seach_NewsError());
                    }
                }
                else {
                    dispatch(_seach_NewsError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_NewsError());
            });
    };
}
function _search_News(data, valuesForm) {
    return {
        type: types.SEARCH_NEWS,
        data: data,
        isLoadingNews: false,
        valuesForm: valuesForm
    };
}

function _searching_News() {
    return {
        type: types.SEARCHING_NEWS,
        isLoadingNews: true
    };
}

function _seach_NewsError() {
    return {
        type: types.SEARCH_NEWS_ERROR,
        searchNewsError: true,
        isLoadingNews: false
    };
}


export function get_Area(values, currentPage, pageSize, user) {
    let data = [];
    let dataPost = values || {};
    dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };

    return dispatch => {
        //dispatch(_searching_Museum());
        fetch(`${AppConfig.GET_AREA}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_AreaError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson;
                    dispatch(_search_Area(data, dataPost));
                } else {
                    dispatch(_seach_AreaError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_AreaError());
            });
    };
}

export function search_Museum(values, currentPage, pageSize, user) {
    let data = [];
    let dataPost = values || {};
    dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };

    return dispatch => {
        dispatch(_searching_Museum());
        fetch(`${AppConfig.GET_MUSEUMLIST}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_MuseumError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    if (responseJson.data) {
                        data = _buildListMuseum(responseJson.data);
                        dispatch(_search_Museum(data, dataPost));
                    } else {
                        dispatch(_seach_MuseumError());
                    }
                }
                else {
                    dispatch(_seach_MuseumError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_MuseumError());
            });
    };
}
function _search_Museum(data, valuesForm) {
    return {
        type: types.SEARCH_MUSEUM,
        data: data,
        isLoading: false,
        valuesForm: valuesForm
    };
}

function _searching_Museum() {
    return {
        type: types.SEARCHING_MUSEUM,
        isLoading: true
    };
}

function _seach_MuseumError() {
    return {
        type: types.SEARCH_MUSEUM_ERROR,
        searchErorr: true,
        isLoading: false
    };
}

function _search_Area(data, valuesForm) {
    return {
        type: types.SEARCH_AREA,
        data: data,
        isLoading: false,
        valuesForm: valuesForm
    };
}

function _searching_Area() {
    return {
        type: types.SEARCHING_AREA,
        isLoading: true
    };
}

function _seach_AreaError() {
    return {
        type: types.SEARCH_AREA_ERROR,
        searchAreaErorr: true,
        isLoading: false
    };
}

function _buildListMuseum(data) {
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

export function clearMuseumError() {
    return {
        type: types.SEARCH_MUSEUM_CLEAR_ERROR
    };
}

export function clearAreaError() {
    return {
        type: types.SEARCH_AREA_CLEAR_ERROR
    };
}