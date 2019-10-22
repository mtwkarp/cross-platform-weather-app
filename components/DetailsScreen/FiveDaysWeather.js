import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

// import LoadingIcon from "./LoadingIcon";
import FiveDaysHoursWeather from "./FiveDaysHoursWeather";
import { setIcon } from "../../reusableFunctions";

class FiveDaysWeather extends PureComponent {
  constructor() {
    super();
    this.state = {
      showWeatherByHours: false,
      forecastDate: "",
      oneDayElementWidth: wp("82%"),
      paddingValue: 0,//new Animated.Value(wp('100%')),
      animationVelocity: 100,
      animateComponent: false
    };
  }

  // animateDays = () => {

  //   Animated.timing(this.state.paddingValue, {
  //     toValue: 0,
  //     duration: this.state.animationVelocity
  //         }).start();
  // };

  showWeatherForFiveDays = arr => {
    const forecastHolder = [];
    this.props.fiveDaysWeatherInfo.list.map(el => {
      if (el.dt_txt.includes("12:00")) {
        forecastHolder.push(el);
      }
    });

    forecastHolder.forEach(day => {
      const oneDayInfo = {};
      const dayName = moment(day.dt_txt).format("dddd");
      const dayTemp = Math.round(day.main.temp);
      const dayIcon = day.weather[0].id;
      const dayDate = moment(day.dt_txt).format("YYYY-MM-DD");
      oneDayInfo.dayName = dayName;
      oneDayInfo.temperature = dayTemp;
      oneDayInfo.forecastIcon = dayIcon;
      oneDayInfo.dayDate = dayDate;
      arr.push(oneDayInfo);
    });
  };

  handlerForShowingBackWeatherByDays = () => {
    this.setState({
      showWeatherByHours: false
    });
  };

  render() {
    const { screenColors, fiveDaysWeatherInfo } = this.props;
    const {
      oneDayContainer,
      tempAndIcon,
      textStyles,
      headerText,
      oneDayTemp,
      oneDayTempIcon,
      allWeatherContainer,
      daysHolder,
      animationHolder
    } = styles;
    
    const {paddingValue, animateComponent} = this.state
    const combineTextStyles = StyleSheet.flatten([screenColors, textStyles]);
    const simplifiedForecast = [];
  
    if (fiveDaysWeatherInfo == null) {
      return (
        <View style={allWeatherContainer}>
          {/* <LoadingIcon size={hp("15%")} /> */}
          <Text>Loading...</Text>
        </View>
      );
    } else {
      if (!this.state.showWeatherByHours) {
        this.showWeatherForFiveDays(simplifiedForecast);
        // this.animateDays()
        return (
          <View style={{daysHolder}}>
            <Text style={[screenColors, headerText]}>Next days:</Text>
            <View
              style={[animationHolder,  {paddingRight:paddingValue} ]}
            >
              {simplifiedForecast.map(day => {
                const { dayName, temperature, forecastIcon, dayDate } = day;
                return (
                  <TouchableOpacity
                    style={[
                      oneDayContainer,
                      {
                        borderTopColor: screenColors.color,
                        borderTopWidth: 1
                      }
                    ]}
                    key={simplifiedForecast.indexOf(day)}
                    dayDate={dayDate}
                    onPress=
                    {() => {
                      this.setState({
                        showWeatherByHours: true,
                        forecastDate: dayDate,
                        paddingValue: 0,//new Animated.Value(wp('200%')),
                        animationVelocity: 600
                      });
                    }}
                    >
                    <Text style={combineTextStyles}>{dayName}</Text>
                    <View style={tempAndIcon}>
                      <MaterialCommunityIcon
                        style={oneDayTempIcon}
                        name={setIcon(forecastIcon)}
                        size={wp("10%")}
                        color={screenColors.color}
                      />

                      <Text style={[screenColors, oneDayTemp]}>
                        {temperature}&#176;
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      } else {
        return (
          <FiveDaysHoursWeather
            forecastDate={this.state.forecastDate}
            componentStyles={styles}
            handler={this.handlerForShowingBackWeatherByDays}
          />
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  daysHolder: {
    width: wp('100%'),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: 'hidden'
  },
  animationHolder: {
    width: wp("82%"),
    overflow: "hidden",
  },
  allWeatherContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("7%")
  },
  oneDayContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    width: wp("82%"),
    paddingTop: 5,
    paddingBottom: 5
  },
  tempAndIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  textStyles: {
    fontSize: wp("4,9%"),
    fontFamily: "Montserrat-Light"
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    marginBottom: hp("1%"),
    marginTop: hp("2,5%"),
    fontSize: wp("5%")
  },
  oneDayTemp: {
    width: 35,
    textAlign: "center",
    fontSize: wp("5,8%")
  },
  oneDayTempIcon: {
    width: 40
  }
});

const mapStateToProps = state => {
  return {
    fiveDaysWeatherInfo: state.fiveDayWeatherReducer.fiveDaysWeather,
    screenColors: state.setColorReducer.colors.text
  };
};

export default connect(
  mapStateToProps,
  {}
)(FiveDaysWeather);
