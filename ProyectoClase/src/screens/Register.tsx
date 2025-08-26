import { View, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";

export default function Register({navigation}: any) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    

    const handleOnChangeEmail = (emai: string) => {
        setemail(emai);
        
    }

    const handleOnChangePassword = (pass: string) => {
        setpassword(pass);
        
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
                    title="Ingrese su correo de usuario"
                    value={email}
                    type="email"
                    onChange={handleOnChangeEmail}
                />

                <CustomInput 
                    title="Ingrese su contraseña de usuario"
                    value={password}
                    type="password"
                    onChange={handleOnChangePassword}
                />
            </View>

            <View style={styles.item}>
                <CustomButton 
                    title="Register"
                    onPress={handleLogin}
                />
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    item: {
        marginVertical: 2, // separa cada input/botón
    },
})