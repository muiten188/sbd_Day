import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper/index';



export function search_Comment(values, currentPage, pageSize, user) {
    let data = [];
    let dataPost = values || {};
    dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return dispatch => {
        dispatch(_searching_Comment());
        fetch(`${AppConfig.GET_COMMENT}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_CommentError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    if (responseJson.data) {
                        data = responseJson.data;
                        dispatch(_search_Comment(data, dataPost));
                    } else {
                        dispatch(_seach_CommentError());
                    }
                }
                else {
                    dispatch(_seach_CommentError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_CommentError());
            });
    };
}
function _search_Comment(data, valuesForm) {
    return {
        type: types.SEARCH_COMMENT,
        data: data,
        isLoading: false,
        valuesForm: valuesForm
    };
}

function _searching_Comment() {
    return {
        type: types.SEARCHING_COMMENT,
        isLoading: true
    };
}

function _seach_CommentError() {
    return {
        type: types.SEARCH_COMMENT_ERROR,
        searchListCommentError: true,
        isLoading: false
    };
}
export function clear_seach_CommentError() {
    return {
        type: types.SEARCH_COMMENT_CLEAR_ERROR,
    };
}

export function save_Comment(values, user) {
    let _postData = values || {};
    _postData.guestId = user.user.guestId;
    return dispatch => {
        dispatch(_saveing_Comment());
        let error = false;
        fetch(`${AppConfig.SAVE_COMMENT}`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(_postData)
        })
            .then(function (response) {
                if (response.status != 200) {
                    dispatch(_save_Comment(false));
                    error = true;
                } else {
                    return response.json();
                }
            })
            .then(function (responseJson) {
                if (responseJson) {
                    dispatch(_save_Comment(true, responseJson));
                }
                else {
                    if (!error) {
                        dispatch(_save_Comment(false));
                    }
                }
            })
            .catch(function (error) {
                dispatch(_save_Comment(false));
            });
    };
}

function _saveing_Comment() {
    return {
        type: types.SAVING_COMMENT,
        isLoading: true
    };
}

function _save_Comment(isSuccess) {
    if (isSuccess) {
        return {
            type: types.SAVED_COMMENT,
            isLoading: false,
            saveCommentErorr: false
        };
    }
    else {
        return {
            type: types.SAVE_COMMENT_ERROR,
            isLoading: false,
            saveCommentErorr: true
        };
    }
}
export function clear_Save_CommentError() {
    return {
        type: types.SAVE_COMMENT_CLEAR_ERROR
    };
}