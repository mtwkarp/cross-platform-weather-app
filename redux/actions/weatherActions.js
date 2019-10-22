export const fetchData = (bool, type = "") => {
    return {
      type,
      payload: bool
    };
  };
  
  export const fetchDataFulfilled = (data, type = "") => {
    return {
      type,
      payload: data,
      loading: false
    };
  };
  
  export const fetchDataRejected = (error, type = "") => {
    return {
      type,
      payload: error,
      loading: false
    };
  };

  export const setColors = (type = '', colors, partOfTheDay) => {
    return {
      type,
      payload: colors,
      partOfTheDay
    }
  };

  export const setError = (type = '', errorInfo = {}, bool = false) => {
    return {
      type,
      payload: errorInfo,
      bool
    }
  };