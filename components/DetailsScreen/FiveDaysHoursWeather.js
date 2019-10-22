import React, { Component } from "react";
import { Text, View, StyleSheet, Animated, PanResponder, ScrollView } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { setIcon } from "../../reusableFunctions";

export class FiveDaysHoursWeather extends Component {
  constructor() {
    super();
    this.state = {
      weatherByHoursArray: [],
      paddingValue: 0 //new Animated.Value(wp('100%'))
    };
  }

  showForecastByHours = forecastDay => {
    const weatherHours = [];

    this.props.fiveDaysWeatherInfo.list.forEach(el => {
      if (el.dt_txt.includes(forecastDay)) {
        const oneDayHoursInfo = {};
        oneDayHoursInfo.hourName = moment(el.dt_txt).format("HH:mm");
        oneDayHoursInfo.hourTemp = Math.round(el.main.temp);
        oneDayHoursInfo.hourIcon = el.weather[0].id;
        weatherHours.push(oneDayHoursInfo);
      }
    });
    this.setState({
      weatherByHoursArray: weatherHours
    });
  };

  // animateHours = () => {
  //   Animated.timing(this.state.paddingValue,{
  //     toValue: 0,
  //     duration: 400
  //   }).start()
  // }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if(gestureState.dx > 9) return true
    },

    onPanResponderTerminate: (evt, gestureState) => {
      this.props.handler()
    },
  });

  componentDidMount() {
    this.showForecastByHours(this.props.forecastDate);
    // this.animateHours()
  }


  render() {
    const { screenColors, forecastDate } = this.props;
    const {
      oneDayContainer,
      tempAndIcon,
      textStyles,
      oneDayTempIcon,
      oneDayTemp,
      headerText
    } = this.props.componentStyles;
    const dayName = moment(forecastDate).format("dddd");

    return (
      <View
        {...this.panResponder.panHandlers}
        style={styles.hoursHolder}
      >
        <Text
          style={[
            screenColors,
            headerText,
            {
              width: wp("82%"),
              textAlign: "center",
              borderBottomColor: screenColors.color,
              borderBottomWidth: 1,
              paddingBottom: 5
            }
          ]}
        >
          {dayName}:
        </Text>

        <ScrollView scrollEnabled={true} style={{
          width: wp('82%'),
          overflow: 'hidden',
          paddingLeft: this.state.paddingValue
        }} showsVerticalScrollIndicator={false}>
            {this.state.weatherByHoursArray.map(h => {
              let blockStyles = [
                oneDayContainer,
                {
                  borderTopColor: screenColors.color,
                  borderTopWidth: 1
                }
              ];
              if (this.state.weatherByHoursArray.indexOf(h) === 0) {
                blockStyles = oneDayContainer;
              }
              return (
                <View
                  style={blockStyles}
                  key={this.state.weatherByHoursArray.indexOf(h)}
                >
                  <Text style={[textStyles, screenColors]}>{h.hourName}</Text>
                  <View style={tempAndIcon}>
                    <MaterialCommunityIcon
                      style={oneDayTempIcon}
                      name={setIcon(h.hourIcon)}
                      size={wp("10%")}
                      color={screenColors.color}
                    />
                    <Text style={[screenColors, oneDayTemp]}>
                      {h.hourTemp}&#176;
                    </Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fiveDaysWeatherInfo: state.fiveDayWeatherReducer.fiveDaysWeather,
    screenColors: state.setColorReducer.colors.text
  };
};

export default connect(
  mapStateToProps,
  {}
)(FiveDaysHoursWeather);

const styles = StyleSheet.create({
  hoursHolder: {
    height: hp("44%"),
    width: wp("100%"),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: 'hidden'
  }
});
