import React from 'react';
import { View,Text,TouchableOpacity} from 'react-native';
import Header from './Constants/Header';
import Screen from './Constants/Screen';
import MapNavigation from './Components/Screens/MapView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import routes from './Components/routes';
import ChooseLocation from './Components/Screens/ChooseLocation';
import FlashMessage from "react-native-flash-message";

const Stack = createStackNavigator();

function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={routes.MAPNAVIGATION} component={MapNavigation}/>
        <Stack.Screen name={routes.CHOOSELOCATION} component={ChooseLocation}/>
      </Stack.Navigator>
      <FlashMessage position="top"/>
    </NavigationContainer>
  );
}

export default App;