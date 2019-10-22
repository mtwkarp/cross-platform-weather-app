import React, { Component } from "react";
import { Text, StyleSheet, View, BackHandler } from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { sendError } from "../redux/store";

class ErrorScreen extends Component {
  navigateToSearchScreen = () => {
    const { navigation, oneDayWeatherInfo } = this.props;
    navigation.navigate("StartScreen");
    if (oneDayWeatherInfo != null) {
      this.props.sendError(0);
    } else {
      return;
    }
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  handleBackButtonClick = () => {
    this.props.navigation.navigate("StartScreen");
    return true;
  };

  render() {
    const { screenColors, errorCheck } = this.props;
    const { errorText, errorCode } = styles;
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: screenColors.backgroundColor }
        ]}
      >
        <MaterialCommunityIcon
          name="weather-pouring"
          size={hp("15%")}
          color={screenColors.color}
        />
        <Text style={[screenColors.text, errorCode]}>{errorCheck.code}</Text>
        <Text style={[screenColors.text, errorText]}>{errorCheck.text}</Text>
        <AntDesignIcon
          name="back"
          size={hp("8%")}
          color={screenColors.color}
          onPress={() => this.navigateToSearchScreen()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    fontSize: wp("5%"),
    textAlign: "center",
    marginTop: hp("1%"),
    marginBottom: hp("2%")
  },
  errorCode: {
    fontSize: wp("9%"),
    marginTop: hp("2%"),
    fontFamily: "Montserrat-Medium"
  }
});

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    screenColors: state.setColorReducer.colors,
    errorCheck: state.setErrorReducer,
    oneDayWeatherInfo: oneDayWeather
  };
};

const mapDispatchToProps = {
  sendError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorScreen);
