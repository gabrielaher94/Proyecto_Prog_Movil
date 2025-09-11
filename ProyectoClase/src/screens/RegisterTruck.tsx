import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import firestore from '@react-native-firebase/firestore';


export default function RegisterTruck() {
  const [name, setname] = useState('');
  const [licence, setlicence] = useState('');
  const [model, setmodel] = useState('');
  const [placa, setplaca] = useState('');
  const [peso, setpeso] = useState('');
  

  const handleSave = async () => {
    try {
      if (!name || !licence || !model || !placa || !peso) {
        Alert.alert("Error", "Por favor complete todos los campos");
        return;
      }

      if (Number(peso) > 900) {
        Alert.alert("Error", "El peso máximo permitido es 900 toneladas");
        return;
      }

      // 🔹 Guardar en Firestore
      await firestore().collection("trucks").add({
        nombre: name,
        licencia: licence,
        modelo: model,
        placa: placa,
        peso: Number(peso),
        creadoEn: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert("Éxito", "Camión registrado correctamente ✅");

      // Limpiar inputs
      setname("");
      setlicence("");
      setmodel("");
      setplaca("");
      setpeso("");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", "No se pudo registrar el camión");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setname} />
      <TextInput style={styles.input} placeholder="Licencia" value={licence} onChangeText={setlicence} />
      <TextInput style={styles.input} placeholder="Modelo" value={model} onChangeText={setmodel} />
      <TextInput style={styles.input} placeholder="Placa" value={placa} onChangeText={setplaca} />
      <TextInput style={styles.input} placeholder="Peso" value={peso} onChangeText={setpeso} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
