import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class CurrentDayDetails extends Component {
  render() {
    const { main, clouds, wind } = this.props.oneDayWeatherInfo;
    const { screenColors } = this.props;
    const {
      details,
      detailsContainer,
      componentContainer,
      weatherValues,
      detailsTextSize,
      detailsHeader
    } = styles;
    return (
      <View style={componentContainer}>
        <Text style={[screenColors, detailsHeader]}>
          Details:
        </Text>
        <View style={  { 
            borderTopColor: screenColors.color,
            borderTopWidth: 1
            }} />

        <View style={detailsContainer}>
          <View style={details}>
            <Text style={[screenColors, detailsTextSize]}>Clouds:</Text>
            <Text style={[screenColors, weatherValues]}>{clouds.all} %</Text>
            <Text style={[screenColors, detailsTextSize]}>Pressure:</Text>
            <Text style={[screenColors, weatherValues]}>
              {main.pressure} hPa
            </Text>
          </View>

          <View style={details}>
            <Text style={[screenColors, detailsTextSize]}>Humidity:</Text>
            <Text style={[screenColors, weatherValues]}>{main.humidity} %</Text>
            <Text style={[screenColors, detailsTextSize]}>Wind:</Text>
            <Text style={[screenColors, weatherValues]}>{wind.speed} m/s</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailsHeader :{
    textAlign: 'center',
    fontFamily: "Montserrat-Medium",
    marginBottom: hp('1%'),
    fontSize: wp("5%"),
  },  
  details: {
    display: "flex",
    flexDirection: "column",
    marginTop: hp("2%")
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  singleDetail: {
    display: "flex",
    flexDirection: "column"
  },
  weatherValues: {
    fontFamily: "Montserrat-Medium",
    fontSize: wp("5%"),
    marginBottom: hp('2%'),
  },
  detailsTextSize: {
    fontSize: wp("5%"),
    fontFamily: 'Montserrat-Light'
  },
  componentContainer : {
    width: wp("70%")
  }
});

const mapStateToProps = state => ({
  oneDayWeatherInfo: state.oneDayWeatherReducer.oneDayWeather,
  screenColors: state.setColorReducer.colors.text
});

export default connect(
  mapStateToProps,
  {}
)(CurrentDayDetails);
