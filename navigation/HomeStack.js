import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CabsList from "../screens/CabsList";
import CabDetail from "../screens/CabDetail";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cabs List" component={CabsList} />
      <Stack.Screen name="Cab Detail" component={CabDetail} /> 
    </Stack.Navigator>
  );
};

export default HomeStack;
