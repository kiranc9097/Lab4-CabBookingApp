import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import MyCab from "../screens/MyCab";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "My Cab") {
            iconName = "car";
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === "Home") {
            label = "Home";
          } else if (route.name === "My Cab") {
            label = "My Cab";
          }
          return (
            <Text style={{ color: focused ? "#42a5f5" : "#90a4ae" }}>
              {label}
            </Text>
          );
        },
        tabBarActiveTintColor: "#42a5f5",
        tabBarInactiveTintColor: "#90a4ae",
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="My Cab"
        component={MyCab}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
