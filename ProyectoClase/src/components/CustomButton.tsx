import React from "react";
import { TouchableOpacity , Text, StyleSheet} from "react-native";


type Props={
    title:string;
    onPress: () => void;
    variant?:'primary' |'secondary' | 'tertiary';
}
//componentes con props
export default function CustomButton({title, onPress, variant ='primary'}:Props){
    return(
    <TouchableOpacity onPress={onPress}>
        <Text>{title} </Text>
    </TouchableOpacity>
  );
}
//funcion con parametros para generar estilo
const getStyles =(variant:'primary' |'secondary' | 'tertiary')=>{

    StyleSheet.create({
        button:{
            padding: 12,
            margin: 10,
            borderRadius:5,
            backgroundColor:
            variant==='primary' ? '#1c1c30' : 
            variant==='secondary' ? '#65659c' :
            '#dfdff7',
            borderWidth: variant=== 'tertiary'? 1:0,
            borderColor: "#ccc"
        },
        text:{
            color: variant=== "primary" || variant ==="secondary" ? '#ededf7':'#010117',
            fontWeight: 'bold',
        },
    } )


}