import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

export default function Register({ navigation }: any) {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const clearFields = () => {
    setname("");
    setid("");
    setphone("");
    setgender("");
    setemail("");
    setpassword("");
  };

  const handleRegister = async () => {
    try {
      if (!email || !password || !name || !id || !phone || !gender) {
        Alert.alert("Error", "Por favor complete todos los campos");
        return;
      }

      const signInMethods = await auth().fetchSignInMethodsForEmail(email);
      if (signInMethods.length > 0) {
        Alert.alert("Error", "Este email ya está registrado");
        return;
      }

      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await firestore().collection('users').doc(user.uid).set({
        name,
        id,
        phone,
        gender,
        email,
      });

      Alert.alert("Éxito", "Usuario registrado correctamente ✅");

      // 🔹 Limpiar inputs
      clearFields();

      // 🔹 Navegar al perfil con los datos recién registrados
      navigation.navigate("Perfil", { name, id, phone, gender, email });
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Encabezado negro con curva */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>

      {/* 🔹 Contenido */}
      <View style={styles.content}>
        <CustomInput title="Full Name" value={name} type="text" onChange={setname} />
        <CustomInput title="ID" value={id} type="text" onChange={setid} />
        <CustomInput title="Phone" value={phone} type="phone" onChange={setphone} />
        <CustomInput title="Gender" value={gender} type="text" onChange={setgender} />
        <CustomInput title="E-mail" value={email} type="email" onChange={setemail} />
        <CustomInput title="Password" value={password} type="password" onChange={setpassword} />

        <CustomButton title="Sign Up" onPress={handleRegister} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.footerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#000",
    height: 150,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backButton: { position: "absolute", top: 40, left: 20 },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#fff", marginTop: 20 },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
  footerText: { color: "#000" },
  footerLink: { color: "#000", fontWeight: "bold" },
});
