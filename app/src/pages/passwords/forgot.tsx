import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BackgroundAnimations,
    Copyright,
    ErrorMessage,
    ForgotForm,
    ForgotHeader,
    SuccessMessage,
    BackToLoginLink,
} from "~/src/components/pages/passwords/forgot";
import { useAuth } from "~/src/hooks/useAuth"; // Ajuste o caminho conforme sua estrutura
import { toast } from "sonner";

const ForgotPasswordPage = () => {
    // Estados locais do componente
    const [email, setEmail] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Estados do hook de autenticação
    const {
        resetPasswordState,
        requestPasswordReset,
        clearPasswordResetStatus,
        isInitialized
    } = useAuth();

    // Derivar estados do hook para usar no componente
    const isLoading = resetPasswordState?.status === 'loading';
    const error = resetPasswordState?.error || null;
    const isSuccess = resetPasswordState?.status === 'succeeded';

    // Efeito para sincronizar o estado de sucesso
    useEffect(() => {
        if (isSuccess) {
            setIsSent(true);
        }
    }, [isSuccess]);

    // Efeito para limpar estados quando o componente é desmontado
    useEffect(() => {
        return () => {
            clearPasswordResetStatus();
        };
    }, [clearPasswordResetStatus]);

    // Função para validar email
    const validateEmail = (email: string): string | null => {
        if (!email.trim()) {
            return "Please enter your email address";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }

        return null;
    };

    const handleRecover = async () => {
        // Limpar erro anterior
        clearPasswordResetStatus();

        // Validar email localmente primeiro
        const validationError = validateEmail(email);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        try {
            await requestPasswordReset(email);
            console.log("Password reset email sent successfully");
        } catch (error) {
            console.error("Error sending password reset email:", error);
        }
    };

    const handleTryAgain = () => {
        setEmail("");
        setIsSent(false);
        clearPasswordResetStatus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !isLoading) {
            handleRecover();
        }
    };

    // Função para determinar o erro a ser exibido
    const getDisplayError = (): string | null => {
        // Primeiro, verificar erros de validação local
        if (email && !isSent) {
            const validationError = validateEmail(email);
            if (validationError && focusedField !== 'email') {
                return validationError;
            }
        }

        // Depois, mostrar erros do hook
        return error;
    };

    // Variantes de animação (mantidas iguais)
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
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            <BackgroundAnimations />

            <AnimatePresence mode="wait">
                {!isSent ? (
                    <motion.div
                        key="form"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-md relative z-10"
                    >
                        <div className="border border-black/20 bg-white relative">
                            <motion.div
                                className="absolute top-0 left-0 h-[1px] bg-black"
                                variants={lineVariants}
                            />
                            <div className="p-8 md:p-12">
                                <ForgotHeader itemVariants={itemVariants} />
                                <ErrorMessage error={getDisplayError()} />
                                <ForgotForm
                                    email={email}
                                    setEmail={setEmail}
                                    error={getDisplayError()}
                                    setError={() => {}} // Não usado mais, controlado pelo hook
                                    focusedField={focusedField}
                                    setFocusedField={setFocusedField}
                                    isLoading={isLoading}
                                    handleRecover={handleRecover}
                                    handleKeyDown={handleKeyDown}
                                    itemVariants={itemVariants}
                                />
                            </div>
                            <motion.div
                                className="absolute bottom-0 right-0 h-[1px] bg-black"
                                variants={lineVariants}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        variants={successVariants}
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
                                <SuccessMessage
                                    email={email}
                                    itemVariants={itemVariants}
                                    handleTryAgain={handleTryAgain}
                                />
                                <BackToLoginLink itemVariants={itemVariants} />
                            </div>
                            <motion.div
                                className="absolute bottom-0 right-0 h-[1px] bg-black"
                                variants={lineVariants}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Copyright />
        </div>
    );
};

export default ForgotPasswordPage;