import React, { Component } from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import moment from "moment";
import * as path from "svg-path-properties";
import { connect } from "react-redux";

class SunPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cx: 24.901330947875977,
      cy: 55.82204818725586,
      pathProp:
        "M-1.5,90.5c31.28-54.36,88-85,152-85c96.65,0,149.78,81.13,152,85",
      sunriseTime: null,
      sunsetTime: null,
      strokeDasharray: "",
      strokeDashoffset: "",
      strokeColor: "#3C3C3B",
      fillColor: "#3C3C3B"
    };

    this.sunPath = React.createRef();
    this.sun = React.createRef();
  }

  showCurrentSunPosition = sunInfo => {
    let currentTimeUnix = moment().unix();

    const { sunrise, sunset } = sunInfo;
    let percentOfDay = (currentTimeUnix - sunrise) / (sunset - sunrise);
    let percentOfNight;
    if (moment().format("HH") > 12 && moment().format("HH") <= 23) {
      percentOfNight =
        (currentTimeUnix - sunset) / (86400 - (sunset - sunrise));
    } else {
      percentOfNight =
        1 - (sunrise - currentTimeUnix) / (86400 - (sunset - sunrise));
    }

    this.setState({
      sunriseTime: moment(new Date(sunrise * 1000)).format("H:mm"),
      sunsetTime: moment(new Date(sunset * 1000)).format("H:mm")
    });

    if (currentTimeUnix >= sunrise && currentTimeUnix < sunset) {
      this.displaySunPath(percentOfDay, "day");
    } else {
      this.displaySunPath(percentOfNight, "night");
    }
  };

  displaySunPath = percent => {
    let mainPath = path.svgPathProperties(this.state.pathProp);
    let sunPathTotal = mainPath.getTotalLength();
    let sunPathCurrent = sunPathTotal * (1 - percent);
    let sunPosition = mainPath.getPointAtLength(sunPathTotal - sunPathCurrent);

    this.setState({
      strokeDasharray: sunPathTotal,
      strokeDashoffset: sunPathCurrent,
      cx: sunPosition.x,
      cy: sunPosition.y
    });
  };

  componentDidMount() {
    this.showCurrentSunPosition(this.props.sunPathInfo);
  }

  render() {
    
    const { screenColors } = this.props;

    return (
      <View style={styles.sunPathContainer}>
        <Svg
          viewBox="0 0 300 90"
          height={150}
          width={Math.round(Dimensions.get("window").width)}
          style={styles.svg}
        >
          <Path
            fillOpacity="0"
            strokeWidth="1"
            stroke="#555"
            d="M-1.5,90.5c31.28-54.36,88-85,152-85c96.65,0,149.78,81.13,152,85"
          />
          <Path
            ref={this.sunPath}
            id="sun-path"
            strokeDasharray={this.state.strokeDasharray}
            strokeDashoffset={this.state.strokeDashoffset}
            fillOpacity="0"
            strokeWidth="2"
            stroke={screenColors.color}
            d="M-1.5,90.5c31.28-54.36,88-85,152-85c96.65,0,149.78,81.13,152,85"
          />
          <Circle
            ref={this.sun}
            id="sun"
            r="7"
            cx={this.state.cx}
            cy={this.state.cy}
            fill={screenColors.color}
          />
        </Svg>
        <View style={styles.sunPosition}>
          <View>
            <Text style={[screenColors,styles.sunRiseAndSunset]}>sunrise</Text>
            <Text style={[screenColors,styles.sunRiseAndSunset]}>{this.state.sunriseTime}</Text>
          </View>
          <View>
            <Text style={[screenColors,styles.sunRiseAndSunset]}>sunset</Text>
            <Text style={[screenColors,styles.sunRiseAndSunset]}>{this.state.sunsetTime}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sunPathContainer: {
    margin: 0,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center"
  },

  svg: {
    color: "black"
  },

  sunPosition: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  sunRiseAndSunset: {
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    sunPathInfo: oneDayWeather.sys,
    screenColors: state.setColorReducer.colors.text
  };
};

export default connect(
  mapStateToProps,
  {}
)(SunPath);
