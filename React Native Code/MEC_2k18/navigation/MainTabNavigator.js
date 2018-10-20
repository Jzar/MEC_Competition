import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import PresetPhrasesScreen from '../screens/PresetPhrasesScreen';
import SpeechScreen from '../screens/SpeechScreen';


const PresetPhrasesStack = createStackNavigator({
  PresetPhrase: PresetPhrasesScreen,
});

PresetPhrasesStack.navigationOptions = {
  tabBarLabel: 'Phrases',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-happy'}
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
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-chatbubbles'}
    />
  ),
};



export default createBottomTabNavigator({
  PresetPhrasesStack,
  SpeechStack,
});
