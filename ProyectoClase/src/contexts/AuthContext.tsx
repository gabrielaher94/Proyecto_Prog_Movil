import { Children, useState } from "react";
import Login from "../screens/Login";
type user={
    email=string,
} | null;

const AuthContext= createContext<{
    user:{},
    isAllowed:boolean,
    Login:(email: string)=>void,
    logout:()=>void,
    
} | null>(null);

export const AuthProvider=({Children}:{Children: react.ReactNode})=>{
    const{user, serUser}=useState<user>(null);
    const[isAllowed, setisAllowed]=useState<boolean>(false);
    const Login=(user: any)=>(
        setUser(user);
        setisAllowed(true);
    )
}
const logout=()=>{
    setUser(null);
    setisAllowed(false);
}
return (
    <AuthContext.Provider value={{user, isAllowed, login, logout }}></AuthContext.Provider>
)
export const useAuth=()=>{
    const context=useContext(AuthContext);
    if !(context) throw new Error("useAuth debe de usarse dentro de AutheProvider");
    return context;
}