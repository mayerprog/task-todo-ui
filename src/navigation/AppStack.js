import React, { useRef } from "react";
import Fonts from "../hooks/fonts-hook";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, Text } from "react-native";
import NewTaskScreen from "../screens/NewTaskScreen";
import InTaskScreen from "../screens/InTaskScreen";
import HomeScreen from "../screens/HomeScreen";

const AppStack = () => {
  const Stack = createNativeStackNavigator();

  if (!Fonts()) {
    return <ActivityIndicator size="large" color="#0000ff" style={{}} />;
  }
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NewTask" component={NewTaskScreen} />
      <Stack.Screen name="InTask" component={InTaskScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
