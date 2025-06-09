import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);
  const ProtectedRoutes = () => {
    const { user, isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (!user.verified) {
      return <Navigate to="/verify-email" replace />;
    }
    return <Outlet />;
  };
  const RedirectIfAuthenticated = () => {
    const { user, isAuthenticated } = useAuthStore();
    if (isAuthenticated && !user.verified) {
      return <Navigate to="/verify-email" replace />;
    }
    if (isAuthenticated && user.verified) {
      return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
  };

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<RedirectIfAuthenticated />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
