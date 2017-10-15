import React, { Component } from 'react';
import { View } from 'react-native';

// import MeetupList from './src/components/MeetupList';
import AppNavigation from './AppNavigation';
import Auth from './src/components/Auth';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    setTimeout( ()=> {
      this.setState({
        user: { email: 'yo@email.com' }
      });
    }, 2000);
    
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        { 
          this.state.user
          ? <AppNavigation user = { this.state.user } />
          : <Auth />
        } 
      </View>
    );
  }
}

