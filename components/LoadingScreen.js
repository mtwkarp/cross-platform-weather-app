import React from 'react';
import LoadingIcon from './LoadingIcon';
import {
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const LoadingScreen = () => {
  return (
    <LoadingIcon size={hp('15%')} />
  )
}

  
  
  export default LoadingScreen
  