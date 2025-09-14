import { createContext, useContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import React from "react";

type User = {
  email: string;
} | null;

const AuthContext = createContext<{
  user: User;
  isAllowed: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  // 🔹 Login
  const login = async (email: string, password: string) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      setUser({ email: response.user.email! });
      setIsAllowed(true);
    } catch (error: any) {
      console.error("Error en login:", error.code);
      throw error;
    }
  };

  // 🔹 Registro
  const register = async (email: string, password: string) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(email, password);
      setUser({ email: response.user.email! });
      setIsAllowed(true);
    } catch (error: any) {
      console.error("Error en registro:", error.code);
      throw error;
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await auth().signOut();
      setUser(null);
      setIsAllowed(false);
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAllowed, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
