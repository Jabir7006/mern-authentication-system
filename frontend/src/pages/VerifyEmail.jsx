/* eslint-disable no-unused-vars */

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { CheckCircle } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

export default function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const { user, verifyEmail, isLoading, error } = useAuthStore();

  // Focus the first input on page load
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste event
      const pastedValue = value.slice(0, 6);
      const newVerificationCode = [...verificationCode];

      for (let i = 0; i < pastedValue.length; i++) {
        if (i + index < 6) {
          newVerificationCode[i + index] = pastedValue[i];
        }
      }

      setVerificationCode(newVerificationCode);

      // Focus the appropriate input after paste
      const nextIndex = Math.min(index + pastedValue.length, 5);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
        setFocusedInput(nextIndex);
      }
    } else {
      // Handle single character input
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      // Auto-focus next input with animation
      if (value && index < 5) {
        if (inputRefs.current[index + 1]) {
          // Add a small delay to make the animation more noticeable
          setTimeout(() => {
            inputRefs.current[index + 1]?.focus();
            setFocusedInput(index + 1);
          }, 10);
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      // Move to previous input when backspace is pressed on an empty input
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
        setFocusedInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move to previous input with left arrow
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
        setFocusedInput(index - 1);
      }
    } else if (e.key === "ArrowRight" && index < 5) {
      // Move to next input with right arrow
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
        setFocusedInput(index + 1);
      }
    }
  };

  const handleSubmit = async () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      await verifyEmail(code);
    }
  };

  if (user?.verified) {
    return (
      <div className="flex min-h-screen bg-white items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle className="w-24 h-24 text-green-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Verification Successful!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 mb-8"
          >
            Your email has been verified. You can now continue to your account.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link to="/">
              <Button className="px-8 py-6 text-base font-medium bg-blue-500 hover:bg-blue-600">
                CONTINUE
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white items-center justify-center p-6">
      <div className="max-w-md w-full mx-auto text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-6 relative"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-blue-100 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-0 w-full h-1/2 bg-blue-500 rounded-b-full"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div
                className="bg-white p-2 rounded-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.8,
                }}
              >
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <motion.svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-2xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            One more step!
          </motion.h1>
          <motion.p
            className="text-gray-600 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A verification code has been sent to
          </motion.p>
          <motion.p
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            your email at <span className="text-blue-500">{user?.email}</span>
          </motion.p>
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Please enter the code to continue.
          </motion.p>
        </motion.div>

        {/* Verification code inputs */}
        <motion.div
          className="flex justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {verificationCode.map((digit, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ scale: 1 }}
                whileFocus={{ scale: 1.05 }}
                animate={
                  inputRefs.current[index] === document.activeElement
                    ? {
                        scale: 1.05,
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                        borderColor: "rgba(59, 130, 246, 1)",
                        borderRadius: "8px",
                      }
                    : {
                        scale: digit ? 1.02 : 1,
                        boxShadow: "0 0 0 0px rgba(59, 130, 246, 0)",
                        borderColor: digit
                          ? "rgba(59, 130, 246, 0.5)"
                          : "rgba(229, 231, 235, 1)",
                      }
                }
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative"
              >
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    handleInputChange(index, e.target.value);
                    // Add animation when a digit is entered
                    if (e.target.value && !digit) {
                      const element = inputRefs.current[index];
                      if (element) {
                        // Create a ripple effect
                        const ripple = document.createElement("span");
                        ripple.style.position = "absolute";
                        ripple.style.borderRadius = "50%";
                        ripple.style.backgroundColor =
                          "rgba(59, 130, 246, 0.2)";
                        ripple.style.width = "100%";
                        ripple.style.height = "100%";
                        ripple.style.transform = "scale(0)";
                        ripple.style.left = "0";
                        ripple.style.top = "0";
                        ripple.style.pointerEvents = "none";
                        ripple.style.transition =
                          "transform 0.4s ease-out, opacity 0.4s ease-out";

                        element.parentNode?.appendChild(ripple);

                        setTimeout(() => {
                          ripple.style.transform = "scale(1.2)";
                          ripple.style.opacity = "0";
                        }, 0);

                        setTimeout(() => {
                          ripple.remove();
                        }, 400);
                      }
                    }
                  }}
                  onFocus={(e) => {
                    // Force re-render to trigger animation
                    setVerificationCode([...verificationCode]);
                  }}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-bold bg-gray-100 border border-gray-200 rounded-md focus:outline-none z-10 relative"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="px-8 py-6 text-base font-medium"
              onClick={() => window.history.back()}
            >
              CANCEL
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="px-8 py-6 text-base font-medium bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isLoading || verificationCode.join("").length !== 6}
            >
              {isLoading ? "Verifying..." : "SUBMIT"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
