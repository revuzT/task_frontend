import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../services/apiServices";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const email = sessionStorage.getItem("encryptedEmail");

        if (!email) throw new Error("No email in session");

        await getRequest("/auth/validate");
        setIsAuthenticated(true);
      } catch (err) {
        console.warn("Auth validation failed", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  const logout = async () => {
    try {
      await getRequest("/auth/logout");
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      sessionStorage.removeItem("encryptedEmail");
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, logout, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
