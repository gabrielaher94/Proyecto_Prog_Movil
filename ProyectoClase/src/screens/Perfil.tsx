import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Perfil({ route, navigation }: any) {
  const { id, name, gender, phone, email } = route.params;

  return (
    <View style={styles.container}>
      {/* 🔹 Header rojo con curva */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* 🔹 Card con la info */}
      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{id}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Género:</Text>
          <Text style={styles.value}>{gender}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>

      {/* Botón volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>⬅ Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#0c0c0cff",
    height: 180,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -50,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },
  infoBox: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#777",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  backButton: {
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#161515ff",
    borderRadius: 25,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
