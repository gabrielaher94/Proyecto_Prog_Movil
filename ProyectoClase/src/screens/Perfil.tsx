import { View, StyleSheet , Text} from "react-native";

export default function Perfil({ route }: any){
    const {id, name, gender, phone, email, password}= route.params;

    

      return (
    <View style={styles.container}>
      <Text>Nombre: {name}</Text>
      <Text>ID: {id}</Text>
      <Text>Teléfono: {phone}</Text>
      <Text>Género: {gender}</Text>
      <Text>Email: {email}</Text>
      <Text>Password: {password}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
