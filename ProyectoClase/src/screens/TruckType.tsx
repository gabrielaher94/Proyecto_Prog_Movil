import React from "react";
import {Text, View,TextInput,StyleSheet, KeyboardTypeOptions, TouchableOpacity} from "react-native";
import { useState } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomButton from "../components/CustomButton";

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  RegisterTruck: undefined;
  Services: undefined;
  TruckLocation: undefined;
  TruckType: undefined;
};

type TruckTypeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "TruckType">;
};

export default function TruckType ({navigation}:TruckTypeProps){
const TruckType = ({navigation}: TruckTypeProps)=>{
const [name, setname] =useState('');
const [licence, setlicence ] =useState('');
const [model, setmodel]=useState('');
const [placa, setplaca]=useState('');
const[peso, setpeso]=useState('');


};
}