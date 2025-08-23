import { Text, View } from "react-native";

export default function Home({navigation, route}:any){
    const{correo}=route.params;
    

    return(
        <View>
            <Text> Hola {correo} Estas en la pantalla de Home</Text>
        </View>
    )
}