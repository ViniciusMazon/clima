import { Feather as Icon } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Forecast from './pages/Forecast';
import Settings from './pages/Settings';
import Weather from './pages/Weather';

const Tab = createMaterialBottomTabNavigator();
const AppStack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Clima"
      activeColor="#fff"
      inactiveColor="#000"
      barStyle={{ backgroundColor: '#4666e4' }}>
      <Tab.Screen
        name="Clima"
        component={Weather}
        options={{
          tabBarLabel: 'Clima',
          tabBarIcon: ({ color }) => <Icon name="sun" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Previsão"
        component={Forecast}
        options={{
          tabBarLabel: 'Previsão do Tempo',
          tabBarIcon: ({ color }) => <Icon name="calendar" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="float"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5',
          },
        }}>
        <AppStack.Screen
          name="Clima"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="Configurações"
          component={Settings}
          options={{
            headerShown: true,
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
