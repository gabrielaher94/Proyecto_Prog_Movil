
import { View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
export default function Login (){

    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    return(
        <View>
        <CustomInput title = "Email"
        value={email}
        type="email"
        onChange={setemail}/>
        <CustomInput title = "Password"
        value={password}
        type="password"
        onChange={setPassword}/>
        <CustomButton title="Iniciar Sesion"
        onPress={()=>{}}/>
        <CustomButton title= "Registrarme" 
        onPress ={()=>{}}variant={'secondary'}/>
        <CustomButton title= "Cambiar contraseña" 
        onPress ={()=>{}}variant={'tertiary'}/>
        </View>
    );
}