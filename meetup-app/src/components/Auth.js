import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import { navigationOptions } from '../config/navOptions';
import Login from './Login';
import SignUp from './SignUp';

const Auth = TabNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: 'red',
      height: 60,
      paddingVertical: 15
    },
    indicatorStyle: {
      backgroundColor: '#eaeaea'
    }
  },
  navigationOptions: {
    ...navigationOptions
  }
})

export default Auth;