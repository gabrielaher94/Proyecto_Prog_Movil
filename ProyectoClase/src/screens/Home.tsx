import { Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Home(){
   
    const{user}=useAuth();

    return(
        <View>
            <Text> Hola {user?.email} Estas en la pantalla de Home</Text>
        </View>
    )
}