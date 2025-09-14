    import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
    import AsyncStorage from "@react-native-async-storage/async-storage";
    import { Appearance } from "react-native";

    type ThemeType = "light" | "dark" | "auto";

    interface ThemeContextProps {
    theme: ThemeType;
    isDark: boolean;
    setTheme: (theme: ThemeType) => void;
    }

    const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

    export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme debe usarse dentro de un ThemeProvider");
    }
    return context;
    };

    interface ThemeProviderProps {
    children: ReactNode;
    }

    export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setThemeState] = useState<ThemeType>("auto");
    const [isDark, setIsDark] = useState(false);

    // Guardar tema en AsyncStorage
    const setTheme = async (newTheme: ThemeType) => {
        try {
        await AsyncStorage.setItem("appTheme", newTheme);
        setThemeState(newTheme);
        } catch (e) {
        console.log("Error guardando tema:", e);
        }
    };

    // Cargar tema desde AsyncStorage
    useEffect(() => {
        const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem("appTheme") as ThemeType | null;
            if (savedTheme) {
            setThemeState(savedTheme);
            }
        } catch (e) {
            console.log("Error cargando tema:", e);
        }
        };
        loadTheme();
    }, []);

    // Actualizar isDark cuando cambia theme
    useEffect(() => {
        const updateIsDark = () => {
        if (theme === "auto") {
            const colorScheme = Appearance.getColorScheme();
            setIsDark(colorScheme === "dark");
        } else {
            setIsDark(theme === "dark");
        }
        };

        updateIsDark();

        if (theme === "auto") {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setIsDark(colorScheme === "dark");
        });
        return () => subscription.remove();
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
        {children}
        </ThemeContext.Provider>
    );
    };