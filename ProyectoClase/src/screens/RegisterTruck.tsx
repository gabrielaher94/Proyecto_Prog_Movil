import React from "react";
import {Text, View,TextInput,StyleSheet, KeyboardTypeOptions, TouchableOpacity} from "react-native";
import { useState } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomButton from "../components/CustomButton";
import { Float } from "react-native/Libraries/Types/CodegenTypes";



type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  RegisterTruck: undefined;
  Services: undefined;
  TruckLocation: undefined;
  TruckType: undefined;
};
type Props = {
    name : string;
    licence ?: boolean;
    modelo: string;
    placa?: boolean;
    peso?: boolean;

}
type TruckTypeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "RegisterTruck">;
};

const TruckType = ({navigation}: TruckTypeProps)=>{
const [name, setname] =useState('');
const [licence, setlicence ] =useState('');
const [model, setmodel]=useState('');
const [placa, setplaca]=useState('');
const[peso, setpeso]=useState('');

const handleOnChangename = (text: string) => {
    setname(text);
  };
  const handleOnChangelicence = (lic:boolean) => {
    setlicence('lic');
  };
  const handleOnChangemodel = (mod: string) => {
    setmodel(mod);
  };
  const handleOnChangeplaca = (plac: boolean) => {
    setplaca('plac');
  };
  const handleOnChangepeso = (pes: boolean) => {
    setpeso('pes');
  };

const handleSave = () => {
  try {
    if (!name || !licence || !model || !placa || !peso) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    if (Number(peso) > 900) {
      Alert.alert("Error", "El peso máximo permitido es 900 toneladas");
      return;
    }

    navigation.navigate("TruckType" );
  } catch (error: any) {
    console.log(error);
  }
};