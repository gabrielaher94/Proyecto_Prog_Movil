import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Register from "./src/screens/Register";
import TruckLocation from "./src/screens/TruckLocation";
import RegisterTruck from "./src/screens/RegisterTruck";
import TruckType from "./src/screens/TruckType";
import Perfil from "./src/screens/Perfil";
import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider } from "./src/contexts/ThemeContext"; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
              <Stack.Screen name="LoginScreen" component={Login}options={{ headerShown: false }} />
              <Stack.Screen name="HomeScreen" component={Home}options={{ headerShown: false }} />
              <Stack.Screen name="RegisterScreen" component={Register}options={{ headerShown: false }} />
              <Stack.Screen name="TruckLocation" component={TruckLocation} />
              <Stack.Screen name="TruckType" component={TruckType} options={{ headerShown: false }}/>
              <Stack.Screen name="RegisterTruck" component={RegisterTruck}options={{ headerShown: false }} />
              <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
    </ThemeProvider>
  );
}