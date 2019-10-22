import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export const setIcon = id => {
    if (id < 300) {
      return "weather-windy";
    } else if (id < 500) {
      return "weather-rainy";
    } else if (id < 600) {
      return "weather-pouring";
    } else if (id < 700) {
      return "weather-snowy";
    } else if (id < 800) {
      return "weather-cloudy";
    } else if (id == 800) {
      return "weather-sunny";
    } else {
      return "weather-cloudy";
    }
  };

  export const _getLocationAsync = async (getOneDayWeather,getFiveDayWeather) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      
    } else {
      let location = await Location.getCurrentPositionAsync({});
      let position = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      await getOneDayWeather(position);
      await getFiveDayWeather(position);
    }
  }