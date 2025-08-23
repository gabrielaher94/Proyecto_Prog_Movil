import { View, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeEmail = (text: string) => {
    setEmail(text);
  };

  const handleOnChangePassword = (text: string) => {
    setPassword(text);
  };

  const handleRegistro = () => {
    
      navigation.navigate("RegistroScreen");
   
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
    <View style={styles.container}>
      <View style={styles.item}>
        <CustomInput
          title="Escriba su correo"
          value={email}
          type="email"
          onChange={handleOnChangeEmail}
        />

        <CustomInput
          title="Escriba su contraseña"
          value={password}
          type="password"
          onChange={handleOnChangePassword}
        />
      </View>

      <View style={styles.item}>
        <CustomButton title="Iniciar Sesion" onPress={handleLogin} />
      </View>

      <View style={styles.item}>
        <CustomButton
          title="Registrarme"
          onPress={handleRegistro}
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
    padding: 10,
  },
  item: {
    marginVertical: 5,
  },
});

