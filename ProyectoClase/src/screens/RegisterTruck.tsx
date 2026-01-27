import React, { useState, useEffect } from "react";
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ScrollView, 
  Image 
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";

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
  const truck = route.params?.truck;

  const [name, setName] = useState("");
  const [licence, setLicence] = useState("");
  const [model, setModel] = useState("");
  const [placa, setPlaca] = useState("");
  const [peso, setPeso] = useState("");

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
        await firestore().collection("trucks").doc(truck.id).update({
          nombre: name,
          licencia: licence,
          modelo: model,
          placa: placa,
          peso: Number(peso),
        });
        Alert.alert("Éxito", "Camión actualizado correctamente ✅");
      } else {
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

      navigation.goBack();
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", "No se pudo guardar el camión");
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Encabezado negro */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Image
          source={require("../assents/images/logo_login.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* 🔹 Texto dentro del encabezado */}
        <Text style={styles.headerTitle}>Registro de Camiones</Text>
      </View>

      {/* 🔹 Contenido scrollable */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Licencia"
            value={licence}
            onChangeText={setLicence}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            value={model}
            onChangeText={setModel}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Placa"
            value={placa}
            onChangeText={setPlaca}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Peso"
            value={peso}
            onChangeText={setPeso}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>
              {truck ? "Actualizar" : "Guardar"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfbff",
  },
  header: {
    backgroundColor: "#242323ff",
    height: 180,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: 10,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  logo: {
    width: 190,
    height: 110,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // 👈 Texto blanco
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    padding: 20,
    marginTop: -40, // se solapa sobre el header
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0a0b0bff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
