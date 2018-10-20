import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PresetPhrasesScreen from '../screens/PresetPhrasesScreen';
import SpeechScreen from '../screens/SpeechScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PresetPhrasesStack = createStackNavigator({
  PresetPhrase: PresetPhrasesScreen,
});

PresetPhrasesStack.navigationOptions = {
  tabBarLabel: 'Phrases',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SpeechStack = createStackNavigator({
  Speeches: SpeechScreen,
});

SpeechStack.navigationOptions = {
  tabBarLabel: 'Speech',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};



export default createBottomTabNavigator({
  HomeStack,
  PresetPhrasesStack,
  SpeechStack,
});
