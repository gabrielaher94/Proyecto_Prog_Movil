import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Register from "./src/screens/Register";
import { AuthProvider } from "./src/contexts/AuthContext";

const Stack =createNativeStackNavigator();

export default function App(){
  return(
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name='LoginScreen' component={Login}/>
        <Stack.Screen name='HomeScreen' component={Home}/>
        <Stack.Screen name='RegisterScreen' component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};
