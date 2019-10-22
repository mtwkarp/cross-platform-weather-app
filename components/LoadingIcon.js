import React, { Component } from 'react';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Animated,
Easing
} from "react-native";
import { connect } from "react-redux";

AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcon);

class LoadingIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    isLoading: false,
      isAnimating: true
    };
    this.spinValue = new Animated.Value(0);
  }

  startLoadingAnimation = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.startLoadingAnimation());
  };

  componentDidMount() {
    this.startLoadingAnimation();
  }

  render() {
    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
      });
    return (
        <AnimatedIcon
          name="weather-sunny"
          size={this.props.size}
          style={{ transform: [{ rotate: spin }] }}
          color={this.props.screenColors.color}
        />
    );
  }
}


const mapStateToProps = state => {
    return {
      screenColors: state.setColorReducer.colors.text
    };
  };
  
  
  
  export default connect(
    mapStateToProps,
    {}
  )(LoadingIcon);
  