import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/auth.store";
import { Loader } from "./components/Loader";

// Import Pages
import { LandingPage } from "./pages/LandingPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectCanvasPage } from "./pages/ProjectCanvasPage";
import { CreditsPage } from "./pages/CreditsPage";

// Protected Route Interceptor Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <Loader fullScreen message="Syncing security session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

// Public Route Interceptor Guard (e.g. login/signup)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <Loader fullScreen message="Loading page context..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { initialize } = useAuthStore();

  // Validate active HTTP-only cookie on start
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <Routes>
        {/* Public Landing Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Authentication Gates */}
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard/Canvas Views */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectCanvasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/credits"
          element={
            <ProtectedRoute>
              <CreditsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
