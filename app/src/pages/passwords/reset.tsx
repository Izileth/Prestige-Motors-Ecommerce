import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { Lock, Eye, EyeOff, CheckCircle, Shield, ArrowLeft, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router"

import { useSearchParams } from "react-router"

const ResetPasswordContent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [passwordStrength, setPasswordStrength] = useState(0)

    // Check if token is valid on mount
    useEffect(() => {
        if (!token) {
        setError("Invalid or missing reset token")
        }
    }, [token])

    // Calculate password strength
    useEffect(() => {
        if (!password) {
        setPasswordStrength(0)
        return
        }

        let strength = 0
        if (password.length >= 6) strength += 25
        if (password.length >= 8) strength += 25
        if (/[A-Z]/.test(password)) strength += 25
        if (/[0-9]/.test(password)) strength += 25

        setPasswordStrength(strength)
    }, [password])

    const handleReset = async () => {
        if (!token) {
        setError("Invalid reset token")
        return
        }

        if (!password || !confirmPassword) {
        setError("Please fill in all fields")
        return
        }

        if (password.length < 6) {
        setError("Password must be at least 6 characters")
        return
        }

        if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
        }

        setIsLoading(true)
        setError(null)

        // Simulate API call
        setTimeout(() => {
        setIsLoading(false)
        setIsSuccess(true)
        }, 2000)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
        handleReset()
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.1,
        },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    const lineVariants = {
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, transition: { duration: 0.3, ease: "easeOut" } },
    }

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
    }

    const getStrengthColor = () => {
        if (passwordStrength <= 25) return "bg-red-500"
        if (passwordStrength <= 50) return "bg-yellow-500"
        if (passwordStrength <= 75) return "bg-blue-500"
        return "bg-green-500"
    }

    const getStrengthText = () => {
        if (passwordStrength <= 25) return "Weak"
        if (passwordStrength <= 50) return "Fair"
        if (passwordStrength <= 75) return "Good"
        return "Strong"
    }

    if (isSuccess) {
        return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-[0.02]">
            <div
                className="absolute inset-0"
                style={{
                backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                                linear-gradient(to bottom, #000 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
                }}
            />
            </div>

            <motion.div
            variants={successVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md relative z-10"
            >
            <div className="border border-black/20 bg-white relative">
                <motion.div className="absolute top-0 left-0 h-[1px] bg-black" variants={lineVariants} />

                <div className="p-8 md:p-12">
                {/* Success header */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 border border-black/20 mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    >
                    <CheckCircle className="w-8 h-8" />
                    </motion.div>

                    <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-black mb-3 uppercase">
                        Redefinir Senha
                    </h1>
                    <div className="w-20 h-[1px] bg-black mx-auto mb-4" />
                    <p className="text-sm text-black/60 font-light tracking-wide">
                    Sua senha foi atualizada com sucesso
                    </p>
                </motion.div>

                {/* Success message */}
                <motion.div variants={itemVariants} className="mb-8">
                    <div className="text-center space-y-4">
                    <p className="text-sm text-black/80 font-light leading-relaxed">
                        Você pode agora entrar com sua nova senha. Por razões de segurança, você precisará fazer login novamente.
                    </p>
                    <div className="pt-4 border-t border-black/10">
                        <p className="text-xs text-black/60 font-light">
                        Mantenha sua senha segura e não a compartilhe com ninguém
                        </p>
                    </div>
                    </div>
                </motion.div>

                {/* Continue button */}
                <motion.div variants={itemVariants} className="mb-6">
                    <Link to="/login">
                    <motion.button
                        className="group relative w-full bg-black text-white py-4 px-6 font-light tracking-wide uppercase text-sm transition-all duration-300 hover:bg-black/90 overflow-hidden"
                        whileHover={{ y: -1 }}
                        whileTap={{ y: 0 }}
                    >
                        <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                        />
                        <span className="relative z-10">Continue para o Login</span>
                    </motion.button>
                    </Link>
                </motion.div>
                </div>

                <motion.div className="absolute bottom-0 right-0 h-[1px] bg-black" variants={lineVariants} />
            </div>

            {/* Copyright notice */}
            <motion.div
                variants={itemVariants}
                className="text-center mt-8 text-xs text-black/40 font-light tracking-wide"
            >
                <div className="flex items-center justify-center space-x-4">
                <div className="w-8 h-[1px] bg-black/20" />
                <span>© {new Date().getFullYear()} Todos os direitos reservados</span>
                <div className="w-8 h-[1px] bg-black/20" />
                </div>
            </motion.div>
            </motion.div>
        </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.02]">
            <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                            linear-gradient(to bottom, #000 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
            }}
            />
        </div>

        {/* Floating geometric elements */}
        <motion.div
            className="absolute top-32 left-16 w-1 h-32 bg-black opacity-5"
            animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
            }}
            transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            }}
        />
        <motion.div
            className="absolute bottom-40 right-20 w-24 h-1 bg-black opacity-5"
            animate={{
            rotate: [0, -90, -180, -270, -360],
            scale: [1, 1.2, 1],
            }}
            transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            }}
        />

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md relative z-10"
        >
            <div className="border border-black/20 bg-white relative">
            <motion.div className="absolute top-0 left-0 h-[1px] bg-black" variants={lineVariants} />

            <div className="p-8 md:p-12">
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 border border-black/20 mb-6"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                >
                    <Shield className="w-5 h-5" />
                </motion.div>

                <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-black mb-3 uppercase">
                    Redefinição de Senha
                </h1>
                <div className="w-16 h-[1px] bg-black mx-auto mb-4" />
                <p className="text-sm text-black/60 font-light tracking-wide">Crie sua nova senha segura</p>
                </motion.div>

                {/* Error message */}
                <AnimatePresence>
                {error && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 border border-black/20 bg-black/5"
                    >
                    <div className="p-4 flex items-start">
                        <AlertTriangle className="h-4 w-4 text-black mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-black/80 font-light">{error}</p>
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* Form fields */}
                <motion.div variants={itemVariants} className="space-y-6 mb-8">
                {/* New password field */}
                <div className="relative group">
                    <div className="relative">
                    <Lock
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                        focusedField === "password" ? "text-black" : "text-black/40"
                        }`}
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                        setPassword(e.target.value)
                        setError(null)
                        }}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-0 border-b border-black/20 pl-6 pr-8 py-4 text-black placeholder-black/40 focus:border-black focus:outline-none transition-colors duration-300 font-light"
                        placeholder="New password (min. 6 characters)"
                        required
                        minLength={6}
                    />
                    <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </motion.button>
                    </div>
                    <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === "password" ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    />

                    {/* Password strength indicator */}
                    <AnimatePresence>
                    {password && (
                        <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2"
                        >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-black/60 font-light">Força da senha</span>
                            <span className="text-xs text-black/60 font-light">{getStrengthText()}</span>
                        </div>
                        <div className="h-1 bg-black/10 relative overflow-hidden">
                            <motion.div
                            className={`absolute left-0 top-0 h-full ${getStrengthColor()} origin-left`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: passwordStrength / 100 }}
                            transition={{ duration: 0.3 }}
                            />
                        </div>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>

                {/* Confirm password field */}
                <div className="relative group">
                    <div className="relative">
                    <Lock
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                        focusedField === "confirmPassword" ? "text-black" : "text-black/40"
                        }`}
                    />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        setError(null)
                        }}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField(null)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-0 border-b border-black/20 pl-6 pr-8 py-4 text-black placeholder-black/40 focus:border-black focus:outline-none transition-colors duration-300 font-light"
                        placeholder="Confirm new password"
                        required
                        minLength={6}
                    />
                    <motion.button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </motion.button>
                    </div>
                    <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === "confirmPassword" ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    />

                    {/* Password match indicator */}
                    <AnimatePresence>
                    {confirmPassword && (
                        <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2"
                        >
                        <div className="flex items-center">
                            <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                                password === confirmPassword ? "bg-green-500" : "bg-red-500"
                            }`}
                            />
                            <span className="text-xs text-black/60 font-light">
                            {password === confirmPassword ? "Passwords match" : "Passwords don't match"}
                            </span>
                        </div>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
                </motion.div>

                {/* Reset button */}
                <motion.div variants={itemVariants} className="mb-6">
                <motion.button
                    onClick={handleReset}
                    disabled={isLoading || !password || !confirmPassword || password !== confirmPassword || !token}
                    className="group relative w-full bg-black text-white py-4 px-6 font-light tracking-wide uppercase text-sm transition-all duration-300 hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                >
                    <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                    />

                    <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                        <>
                        <motion.div
                            className="w-4 h-4 border border-white/30 border-t-white rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        Atualizando Senha...
                        </>
                    ) : (
                        "Redefinir Senha"
                    )}
                    </span>
                </motion.button>
                </motion.div>

                {/* Back to login link */}
                <motion.div variants={itemVariants} className="text-center">
                <motion.div whileHover={{ x: -2 }}>
                    <Link
                    to="/login"
                    className="inline-flex items-center text-sm text-black/60 font-light hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black/20"
                    >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to sign in
                    </Link>
                </motion.div>
                </motion.div>
            </div>

            <motion.div className="absolute bottom-0 right-0 h-[1px] bg-black" variants={lineVariants} />
            </div>

            {/* Copyright notice */}
            <motion.div variants={itemVariants} className="text-center mt-8 text-xs text-black/40 font-light tracking-wide">
            <div className="flex items-center justify-center space-x-4">
                <div className="w-8 h-[1px] bg-black/20" />
                <span>© {new Date().getFullYear()} All rights reserved</span>
                <div className="w-8 h-[1px] bg-black/20" />
            </div>
            </motion.div>
        </motion.div>
        </div>
    )
}

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
    )
}

export default ResetPasswordPage
