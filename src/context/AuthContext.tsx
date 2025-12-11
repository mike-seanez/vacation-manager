import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AuthAPIDataSource } from "../data/DataSources/Auth/AuthAPIDataSource";
import { useJWT } from "../services/useJWT";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadingAuth: boolean;
  checkAuthFromJWT: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingAuth, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const jwt = await useJWT().getJWT();
      if (jwt) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response: string = await new AuthAPIDataSource().login(
        username,
        password
      );


      setToken(response);
      await useJWT().setJWT(response);
      setError(null);
      setIsAuthenticated(true);
    } catch (err) {
      setError("Login failed");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setToken(null);
    await useJWT().deleteJWT();
    setIsAuthenticated(false);
  };

  const checkAuthFromJWT = async () => {
    const jwt = await useJWT().getJWT();
    if (jwt) {
      setIsAuthenticated(true);
      setToken(jwt);
      return true;
    } else {
      setIsAuthenticated(false);
      setToken(null);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loadingAuth, checkAuthFromJWT }}
    >
      {children}
    </AuthContext.Provider>
  );
};
