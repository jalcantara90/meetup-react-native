import { StackNavigator } from 'react-navigation';

import Auth from './src/components/Auth';
import MeetupList from './src/components/MeetupList';
import MeetupDetail from './src/components/MeetupDetail';

const AppNavigation = StackNavigator({
  Auth: { screen: Auth },
  Home: { screen: MeetupList },
  Detail: { screen: MeetupDetail}
})

export default AppNavigation