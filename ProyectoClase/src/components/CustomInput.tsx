/* eslint-disable react-native/no-inline-styles */
    import React from "react";
    import { Text, View, TextInput, StyleSheet, KeyboardTypeOptions, TouchableOpacity } from "react-native";
    import Icon from "react-native-vector-icons/MaterialIcons";
    import { useState } from "react";

    type Props = {
    value: string;
    type?: 'name' | 'id' | 'gender' | 'phone' | 'text' | 'password' | 'email' | 'number' | 'numeric';
    onChange: (text: string) => void;
    required?: boolean;
    title: string;
    }

    export default function CustomInput({ value, type = 'text', onChange, title, required }: Props) {

    const isPasswordField = type === 'password';
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const keyboardType: KeyboardTypeOptions =
        type === 'email'
        ? 'email-address'
        : type === 'number'
            ? 'number-pad'
            : type === 'numeric'
            ? 'numeric'
            : 'default';

    const getError = () => {
        if (required && !value) return "Este campo es obligatorio";
        if (type === 'email' && value && !value.includes('@'))
        return "El correo no es válido";
        if (type === 'password' && value && value.length < 6)
        return "La contraseña debe tener al menos 6 caracteres";
    }

    const error = getError();

    // Determinar ícono según tipo de campo
    const getIconName = () => {
        switch (type) {
        case 'email': return 'email';
        case 'password': return 'lock';
        case 'name': return 'person';
        case 'phone': return 'phone';
        default: return 'input';
        }
    }

    return (
        <View style={styles.inputContainer}>
        <Icon name={getIconName()} size={24} color="#888" style={{ marginRight: 8 }} />
        <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder={title}
            value={value}
            onChangeText={onChange}
            secureTextEntry={isPasswordField && !isPasswordVisible}
            keyboardType={keyboardType}
            autoCapitalize="none"
        />

        {isPasswordField && (
            <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Icon
                name={isPasswordVisible ? "visibility-off" : "visibility"}
                size={24}
                color="#888"
            />
            </TouchableOpacity>
        )}

        {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
    }

    const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9',
        marginVertical: 5,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 18,
        color: '#000'
        
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
    });
