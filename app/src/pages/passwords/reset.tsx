import type React from "react";
import { useState, useEffect, Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router"; // ou useParams do Remix se usando Remix
import {
  BackgroundAnimations,
  Copyright,
  ErrorMessage,
  ResetForm,
  ResetHeader,
  SuccessMessage,
} from "~/src/components/pages/passwords/reset";
import { useAuth } from "~/src/hooks/useAuth";

const ResetPasswordContent = () => {
  // Pegar o token dos parâmetros da URL
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  // Estados locais do componente
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [localError, setLocalError] = useState<string | null>(null);

  // Estados do hook de autenticação
  const {
    resetPasswordState,
    confirmPasswordReset,
    clearPasswordResetStatus,
    isInitialized
  } = useAuth();

  // Derivar estados do hook
  const isLoading = resetPasswordState?.status === 'loading';
  const hookError = resetPasswordState?.error || null;
  const isSuccess = resetPasswordState?.status === 'succeeded';

  // Combinar erros
  const error = localError || hookError;

  // Validar formato do token
  const validateTokenFormat = useCallback((token: string | undefined): boolean => {
    if (!token) return false;
    
    // Token deve ter 64 caracteres hexadecimais (baseado no seu exemplo)
    const tokenRegex = /^[a-f0-9]{64}$/i;
    return tokenRegex.test(token);
  }, []);

  // Validar token na inicialização
  useEffect(() => {
    if (!token) {
      setLocalError("Reset link is invalid or has been corrupted");
      return;
    }

    if (!validateTokenFormat(token)) {
      setLocalError("Invalid reset token format");
      return;
    }

    // Token válido, limpar erros
    setLocalError(null);
  }, [token, validateTokenFormat]);

  // Calcular força da senha
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;

    setPasswordStrength(strength);
  }, [password]);

  // Limpar estados quando o componente é desmontado
  useEffect(() => {
    return () => {
      clearPasswordResetStatus();
    };
  }, [clearPasswordResetStatus]);

  // Função de validação local
  const validateInputs = useCallback((): string | null => {
    if (!token || !validateTokenFormat(token)) {
      return "Invalid reset token";
    }

    if (!password || !confirmPassword) {
      return "Please fill in all fields";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }

    return null;
  }, [token, password, confirmPassword, validateTokenFormat]);

  const handleReset = async () => {
    // Limpar erros anteriores
    setLocalError(null);
    clearPasswordResetStatus();

    // Validar inputs localmente primeiro
    const validationError = validateInputs();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    try {
      await confirmPasswordReset({
        token: token!,
        password,
        confirmPassword,
      });
      console.log("Password reset successful");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      
      // Tratar erros específicos do backend
      if (error?.message?.includes('TOKEN_EXPIRED') || error?.message?.includes('expired')) {
        setLocalError("This reset link has expired. Please request a new one.");
      } else if (error?.message?.includes('TOKEN_INVALID') || error?.message?.includes('invalid')) {
        setLocalError("This reset link is invalid. Please request a new one.");
      }
      // Outros erros serão tratados pelo hook automaticamente
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleReset();
    }
  };

  // Limpar erro local quando os campos mudam
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (localError) {
      setLocalError(null);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (localError) {
      setLocalError(null);
    }
  };

  // Redirecionar para página de solicitar reset se não tem token válido
  const handleRequestNewReset = () => {
    navigate("/passwords/forgot");
  };

  // Variantes de animação
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

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  // Aguardar inicialização do hook
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    );
  }

  // Renderizar tela de erro para token inválido
  if (!token || !validateTokenFormat(token)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
        <BackgroundAnimations />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md relative z-10 text-center"
        >
          <div className="border border-red-200 bg-white relative p-8 md:p-12">
            <h1 className="text-2xl font-light mb-4 text-red-600">Invalid Reset Link</h1>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <button
              onClick={handleRequestNewReset}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Request New Reset Link
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Renderizar tela de sucesso
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
        <BackgroundAnimations />
        <motion.div
          variants={successVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md relative z-10"
        >
          <SuccessMessage
            itemVariants={itemVariants}
            lineVariants={lineVariants}
          />
          <Copyright itemVariants={itemVariants} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundAnimations />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <div className="border border-black/20 bg-white relative">
          <motion.div
            className="absolute top-0 left-0 h-[1px] bg-black"
            variants={lineVariants}
          />

          <div className="p-8 md:p-12">
            <ResetHeader itemVariants={itemVariants} />
            <ErrorMessage error={error} />
            <ResetForm
              password={password}
              setPassword={handlePasswordChange}
              confirmPassword={confirmPassword}
              setConfirmPassword={handleConfirmPasswordChange}
              error={error}
              setError={() => {}}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              passwordStrength={passwordStrength}
              handleKeyDown={handleKeyDown}
              isLoading={isLoading}
              handleReset={handleReset}
              token={token}
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

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;