import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // ✅ selector 3 estados
import CustomButton from "../components/CustomButton";
import { useTheme } from "../contexts/ThemeContext";

export default function Home({ navigation, route }: any) {
  const { theme, isDark, setTheme } = useTheme();
  const { correo } = route.params;

  const handleTruck = () => navigation.navigate("TruckLocation");
  const handleTruckType = () => navigation.navigate("TruckType");
  const handleRegisterTruck = () => navigation.navigate("RegisterTruck");

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <Text style={[styles.text, isDark ? styles.darkText : styles.lightText]}>
        Tema actual: {theme}
      </Text>

      <Text style={styles.text}>Bienvenido {correo}</Text>

      <Picker
  selectedValue={theme}
  style={[
    styles.picker,
    isDark ? styles.pickerDark : styles.pickerLight, 
  ]}
  onValueChange={(value) => setTheme(value)}
>
  <Picker.Item label="Automático" value="auto" />
  <Picker.Item label="Claro" value="light" />
  <Picker.Item label="Oscuro" value="dark" />
</Picker>



      <View style={styles.item}>
        <CustomButton title="Truck Location" onPress={handleTruck} variant="secondary" />
        <CustomButton title="Truck Type" onPress={handleTruckType} variant="secondary" />
        <CustomButton title="Register Truck" onPress={handleRegisterTruck} variant="secondary" />
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
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  picker: {
    width: 200,
    marginBottom: 20,
  },
  pickerLight: {
    color: "#000",
    backgroundColor: "#eee",
  },
  pickerDark: {
    color: "#fff",
    backgroundColor: "#222",
  },
  lightBackground: {
    backgroundColor: "#fff",
  },
  darkBackground: {
    backgroundColor: "#000",
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
});


