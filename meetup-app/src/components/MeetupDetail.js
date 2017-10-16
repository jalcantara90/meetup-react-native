import React, { Component } from 'react';
import { 
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet 
} from 'react-native';

import { db } from '../config/firebase';
import moment from 'moment';
import 'moment/locale/es';
import Icon from 'react-native-vector-icons/FontAwesome';

import { navigationOptions } from '../config/navOptions';
export default class MeetupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      assitants: []
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Evento de ${navigation.state.params.group}`,
    ...navigationOptions
  });

  componentWillMount() {
    const { navigation } = this.props;
    moment().locale('es');

    db.ref(`/events/${navigation.state.params.id}`)
      .once('value', snapshot => {
        this.setState({
          event: snapshot.val()
        })
      })
  }

  render() {
    return(
      <ScrollView style = { styles.container }>
        <Image style = {styles.coverImage} source={require('../assets/meetup-event.jpeg')} />
        <Text style = { styles.title }> { this.state.event.title }</Text>
        <View style = { styles.info }>
          <Icon style = { styles.infoIcon } name="calendar-o" size={20} color="grey" />
          <View>
            <Text style = { styles.InfoText }> { moment(this.state.event.date).fromNow() } </Text>
            <Text style = { styles.InfoSubText }> { moment(this.state.event.date).format('dddd, DD MMMM') } </Text>
          </View>
        </View>
        <View style = { styles.info }>
          <Icon style = { styles.infoIcon } name="map-marker" size={20} color="grey" />
          <View>
            <Text style = { styles.infoText } > { this.state.event.location }</Text>
            <Text style = { styles.infoSubText } > { this.state.event.locationAddress }</Text>
          </View>
        </View>
        <View style = { styles.info }>
          <TouchableHighlight style = { styles.rsvpBtn } onPress={ ()=> null }>
            <View>
              <Text style = {styles.rsvpText} >
                Apuntarse
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style = { styles.description }>
          <Text style = { styles.descriptionText }> { this.state.event.description }</Text>
        </View>
      </ScrollView>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  coverImage: {
    flex: 1,
    height: 300
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10
  },
  info: {
    flexDirection: 'row',
    marginHorizontal: 20
  },
  infoIcon: {
    margin: 10
  },
  infoText: {
    color: 'grey',
    fontSize: 17
  },
  rsvpBtn: {
    flex: 1,
    backgroundColor: 'red',
    margin: 15,
    padding: 10,
    borderRadius: 3
  },
  rsvpText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    backgroundColor: '#eaeaea',
    borderTopWidth: 1,
    borderColor: '#aaa',
    padding: 20,
    marginTop: 10
  },
  descriptionText: {
    fontSize: 17
  }
})