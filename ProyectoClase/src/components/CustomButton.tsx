import React from "react";
import { TouchableOpacity , Text, StyleSheet} from "react-native";


type Props={
    title:string;
    onPress: () => void;
    variant?:'primary' |'secondary' | 'tertiary';
}
//componentes con props
export default function CustomButton({title, onPress, variant ='primary'}:Props){
    const styles =getStyles(variant);
    return(
    <TouchableOpacity onPress={onPress} style={styles.button} >
        <Text style={styles.text}>{title} </Text>
    </TouchableOpacity>
  );
}
//funcion con parametros para generar estilo
const getStyles =(variant:'primary' |'secondary' | 'tertiary')=>{

    return StyleSheet.create({
        button:{
            padding: 12,
            margin: 10,
            borderRadius:5,
            backgroundColor:
            variant==='primary' ? '#5a5ad1ff' : 
            variant==='secondary' ? '#6587aeff' :
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