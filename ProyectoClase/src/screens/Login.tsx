import { View, StyleSheet, Alert, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";  
import auth from '@react-native-firebase/auth';
import React from "react";

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

  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        Alert.alert("Error", "Por favor complete todos los campos");
        return;
      }

      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      navigation.navigate("HomeScreen", { correo: user.email });
    } catch (error: any) {
  console.log("Login error:", error.code, error.message);

  switch (error.code) {
    case "auth/invalid-email":
      Alert.alert("Error", "El correo no es válido");
      break;
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      Alert.alert("Error", "Correo o contraseña incorrectos");
      break;
    default:
      Alert.alert("Error", error.message);
      break;
  }
}
  };

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.darkBackground : styles.lightBackground,
      ]}
    >
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
  lightBackground: { backgroundColor: "#f7f7f8ff" },
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