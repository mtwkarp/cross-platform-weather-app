import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

class DateAndCityName extends Component {
  setDate() {
    const day = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const fetchDate = new Date();
    let currentDay;

    function setDay() {
      if (day[fetchDate.getDay() - 1] === undefined) {
        currentDay = "Sunday";
      } else {
        currentDay = day[fetchDate.getDay() - 1];
      }
    }
    setDay();
    return `${currentDay}, ${fetchDate.getDate()} ${
      month[fetchDate.getMonth()]
    } ${fetchDate.getFullYear()}`;
  }

  render() {
    const { screenColors } = this.props
    return (
      <View style={styles.mainHeader}>
        <Text style={[screenColors, styles.date]}>{this.setDate()}</Text>
        <Text style={[screenColors, styles.cityName]}>
          {this.props.city}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    fontSize: wp('3.8%'),
    fontFamily:'Montserrat-Light',
    textAlign: 'center'
  },
  mainHeader: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20
  },
  cityName: {
    fontSize: wp('11%'),
    fontFamily: 'MontserratAlternates-Light',
    marginTop: 20,
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    city: oneDayWeather.name,
    screenColors: state.setColorReducer.colors.text
  };
};

export default connect(
  mapStateToProps,
  {}
)(DateAndCityName);
