import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import firestore from "@react-native-firebase/firestore";

type Truck = {
  id: string;
  nombre: string;
  licencia: string;
  modelo: string;
  placa: string;
  peso: number;
};

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  RegisterTruck: { truck?: Truck };
  Services: undefined;
  TruckLocation: undefined;
  TruckType: undefined;
};

type TruckTypeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "TruckType">;
};

export default function TruckType({ navigation }: TruckTypeProps) {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [search, setSearch] = useState(""); // estado de búsqueda
  const [filteredTrucks, setFilteredTrucks] = useState<Truck[]>([]);

  // Leer de Firestore
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("trucks")
      .orderBy("creadoEn", "desc")
      .onSnapshot((querySnapshot) => {
        const data: Truck[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Truck[];
        setTrucks(data);
        setFilteredTrucks(data);
      });

    return () => unsubscribe();
  }, []);

  // Filtrar camiones según el input
  useEffect(() => {
    const filtered = trucks.filter((truck) =>
      truck.nombre.toLowerCase().includes(search.toLowerCase()) ||
      truck.modelo.toLowerCase().includes(search.toLowerCase()) ||
      truck.placa.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTrucks(filtered);
  }, [search, trucks]);

  // Eliminar camión
  const deleteTruck = (id: string) => {
    Alert.alert("Eliminar", "¿Seguro que deseas eliminar este camión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await firestore().collection("trucks").doc(id).delete();
            Alert.alert("Éxito", "Camión eliminado correctamente");
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el camión");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Input de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar camión..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredTrucks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.nombre}</Text>
            <Text>Licencia: {item.licencia}</Text>
            <Text>Marca: {item.modelo}</Text>
            <Text>Placa: {item.placa}</Text>
            <Text>Peso: {item.peso} T</Text>

            {/* Botones de acción */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#0d0d0dff" }]}
                onPress={() => navigation.navigate("RegisterTruck", { truck: item })}
              >
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => deleteTruck(item.id)}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay camiones registrados</Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RegisterTruck")}
      >
        <Text style={styles.addButtonText}>+ Registrar Camión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    padding: 10,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#0a0a0aff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
