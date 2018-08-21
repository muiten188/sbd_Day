import { AsyncStorage } from "react-native";
import { Alert } from "react-native";
export function setAsyncStorage(key, value) {
  try {
    Jsovalue = JSON.stringify(value);
    AsyncStorage.setItem(key, Jsovalue);
  } catch (e) {
    alert("set error");
  }
}

export function getAsyncStorage(key, callback) {
  try {
    const value = AsyncStorage.getItem(key);
    callback(value)
  } catch (error) {
    alert(error);
    // Error retrieving data
  }
}

export function clearAsyncStorage() {
  try {
    AsyncStorage.clear();
  } catch (e) {
    alert("clear error");
  }
}

export async function buildHeader(user) {
  var _lang =await this.getLangSetting();
  var header = {};
  if (_lang == 'vn') {
    _lang = 'VI';
    header.CURRENT_LANGUAGE = _lang;
  }
  return header;
  // {
  //   CURRENT_LANGUAGE:
  //   //JSESSIONID: user ? user.jSessionId : null
  // };
}

export function formatDate(date) {
  // var monthNames = [
  //   "January", "February", "March",
  //   "April", "May", "June", "July",
  //   "August", "September", "October",
  //   "November", "December"
  // ];
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var day = date.getDate();
  var monthIndex = date.getMonth() + 1;
  var year = date.getFullYear();
  return hour + ":" + minutes + " - " + day + "/" + monthIndex + "/" + year;
}

function change_alias(alias) {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str;
}

export function cloneObj(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

export function textEclipse(text, index) {
  return (((text).length > index ? index : 0) ?
    (((text).substring(0, index ? index : 0)) + '...') :
    text)
}

export function getQueryString(params) {
  return Object.keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join("&");
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");
}
export let backgroundVideoSetting = null;
export let notifiSetting = null;
export let lang = null;
export function loadSetting() {

  getAsyncStorage("@backgroundVideo", (promise) => {
    promise.done((value) => {
      if (value != '' && value != null) {
        var _backgroundVideo = JSON.parse(value);
        backgroundVideoSetting = _backgroundVideo;
      }
    })
  })
  getAsyncStorage("@notifi", (promise) => {
    promise.done((value) => {
      if (value != '' && value != null) {
        var _notification = JSON.parse(value);
        notifiSetting = _notification;
      }
    })
  })
  getAsyncStorage("@lang", (promise) => {
    promise.done((value) => {
      if (value != '' && value != null) {
        var _lang = JSON.parse(value);
        lang = _lang;
      }
    })
  })
}

export async function getBackgroundVideoSetting() {
  if (this.backgroundVideoSetting != null) {
    return this.backgroundVideoSetting;
  }
  else {
    var _backgroundVideo = await AsyncStorage.getItem("@backgroundVideo");

    if (_backgroundVideo) {
      var oBackgroundVideo = JSON.parse(_backgroundVideo);
      backgroundVideoSetting = oBackgroundVideo;
      return backgroundVideoSetting;
    }
    else {
      return null;
    }
  }
}

export async function getnotifiSetting() {
  if (this.notifiSetting != null) {
    return this.notifiSetting;
  }
  else {
    var _notifi = await AsyncStorage.getItem("@notifi");
    if (_notifi) {
      var oNotifi = JSON.parse(_notifi);
      notifiSetting = oNotifi;
      return notifiSetting;
    }
    else {
      return null;
    }
  }
}
export async function getLangSetting() {
  if (this.lang != null) {
    return this.lang;
  }
  else {

    var _lang = await AsyncStorage.getItem("@lang");
    if (_lang) {
      debugger;
      var olang = JSON.parse(_lang);
      lang = olang;
      return lang;
    }
    else {
      return 'vn';
    }
  }
}