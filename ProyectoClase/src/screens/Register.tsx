import { View, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";

export default function Register({navigation}: any) {
    const[name, setname]=useState("");
    const[id, setid]= useState("");
    const[phone, setphone]= useState("");
    const[gender, setgender]= useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    
const handleOnchangeName = (nam: string)=>{
    setname(nam);
}

const handleOnchangeID = (id1: string)=>{
    setid(id1);
}

const handleOnchangePhone = (phon: string)=>{
    setphone(phon);
}

const handleOnchangeGender = (gende: string)=>{
    setgender(gende);
}

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

    navigation.navigate("Perfil", {
      name,
      id,
      phone,
      gender,
      email,
      password
    });
  } catch (error: any) {
    console.log(error);
  }
}
    return (
        
        <View style={styles.container}>
            <View style={styles.item}>
                <CustomInput 
                    title="Name"
                    value={name}
                    type="name"
                    onChange={handleOnchangeName}
                />
                <CustomInput 
                    title="ID"
                    value={id}
                    type="id"
                    onChange={handleOnchangeID}
                />
                <CustomInput 
                    title="Phone"
                    value={phone}
                    type="phone"
                    onChange={handleOnchangePhone}
                />
                <CustomInput 
                    title="Gender"
                    value={gender}
                    type="gender"
                    onChange={handleOnchangeGender}
                />
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
        marginVertical: 10, // separa cada input/botón
    },
})