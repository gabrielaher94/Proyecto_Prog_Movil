import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";  
import auth from '@react-native-firebase/auth';
import React from "react";
import Icon from "react-native-vector-icons/Ionicons"; // 👈 Para el ícono de usuario y flecha
import { Alert } from "react-native";

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

  const handleOnChangeEmail = (text: string) => setEmail(text);
  const handleOnChangePassword = (text: string) => setPassword(text);

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
    <View style={styles.container}>
      {/* Parte superior con fondo negro y el ícono */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Icon name="person-outline" size={80} color="#fff" style={styles.userIcon} />
      </View>

      {/* Contenedor blanco */}
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        <CustomInput
          title="E-mail"
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

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <CustomButton title="Login" onPress={handleLogin} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have any account? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#000",
    height: 200,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  userIcon: {
    marginTop: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -40,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  forgotText: {
    color: "#777",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  footerText: {
    color: "#000",
  },
  footerLink: {
    color: "#000",
    fontWeight: "bold",
  },
});
