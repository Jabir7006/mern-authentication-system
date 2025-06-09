import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useParams, useNavigate } from "react-router-dom";

const PasswordResetForm = () => {
  const initialState = {
    password: "",
    confirmPassword: "",
  };
  const { token } = useParams();
  const navigate = useNavigate();

  if (!token) {
    throw new Error("Password reset token is required");
  }

  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordInput, setPasswordInput] = useState(initialState);
  const { resetPassword, isLoading, error } = useAuthStore();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await resetPassword(
      token,
      passwordInput.password,
      passwordInput.confirmPassword
    );
    setIsSuccess(true);
  };

  const handleChange = (e) => {
    setPasswordInput({ ...passwordInput, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <AlertDescription>
                Password reset successful! Redirecting you to login...
              </AlertDescription>
            </Alert>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    className="pr-10"
                    type="password"
                    name="password"
                    value={passwordInput.password}
                    onChange={handleChange}
                    placeholder="Enter your new password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    className="pr-10"
                    type="password"
                    name="confirmPassword"
                    value={passwordInput.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white cursor-pointer ${
                  isLoading || isSuccess
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting Password
                  </>
                ) : (
                  "Reset Password"
                )}
              </motion.button>
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PasswordResetForm;
