import type React from "react";
import { useState } from "react";
import { useAuth } from "~/src/hooks/useAuth";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  BackgroundAnimations,
  Copyright,
  ErrorMessage,
  LoginForm,
  LoginHeader,
} from "~/src/components/pages/auth/login";

import Loading from "~/src/components/layout/loading/AuthLoads";

const LoginPage = () => {
  const { login, error, isInitialized } = useAuth();
  const router = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
   
  
  if (!isInitialized) {
    return (
      <Loading />
    );
  }
  
  const handleLogin = async () => {
    if (!email || !password) {
      return; // Validação básica
    }

    try {
      setIsLoading(true);
      await login({ email, senha: password });
      // Redireciona após login bem-sucedido
      router("/dashboard");
    } catch (err) {
      // O erro já é tratado pelo hook useAuth
      console.error("Erro no login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundAnimations />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg relative z-10"
      >
        <div className="border border-black/20 bg-white relative">
          <motion.div
            className="absolute top-0 left-0 h-[1px] bg-black"
            variants={lineVariants}
          />

          <div className="p-8 md:p-12">
            <LoginHeader itemVariants={itemVariants} />
            <ErrorMessage error={error} />
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              isLoading={isLoading}
              handleLogin={handleLogin}
              handleKeyDown={handleKeyDown}
              itemVariants={itemVariants}
            />
          </div>

          <motion.div
            className="absolute bottom-0 right-0 h-[1px] bg-black"
            variants={lineVariants}
          />
        </div>

        <Copyright itemVariants={itemVariants} />
      </motion.div>
    </div>
  );
};

export default LoginPage;
