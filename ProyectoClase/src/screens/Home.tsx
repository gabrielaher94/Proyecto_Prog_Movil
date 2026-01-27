import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Switch, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../contexts/ThemeContext";

export default function Home({ navigation, route }: any) {
  const { isDark, setTheme } = useTheme();
  const { correo } = route.params;

  const handleTruck = () => navigation.navigate("TruckLocation");
  const handleTruckType = () => navigation.navigate("TruckType");
  const handleRegisterTruck = () => navigation.navigate("RegisterTruck");

  const HomeButton = ({
    title,
    onPress,
    icon,
  }: {
    title: string;
    onPress: () => void;
    icon: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.button,
        isDark ? styles.buttonDark : styles.buttonLight,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Icon
        name={icon}
        size={22}
        color={isDark ? "#000" : "#fff"}
        style={styles.icon}
      />
      <Text
        style={[
          styles.buttonText,
          isDark ? styles.buttonTextDark : styles.buttonTextLight,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <View style={styles.content}>
        
        {/* 🔹 Imagen arriba */}
        <Image
          source={require("../assents/images/logo_home.png")} // Ajusta la ruta según tu estructura
          style={styles.logo}
          resizeMode="contain"
        />

        {/* 🔹 Saludo */}
        <Text style={[styles.text, isDark ? styles.darkText : styles.lightText]}>
          Bienvenido {correo}
        </Text>

        {/* 🔹 Switch de tema */}
        <View style={styles.switchContainer}>
          <Text
            style={[styles.switchLabel, isDark ? styles.darkText : styles.lightText]}
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

        {/* 🔹 Botones */}
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <HomeButton
              title="Truck Location"
              onPress={handleTruck}
              icon="map-marker-truck"
            />
            <HomeButton
              title="Truck Type"
              onPress={handleTruckType}
              icon="truck-outline"
            />
          </View>
          <View style={styles.row}>
            <HomeButton
              title="Register Truck"
              onPress={handleRegisterTruck}
              icon="plus-box"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  alignItems: "center",
  paddingHorizontal: 20,
  paddingTop: 40,
  },

  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 350,   // Ajusta según tamaño
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 30,
    textAlign: "center",
  },

  lightBackground: { backgroundColor: "#fff" },
  darkBackground: { backgroundColor: "#121212" },
  lightText: { color: "#000" },
  darkText: { color: "#fff" },

  buttonContainer: { width: "100%", alignItems: "center", marginTop: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 12,
    marginHorizontal: 8,
    flex: 1,
  },
  buttonLight: {
    backgroundColor: "#000",
  },
  buttonDark: {
    backgroundColor: "#fff",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextLight: { color: "#fff" },
  buttonTextDark: { color: "#000" },

  icon: { marginRight: 8 },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: { fontSize: 16, marginRight: 10 },
});
