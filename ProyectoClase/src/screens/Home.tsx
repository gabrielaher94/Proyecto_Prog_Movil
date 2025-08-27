import { Text, View, StyleSheet} from "react-native";
import CustomButton from "../components/CustomButton";


export default function Home({navigation, route}:any){
    const{correo}=route.params;
    
    const handleTruck = () => {
    
      navigation.navigate("TruckLocation");
   
  };

    return(
        <View>
            <Text> Bienvenido {correo}</Text>
            <View style={styles.container}>
            <View style={styles.item}>
                    <CustomButton
                      title="Truck Location"
                      onPress={handleTruck}
                      variant="secondary"
                    />
                  </View>
                  </View>
        </View>
    )
    
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    marginVertical: 5,
  },
});