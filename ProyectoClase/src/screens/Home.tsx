import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../contexts/ThemeContext";

export default function Home({ navigation, route }: any) {
  const { isDark, setTheme } = useTheme();
  const { correo } = route.params;

  const handleTruck = () => navigation.navigate("TruckLocation");
  const handleTruckType = () => navigation.navigate("TruckType");
  const handleRegisterTruck = () => navigation.navigate("RegisterTruck");

  // 🔹 Botón personalizado
  // eslint-disable-next-line react/no-unstable-nested-components
  const HomeButton = ({
    title,
    onPress,
    color,
    icon,
  }: {
    title: string;
    onPress: () => void;
    color: string;
    icon: string;
  }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Icon name={icon} size={22} color="#fff" style={styles.icon} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <Text
        style={[
          styles.text,
          isDark ? styles.darkText : styles.lightText,
        ]}
      >
        Bienvenido {correo}
      </Text>

      {/* 🔹 Switch moderno en lugar de Picker */}
      <View style={styles.switchContainer}>
        <Text
          style={[
            styles.switchLabel,
            isDark ? styles.darkText : styles.lightText,
          ]}
        >
          {isDark ? "Modo Oscuro" : "Modo Claro"}
        </Text>
        <Switch
          value={isDark}
          onValueChange={(value) => setTheme(value ? "dark" : "light")}
          thumbColor={isDark ? "#fff" : "#000"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>

      {/* 🔹 Botones personalizados */}
      <View style={styles.item}>
        <HomeButton
          title="Truck Location"
          onPress={handleTruck}
          color="#007bff"
          icon="map-marker-truck"
        />
        <HomeButton
          title="Truck Type"
          onPress={handleTruckType}
          color="#6c757d"
          icon="truck-outline"
        />
        <HomeButton
          title="Register Truck"
          onPress={handleRegisterTruck}
          color="#dc3545"
          icon="plus-box"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "600",
  },
  lightBackground: {
    backgroundColor: "#fff",
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    marginVertical: 10,
    width: "80%",
    elevation: 4, // sombra en Android
    shadowColor: "#000", // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
});