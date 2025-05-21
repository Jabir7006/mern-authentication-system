/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuthStore();

  const isoString = user?.lastLogin || new Date().toISOString();
  const date = new Date(isoString);
  const formatted = date.toISOString().split("T")[0];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Welcome to Our Platform
              </CardTitle>
              <CardDescription>
                Please login or register to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardFooter className="space-x-4">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline">Register</Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Welcome back, {user.name}! 👋
            </CardTitle>
            <CardDescription>
              Your secure authentication dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{user.email}</h3>
                <p className="text-muted-foreground">Authenticated User</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Update Profile</Button>
          </CardFooter>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Security Status</CardTitle>
              <CardDescription>
                Your account is secure and up to date
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Last Login</CardTitle>
              <CardDescription>
                {formatted} at {date.toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
