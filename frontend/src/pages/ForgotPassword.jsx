import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { forgotPassword, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setSuccessMessage("an email has been sent to reset your password");
  };

  return (
    <div className="flex justify-center items-center h-[90vh] mx-4">
      <Card className="w-full max-w-sm border-blue-500">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Sending reset link..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link to="/login" className="text-sm text-gray-500">
            Back to Login
          </Link>

          {successMessage && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm text-center">
              {successMessage}
            </div>
          )}

          {!isLoading && !error && !successMessage && email && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm text-center">
              If an account exists with that email, you will receive a password
              reset link shortly.
            </div>
          )}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm text-center">
          {error}
        </div>
      )}
        </CardFooter>
      </Card>

    </div>
  );
};

export default ForgotPassword;
