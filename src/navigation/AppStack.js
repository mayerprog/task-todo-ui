import React from "react";
import Fonts from "../hooks/fonts-hook";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  if (!Fonts()) {
    return <Text>Loading...</Text>; // or a loading screen
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
