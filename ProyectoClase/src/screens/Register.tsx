import { View, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";

export default function Registro({navigation}: any) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    

    const handleOnChangeEmail = (email: string) => {
        setemail(email);
        
    }

    const handleOnChangePassword = (password: string) => {
        setpassword(password);
        
    }
const handleLogin = () =>{
    try {
    if (!email || !password) {
        Alert.alert("Error", "Por favor complete todos los campos");
        return;
    }
    navigation.navigate("HomeScreen", {correo:email});
} catch (error: any) {
    
}
}

    return (
        
        <View style={styles.container}>
            <View style={styles.item}>
                <CustomInput 
                    title="Escriba su correo de usuario"
                    value={email}
                    type="email"
                    onChange={handleOnChangeEmail}
                />

                <CustomInput 
                    title="Escriba su contraseña de usuario"
                    value={password}
                    type="password"
                    onChange={handleOnChangePassword}
                />
            </View>

            <View style={styles.item}>
                <CustomButton 
                    title="Registrarse"
                    onPress={handleLogin}
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
        marginVertical: 2, // separa cada input/botón
    },
})