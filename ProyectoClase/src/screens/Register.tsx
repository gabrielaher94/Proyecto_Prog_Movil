import { View, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";

// 🔹 Importar Firebase desde React Native Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from "react";

export default function Register({navigation}: any) {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleOnchangeName = (nam: string) => setname(nam);
  const handleOnchangeID = (id1: string) => setid(id1);
  const handleOnchangePhone = (phon: string) => setphone(phon);
  const handleOnchangeGender = (gende: string) => setgender(gende);
  const handleOnChangeEmail = (emai: string) => setemail(emai);
  const handleOnChangePassword = (pass: string) => setpassword(pass);

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
    

      // 🔹 Crear usuario en Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // 🔹 Guardar info adicional en Firestore
      await firestore().collection('users').doc(user.uid).set({
        name,
        id,
        phone,
        gender,
        email,
      });

      Alert.alert("Éxito", "Usuario registrado correctamente ✅");

      navigation.navigate("Perfil", {
        name,
        id,
        phone,
        gender,
        email,
      });

    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <CustomInput title="Name" value={name} type="name" onChange={handleOnchangeName} />
        <CustomInput title="ID" value={id} type="id" onChange={handleOnchangeID} />
        <CustomInput title="Phone" value={phone} type="phone" onChange={handleOnchangePhone} />
        <CustomInput title="Gender" value={gender} type="gender" onChange={handleOnchangeGender} />
        <CustomInput title="Email" value={email} type="email" onChange={handleOnChangeEmail} />
        <CustomInput title="Password" value={password} type="password" onChange={handleOnChangePassword} />
      </View>

      <View style={styles.item}>
        <CustomButton title="Register" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  item: { marginVertical: 10 },
});