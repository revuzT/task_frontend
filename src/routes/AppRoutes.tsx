import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../features/AuthPage";
import { useAuth } from "../context/AuthContext";
import AppSpinner from "../components/AppSpinner";
import Dashboard from "../features/Dashboard";
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  console.log(isAuthenticated);

  if (loading) return <AppSpinner />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />
        }
      />
      <Route
        path="/dashboard"
        element={
          !isAuthenticated ? <Navigate to="/login" replace /> : <Dashboard />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
