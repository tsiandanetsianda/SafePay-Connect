import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ScamDetectorScreen from './src/screens/ScamDetectorScreen';
import TransactionVerifierScreen from './src/screens/TransactionVerifierScreen';
import VoiceSupportScreen from './src/screens/VoiceSupportScreen';
import SafeRouteScreen from './src/screens/SafeRouteScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Scan') {
            iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
          } else if (route.name === 'Verify') {
            iconName = focused ? 'lock-closed' : 'lock-closed-outline';
          } else if (route.name === 'Voice') {
            iconName = focused ? 'mic' : 'mic-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4ECDC4',
        tabBarInactiveTintColor: '#636E72',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#F7F9FC',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen 
        name="Scan" 
        component={ScamDetectorScreen}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Scan'
        }}
      />
      <Tab.Screen 
        name="Verify" 
        component={TransactionVerifierScreen}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Verify'
        }}
      />
      <Tab.Screen 
        name="Voice" 
        component={VoiceSupportScreen}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Voice'
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={SafeRouteScreen}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Map'
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen 
          name="ScamDetector" 
          component={ScamDetectorScreen}
          options={{ headerShown: true, title: 'AI Scam Detector' }}
        />
        <Stack.Screen 
          name="TransactionVerifier" 
          component={TransactionVerifierScreen}
          options={{ headerShown: true, title: 'Transaction Verifier' }}
        />
        <Stack.Screen 
          name="VoiceSupport" 
          component={VoiceSupportScreen}
          options={{ headerShown: true, title: 'Voice Support' }}
        />
        <Stack.Screen 
          name="SafeRoute" 
          component={SafeRouteScreen}
          options={{ headerShown: true, title: 'SafeRoute Finance' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
