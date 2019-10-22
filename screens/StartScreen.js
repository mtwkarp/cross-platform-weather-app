import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  BackHandler,
  View
} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
  searchOneDayWeather,
  searchFiveDaysWeather,
  getOneDayWeather,
  getFiveDayWeather,
  setColorAccordingToWeather
} from "../redux/store";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {_getLocationAsync} from '../reusableFunctions'

class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errorVisibility: false
    };
  }

  showWeather = () => {
    if (this.state.text.length === 0) {
      this.setState({ errorVisibility: true });
      setTimeout(() => this.setState({ errorVisibility: false }), 3000);
    } else {
      this.props.searchOneDayWeather(this.state.text);
      this.props.searchFiveDaysWeather(this.state.text);
      this.props.navigation.navigate("Home", {});
    }
  };

  visibilityOfBackButton = () => {
    if (this.props.oneDayWeatherInfo == null) {
      return null
    }else {
      return(<MaterialIcon
        name="arrow-back"
        size={wp("9%")}
        color={"white"}
        style={styles.backButton}
        onPress={() => this.props.navigation.navigate("Home", {})}
      />)
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick = () => {
    if(this.props.oneDayWeatherInfo == null) {
      BackHandler.exitApp();
    }else {
    this.props.navigation.navigate('Home');
    }
    return true;
  }

  render() {
    const showErr = this.state.errorVisibility ? 1 : 0;
    const { screenColors, navigation } = this.props;
    const {
      background,
      textStyle,
      buttonStyles,
      textInputStyles
    } = styles;
    return (
      <View
        style={background}
        // onSwipeDown={() => navigation.goBack()}
      >
        {this.visibilityOfBackButton()}

        <MaterialCommunityIcon
          name="weather-cloudy"
          size={wp("30%")}
          color={"white"}
        />

        <TextInput
          style={textInputStyles}
          onChangeText={text => this.setState({ text })}
          placeholder="Search for a city"
          onSubmitEditing={this.showWeather}
          maxLength={85}
          placeholderTextColor="white"
        />

        <Text style={[textStyle, { fontFamily: "Montserrat-Bold" }]}> or </Text>

        <TouchableOpacity onPress={() => {
              _getLocationAsync(this.props.getOneDayWeather,this.props.getFiveDayWeather);
            }} style={buttonStyles}>
          <Text
            
            style={[textStyle, { fontFamily: "Montserrat-Light" }]}
          >
            Use your location
          </Text>
          <EvilIcon name="location" size={wp("7%")} color={"white"} />
        </TouchableOpacity>
        <Text style={[screenColors, { opacity: showErr }]}>
          The field is empty *
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#709EA8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: wp("5%"),
    color: "white"
  },
  buttonStyles: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    textAlign: "center",
    overflow: "hidden",
    padding: 10,
    marginTop: wp("3%")
  },
  textInputStyles: {
    width: wp("52%"),
    fontSize: wp("5%"),
    fontFamily: "Montserrat-Light",
    borderBottomColor: "white",
    paddingBottom: 1,
    borderBottomWidth: 1,
    color: "white",
    marginBottom: wp("3%")
  },
  backButton: {
    position: "absolute",
    top: 5,
    left: 5
  }
});

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    oneDayWeatherInfo: oneDayWeather,
    screenColors: state.setColorReducer.colors.text
  };
};

const mapDispatchToProps = {
  searchOneDayWeather,
  searchFiveDaysWeather,
  getOneDayWeather,
  getFiveDayWeather,
  setColorAccordingToWeather
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
