import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { navigationOptions } from '../config/navOptions';

import { auth, db } from '../config/firebase';
import { generateAvatarURL } from '../utils/gravatar'
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Regístrate`,
    ...navigationOptions
  });

  createUser( email, password ) {
    auth.createUserWithEmailAndPassword( email, password )
        .then( result => {
          db.ref(`/users/${result.uid}`).set({
            uid: result.uid,
            remail: result.email,
            avatar: generateAvatarURL()
          })
        })
  }

  render() {
    return(
      <View style = { styles.container }>
        <Image style = { styles.logo } source = {require('../assets/logo-meetup.png') } />
        <TextInput 
          style = { styles.input }
          onChangeText = { (text) => this.setState({ email: text })}
          placeholder = { "Tu email..." }
          value = { this.state.email }
        />
        <TextInput 
          style = { styles.input }
          secureTextEntry = { true }
          onChangeText = { (text) => this.setState({ password: text })}
          placeholder = { "Tu contraseña..." }
          value = { this.state.password }
        />
        <TouchableHighlight
          style = { styles.loginBtn }
          onPress= { () => this.createUser(this.state.email, this.state.password)}
        >
          <View>
            <Text style = { styles.textBtn }>Crea una cuenta nueva</Text>
          </View>
        </TouchableHighlight>
        
        <TouchableHighlight onPress={() => this.props.navitagion.navigate('Login')}>
          <View>
            <Text style= {{ textAlign: 'center' }}>
              ¿Ya tienes cuenta?
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginTop: 90
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 50
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderColor: 'orangered'
  },
  loginBtn: {
    backgroundColor: 'orange',
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 3
  },
  textBtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})