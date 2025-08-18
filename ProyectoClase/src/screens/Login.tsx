
import { View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
export default function Login (){

    const [email, setemail] = useState("")
    return(
        <View>
        <CustomButton title="Iniciar Sesion"
        onPress={()=>{}}/>
        <CustomInput title = "Email"
        value={email}
        type="email"
        onChange={setemail}/>
        
        <CustomButton title= "Registrarme" 
        onPress ={()=>{}}variant={'secondary'}/>
        <CustomInput title = "Registra tu email"
        value="" 
        type="email"
        onChange={()=>{}}/>
        <CustomButton title= "Cambiar contraseña" 
        onPress ={()=>{}}variant={'tertiary'}/>
        </View>
    );
}