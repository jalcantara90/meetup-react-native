import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import { navigationOptions } from '../config/navOptions';
import { db } from '../config/firebase';

const { width, height } = Dimensions.get('window');

export default class MeetupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      isLoading: true
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Meetup',
    ...navigationOptions
  });

  componentWillMount() {
   db.ref('/events')
    .once('value', snapshot => {
      this.setState({
        events: this.state.events.concat(snapshot.val()),
        isLoading: false
      })
    })
  }

  render() {
    const { navigation } = this.props;

    return this.state.isLoading 
      ? ( <ActivityIndicator style = { styles.loader } size = {100} color="red" />)
      : (
          <ScrollView style ={ styles.container }>
            {this.state.events.map((event, i) =>(
              <TouchableWithoutFeedback
                key = { i }
                onPress={() => navigation.navigate('Detail', {
                  group: event.groupName,
                  id: event.id
                })}
              >
                <View style = { styles.card }>
                  <Image style = { styles.image } source = {{ uri: event.groupImage }}/>
                  <View style = { styles.cardContent }>
                    <Text style = { styles.title }> { event.title } </Text>
                    <Text> Organizado por { event.groupName } </Text>
                  </View> 
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        )
  }
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 100
  },
  container: {
    flex:1,
    margin:10,
    height
  },
  card: {
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 3,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    marginVertical: 3,

  },
  image: {
    width: 100,
    height:100
  },
  cardContent: {
    flex:1,
    padding:10,
    margin:0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})