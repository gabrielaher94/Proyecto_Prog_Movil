import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// 👇 Debes definir RootStackParamList igual que en TruckType
type Truck = {
  id: string;
  nombre: string;
  licencia: string;
  modelo: string;
  placa: string;
  peso: number;
};

type RootStackParamList = {
  RegisterTruck: { truck?: Truck };
};

type Props = NativeStackScreenProps<RootStackParamList, "RegisterTruck">;

export default function RegisterTruck({ route, navigation }: Props) {
  const truck = route.params?.truck; // 👈 si viene, estamos editando

  const [name, setName] = useState("");
  const [licence, setLicence] = useState("");
  const [model, setModel] = useState("");
  const [placa, setPlaca] = useState("");
  const [peso, setPeso] = useState("");

  // 👇 Precargar datos si estamos en modo edición
  useEffect(() => {
    if (truck) {
      setName(truck.nombre);
      setLicence(truck.licencia);
      setModel(truck.modelo);
      setPlaca(truck.placa);
      setPeso(truck.peso.toString());
    }
  }, [truck]);

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

      if (truck) {
        // 🔄 Actualizar
        await firestore().collection("trucks").doc(truck.id).update({
          nombre: name,
          licencia: licence,
          modelo: model,
          placa: placa,
          peso: Number(peso),
        });
        Alert.alert("Éxito", "Camión actualizado correctamente ✅");
      } else {
        // 🆕 Crear
        await firestore().collection("trucks").add({
          nombre: name,
          licencia: licence,
          modelo: model,
          placa: placa,
          peso: Number(peso),
          creadoEn: firestore.FieldValue.serverTimestamp(),
        });
        Alert.alert("Éxito", "Camión registrado correctamente ✅");
      }

      navigation.goBack(); // 👈 volver a la lista
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", "No se pudo guardar el camión");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Licencia" value={licence} onChangeText={setLicence} />
      <TextInput style={styles.input} placeholder="Modelo" value={model} onChangeText={setModel} />
      <TextInput style={styles.input} placeholder="Placa" value={placa} onChangeText={setPlaca} />
      <TextInput style={styles.input} placeholder="Peso" value={peso} onChangeText={setPeso} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{truck ? "Actualizar" : "Guardar"}</Text>
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