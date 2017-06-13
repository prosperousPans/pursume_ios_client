import React, {Component} from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NavigatorIOS,
} from 'react-native';
import {
  createNavigator,
  createNavigationContainer,
  TabRouter,
  addNavigationHelpers,
} from 'react-navigation';

import Matches from './Matches/Matches.js';
import Dashboard from './Dashboard/Dashboard.js';
import ChatMain from './Chat/ChatMain.js';
import Profile from './Profile/Profile.js';
import ProfileMain from './Profile/ProfileMain.js';


const ProfileScreen = () => (
  <ProfileMain />
);
const MatchesScreen = () => (
  <Matches />
);

const DashboardScreen = () => (
  <Dashboard />
);

const ChatScreen = () => (
  <ChatMain />
);

const CustomTabBar = ({ navigation }) => {
  const { routes } = navigation.state;
  return (
    <View style={styles.tabContainer}>
      {routes.map(route => (
        <TouchableOpacity
          onPress={() => navigation.navigate(route.routeName)}
          style={styles.tab}
          key={route.routeName}
        >     
          <Text style={styles.text}>{route.routeName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CustomTabView = ({ router, navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = router.getComponentForState(navigation.state);
  return (
    <View style={styles.container}>
      <CustomTabBar navigation={navigation} />
      <View style={styles.divider}></View>
      <ActiveScreen
        navigation={addNavigationHelpers({
          ...navigation,
          state: routes[index],
        })}
      />
    </View>
  );
};

const CustomTabRouter = TabRouter(
  {
    Profile: {
      screen: ProfileScreen,
      path: 'profile',
    },

    Dashboard: {
      screen: DashboardScreen,
      path: 'dashboard',
    },
    Home: {
      screen: MatchesScreen,
      path: '',
    },
    Chat: {
      screen: ChatScreen,
      path: 'chat',
    },
  },
  {
    // Change this to start on a different tab
    initialRouteName: 'Home',
  }
);

const Main = createNavigationContainer(
  createNavigator(CustomTabRouter)(CustomTabView)
);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },  
  tabContainer: {
    flexDirection: 'row',
    height: 48,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'grey',
  },
  text: {
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
  }    
});

export default Main;

