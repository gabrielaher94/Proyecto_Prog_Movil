import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  RegisterTruck: undefined;
  Services: undefined;
  TruckLocation: undefined;
  TruckType: undefined;
};


type TruckTypeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "RegisterTruck">;
};

export default function RegisterTruck({ navigation }: TruckTypeProps) {
  const [name, setname] = useState('');
  const [licence, setlicence] = useState('');
  const [model, setmodel] = useState('');
  const [placa, setplaca] = useState('');
  const [peso, setpeso] = useState('');

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

      navigation.navigate("TruckType");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Nombre" value={name} onChangeText={setname} />
      <TextInput placeholder="Licencia" value={licence} onChangeText={setlicence} />
      <TextInput placeholder="Modelo" value={model} onChangeText={setmodel} />
      <TextInput placeholder="Placa" value={placa} onChangeText={setplaca} />
      <TextInput placeholder="Peso" value={peso} onChangeText={setpeso} keyboardType="numeric" />

      <TouchableOpacity onPress={handleSave}>
        <Text>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
