import React, { PureComponent } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
// import { Animated, Easing } from 'react-native';
import { Provider } from "react-redux";
import * as Font from "expo-font";


import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import StartScreen from '../screens/StartScreen';
import store from "../redux/store";

// let SlideFromBottom = (index, position, height) => {
//   const translateY = position.interpolate({
//     inputRange: [index - 1, index],
//     outputRange: [height, 0],
//   })

//   return { transform: [ { translateY } ] }
// };

// const TransitionConfiguration = () => {
//   return {
//     transitionSpec: {
//       duration: 650,
//       easing: Easing.out(Easing.poly(4)),
//       timing: Animated.timing,
//       useNativeDriver: true,
//     },
//     screenInterpolator: (sceneProps) => {
//       const { layout, position, scene } = sceneProps;
//       const width = layout.initWidth;
//       const height = layout.initHeight;
//       const { index, route } = scene
//       const params = route.params || {}; // <- That's new
//       const transition = params.transition || 'default'; // <- That's new
//       return {
//         default: SlideFromBottom(index, position, height)
//       }[transition];
//     },
//   }
// }

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        header: null
      }
    },
    StartScreen: {
      screen: StartScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Home",
    // transitionConfig: TransitionConfiguration
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends PureComponent {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
      "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
      'Montserrat-Light': require("../assets/fonts/Montserrat-Light.ttf"),
      'Montserrat-Regular': require("../assets/fonts/Montserrat-Regular.ttf"),
      'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf"),
      'MontserratAlternates-Light': require("../assets/fonts/MontserratAlternates-Light.ttf"),

    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if(this.state.fontLoaded) {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }else {
    return null
  }
}
}
