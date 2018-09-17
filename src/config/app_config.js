export const API_HOST_BASE = 'http://113.171.23.144/event-manager-api/';//'http://event.easylink.vn/event-manager-api/'
export const API_HOST = `${API_HOST_BASE}mobile/`;

export const GET_Eventlist = `${API_HOST}api/mobile/museum/`;
export const GET_PARTIES = `${API_HOST}company/getParties`;
export const GET_SCHEDULE = `${API_HOST}/event/getAll`;

export const LOGIN = `${API_HOST}authenticate/login`;
export const GET_NEWS = `${API_HOST}news/getAllNews`;
export const GET_NEWS_DETAIL = `${API_HOST}news/getById`;
export const GET_PRODUCTS = `${API_HOST}/product/getAll`;
export const GET_PRODUCTS_BY_ID = `${API_HOST}/product/getById`;
export const GET_PRESENTATION_DETAIL = `${API_HOST}schedule/getById`;
export const GET_MAPS = `${API_HOST}maps/getAll`;
export const GET_MAP_BY_ID = `${API_HOST}maps/getById`;
export const GET_SURVEY=`${API_HOST}survey/getSurvey`;
export const GET_NOTIFICATION=`${API_HOST}notification/`;
export const GET_PROFILE=`${API_HOST}profile/getAll`;
export const CHECKIN_BY_QRCODE=`${API_HOST}/authenticate/checkIn`;
export const CHECK_CHECKIN=`${API_HOST}/authenticate/findExistsCheckIn`;
export const GET_PRESENTATION=`${API_HOST}/presenter/getAll`;
export const GET_QUESTION=`http://113.171.23.144/event-manager-api/mobile/questionTopic/getAllQuestionTopic`;

export const LOGIN_SOCAIL = `${API_HOST}api/mobile/login/social`;
export const REGISTER = `${API_HOST}api/mobile/users/register`;