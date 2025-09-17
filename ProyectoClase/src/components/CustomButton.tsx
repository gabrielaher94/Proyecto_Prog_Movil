import React from "react";
import { TouchableOpacity , Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
};

export default function CustomButton({ title, onPress, variant = "primary" }: Props) {
  const styles = getStyles(variant);
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (variant: "primary" | "secondary" | "tertiary") => {
  return StyleSheet.create({
    button: {
      padding: 14,
      marginVertical: 8,
      borderRadius: 8,
      width: "100%", // 👈 hace que el botón ocupe todo el ancho del contenedor
      backgroundColor:
        variant === "primary"
          ? "#080808ff"
          : variant === "secondary"
          ? "#6587aeff"
          : "#dfdff7",
      borderWidth: variant === "tertiary" ? 1 : 0,
      borderColor: "#ccc",

      // 👇 centrado de texto
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color:
        variant === "primary" || variant === "secondary"
          ? "#ededf7"
          : "#010117",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
    },
  });
};
