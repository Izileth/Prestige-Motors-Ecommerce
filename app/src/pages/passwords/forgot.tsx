import type React from "react";
import { useState } from "react";
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


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);


    const handleRecover = async () => {
        if (!email) {
        setError("Please enter your email address");
        return;
        }

        if (!/^[^S@]+@[^S@]+\.[^S@]+$/.test(email)) {
        setError("Please enter a valid email address");
        return;
        }

        setIsLoading(true);
        setError(null);

        // Simulate API call
        setTimeout(() => {
        setIsLoading(false);
        setIsSent(true);
        }, 2000);
    };

    const handleTryAgain = () => {
        setEmail("");
        setIsSent(false);
        setError(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
        handleRecover();
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
                    <ErrorMessage error={error} />
                    <ForgotForm
                    email={email}
                    setEmail={setEmail}
                    error={error}
                    setError={setError}
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