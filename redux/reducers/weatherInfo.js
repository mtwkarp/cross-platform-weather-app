import { combineReducers } from "redux";

//Define initialState
const weatherStateForOneDay = {
  oneDayWeather: null,
  loading: true,
  errorMessage: ""
};

const GET_WEATHER_ONE_DAY = "GET_WEATHER_ONE_DAY";
const GET_WEATHER_ONE_DAY_FULFILLED = "GET_WEATHER_ONE_DAY_FULFILLED";
const GET_WEATHER_ONE_DAY_REJECTED = "GET_WEATHER_ONE_DAY_REJECTED";

const oneDayWeatherReducer = (state = weatherStateForOneDay, action) => {
  switch (action.type) {
    case GET_WEATHER_ONE_DAY:
      return { ...state, loading: action.payload };
    case GET_WEATHER_ONE_DAY_FULFILLED:
      return {
        ...state,
        oneDayWeather: action.payload,
        loading: action.loading
      };
    case GET_WEATHER_ONE_DAY_REJECTED:
      return {
        ...state,
        errorMessage: action.payload,
        loading: action.loading
      };
    default:
      return state;
  }
};

const weatherStateForFiveDays = {
  fiveDaysWeather: null,
  loading: true,
  errorMessage: ""
};

const GET_WEATHER_FIVE_DAYS = "GET_WEATHER_FIVE_DAYS";
const GET_WEATHER_FIVE_DAYS_FULFILLED = "GET_WEATHER_FIVE_DAYS_FULFILLED";
const GET_WEATHER_FIVE_DAYS_REJECTED = "GET_WEATHER_FIVE_DAYS_REJECTED";

const fiveDayWeatherReducer = (state = weatherStateForFiveDays, action) => {
  switch (action.type) {
    case GET_WEATHER_FIVE_DAYS:
      return { ...state, loading: action.payload };
    case GET_WEATHER_FIVE_DAYS_FULFILLED:
      return {
        ...state,
        fiveDaysWeather: action.payload,
        loading: action.loading
      };
    case GET_WEATHER_FIVE_DAYS_REJECTED:
      return {
        ...state,
        errorMessage: action.payload,
        loading: action.loading
      };
    default:
      return state;
  }
};

const SET_COLOR_ACCORDING_TO_TIME = "SET_COLOR_ACCORDING_TO_TIME";
const colors = {
  colors: {
    backgroundColor: "#FBC244",
    text: {
      color: "#3C3C3B",
      fontFamily: "Montserrat-ExtraLight"
    }
  },
  partOfTheDay: "day"
};
const setColorReducer = (state = colors, action) => {
  switch (action.type) {
    case SET_COLOR_ACCORDING_TO_TIME:
      return {
        ...state,
        colors: action.payload,
        partOfTheDay: action.partOfTheDay
      };
    default:
      return state;
  }
};

const TYPE_OF_ERROR = "TYPE_OF_ERROR";
const RESET_ERROR = 'RESET_ERROR';
const errors = {
  bool: false,
  code: null,
  text: ""
};

const setErrorReducer = (state = errors, action) => {
  switch (action.type) {
    case TYPE_OF_ERROR:
      const { code, text } = action.payload;
      return { ...state, code, text, bool: action.bool };
    case RESET_ERROR:
      return { ...state, code: action.payload.code , text: action.payload.text, bool: action.bool };
    default:
      return state;
  }
};

export default combineReducers({
  oneDayWeatherReducer,
  fiveDayWeatherReducer,
  setColorReducer,
  setErrorReducer
});
