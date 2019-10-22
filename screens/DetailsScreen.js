import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CurrentDayDetails from "../components/DetailsScreen/CurrentDayDetails";
import FiveDaysWeather from "../components/DetailsScreen/FiveDaysWeather";

class DetailsScreen extends Component {
  render() {
    const { navigation, screenColors } = this.props;
    const { showDetailsIcon, searchCityIcon, cityName } = styles;
    const defStyles = navigation.getParam("defaultStyles", {
      backgroundColor: "#FBC244",
      margin: 0,
      flex: 1,
      fontSize: 10
    });
    
    const config = navigation.getParam("config", {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    });

    return (
      <View
        // onSwipeDown={() => navigation.goBack()}
        config={config}
        style={defStyles}
      >
        <View style={showDetailsIcon}>
          <MaterialCommunityIcon
            name="chevron-double-up"
            size={45}
            color={screenColors.color}
            onPress={() => navigation.goBack()}
          />
          <MaterialCommunityIcon
            name="cloud-search-outline"
            size={35}
            color={screenColors.color}
            style={searchCityIcon}
            onPress={() =>  navigation.navigate("StartScreen", {})}
          />
          <Text style={[screenColors, cityName]}> {this.props.city} </Text>
          <CurrentDayDetails />
          <FiveDaysWeather />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showDetailsIcon: {
    alignItems: "center"
  },
  searchCityIcon: {
    position: "absolute",
    top: 10,
    right: 10
  },
  cityName: {
    marginTop: wp('4%'),
    marginBottom: wp('8%'),
    fontSize: wp('9%')
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
)(DetailsScreen);