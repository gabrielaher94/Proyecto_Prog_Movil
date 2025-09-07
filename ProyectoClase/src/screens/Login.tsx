import { View, StyleSheet, Alert, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";  

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Login, isAllowed } = useAuth();
  const { isDark } = useTheme(); 

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  const handleOnChangeEmail = (text: string) => {
    setEmail(text);
  };

  const handleOnChangePassword = (text: string) => {
    setPassword(text);
  };

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleLogin = () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Por favor complete todos los campos");
        return;
      }
      navigation.navigate("HomeScreen", { correo: email });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <Image
        source={require("../assets/images/logo.jpeg")}
        style={styles.logo}
      />

      <View style={styles.item}>
        <CustomInput
          title="Email"
          value={email}
          type="email"
          onChange={handleOnChangeEmail}
        />

        <CustomInput
          title="Password"
          value={password}
          type="password"
          onChange={handleOnChangePassword}
        />
      </View>

      <View style={styles.item}>
        <CustomButton title="Iniciar Sesión" onPress={handleLogin} />
      </View>

      <View style={styles.item}>
        <CustomButton
          title="Registrar"
          onPress={handleRegister}
          variant="secondary"
        />
      </View>

      <View style={styles.item}>
        <CustomButton
          title="Cambiar contraseña"
          onPress={() => {}}
          variant="tertiary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  lightBackground: { backgroundColor: "#f6f8f8ff" },
  darkBackground: { backgroundColor: "#000" },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  item: {
    width: "100%",
    marginVertical: 5,
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
  },
  lightText: { color: "#000" },
  darkText: { color: "#fff" },
});
