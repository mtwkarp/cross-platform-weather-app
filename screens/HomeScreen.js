import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text
} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";

import { getOneDayWeather, getFiveDayWeather } from "../redux/store";
import DateAndCityName from "../components/HomeScreen/DateAndCityName";
import OneDayWeather from "../components/HomeScreen/OneDayWeather";
import SunPath from "../components/HomeScreen/SunPath";
import {_getLocationAsync} from '../reusableFunctions'
// import LoadingScreen from "../components/LoadingScreen";
// import ErrorScreen from './ErrorScreen';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  
 

  // getLocation = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "Cool Location Permission",
  //         message:
  //           "Cool Location App needs access to your location " +
  //           "so you can see awesome forecast.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       Geolocation.getCurrentPosition(
  //         async position => {
  //           await this.props.getOneDayWeather(position.coords);
  //           await this.props.getFiveDayWeather(position.coords);
  //         },
  //         error => {
  //           console.log(error.code, error.message);
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 15000,
  //           maximumAge: 10000
  //         }
  //       );
  //       console.log("You can use location");
  //     } else {
  //       console.log("location permission denied");
  //       this.props.navigation.navigate('StartScreen')
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  componentDidMount() {
    _getLocationAsync(this.props.getOneDayWeather, this.props.getFiveDayWeather);
  }

  render() {
    const { loading, screenColors, errorCheck, navigation } = this.props;
    
    const combineMainStyles = StyleSheet.flatten([{backgroundColor: screenColors.backgroundColor}, styles.body]);
    
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 80
    };
    if (!loading) {

      if(!errorCheck.bool){
      return (
        <View
          // onSwipeUp={() =>
          //   navigation.navigate("Details", {
          //     defaultStyles: combineMainStyles,
          //     config
          //   })
          // }
          // config={config}
          style={[{backgroundColor: screenColors.backgroundColor}, styles.body]}
        >
          <StatusBar backgroundColor={screenColors.backgroundColor}/>
          <DateAndCityName />
          <OneDayWeather />
          <SunPath />

          <View style={styles.showDetailsIcon}>
            <MaterialCommunityIcon
              name="chevron-double-down"
              size={45}
              color={screenColors.text.color}
              onPress={() =>
                navigation.navigate("Details", {
                  defaultStyles: combineMainStyles
                })
              }
            />
          </View>
        </View>
      )
    }else {
        return (
          // <ErrorScreen navigation={navigation}/>
          <Text>Error</Text>
        )
      }
    }else {
      return (
        <View style={[screenColors, styles.loadingScreen]}>
        {/* <LoadingScreen/> */}
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  body: {
    margin: 0,
    flex: 1,
    fontSize: 10,
    color: "white"
  },
  showDetailsIcon: {
    alignItems: "center"
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  const { oneDayWeather, loading } = state.oneDayWeatherReducer;
  return {
    oneDayWeatherInfo: oneDayWeather,
    loading,
    screenColors: state.setColorReducer.colors,
    errorCheck: state.setErrorReducer
  };
};

const mapDispatchToProps = {
  getOneDayWeather,
  getFiveDayWeather
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
