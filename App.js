import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/pages/Home';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home'
            }

            return <FontAwesome name={iconName} size={40} color={color} />;
          },
          tabBarLabel:() => (null),
          tabBarActiveTintColor: '#00AFAD',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: "#003461"
          }
        })}
        
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            //headerShown: false
            title: 'Lista de pacientes',
            headerStyle: {
              backgroundColor: '#003461',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#FFF'
            },
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}