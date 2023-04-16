import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  email: null,
  name: null,
  userId: null,
  isExpert: null,
  authenticate: () => {},
  logout: () => {},
});

function AuthcontextProvider({ children }) {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [isExpert, setIsExpert] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
    fetchToken();
  }, []);

  function authenticate(token, userId, isExpert, email, name) {
    setToken(token);
    setUserId(userId);
    setIsExpert(isExpert);
    setEmail(email);
    setName(name);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: token,
    isAuthenticated: !!token,
    userId: userId,
    email: email,
    name: name,
    isExpert: isExpert,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthcontextProvider;
