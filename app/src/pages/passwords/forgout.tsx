

import type React from "react"
import { useState } from "react"
import { Mail, ArrowLeft, Send, CheckCircle, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router"

const RecoverPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [isSent, setIsSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleRecover = async () => {
        if (!email) {
        setError("Please enter your email address")
        return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address")
        return
        }

        setIsLoading(true)
        setError(null)

        // Simulate API call
        setTimeout(() => {
        setIsLoading(false)
        setIsSent(true)
        }, 2000)
    }

    const handleTryAgain = () => {
        setEmail("")
        setIsSent(false)
        setError(null)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
        handleRecover()
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
            className="absolute top-24 left-24 w-1 h-24 bg-black opacity-8"
            animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
            }}
            transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            }}
        />
        <motion.div
            className="absolute bottom-32 right-32 w-20 h-1 bg-black opacity-8"
            animate={{
            rotate: [0, -180, -360],
            scale: [1, 1.2, 1],
            }}
            transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            }}
        />

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
                {/* Main container */}
                <div className="border border-black/20 bg-white relative">
                {/* Top accent line */}
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
                    <p className="text-sm text-black/60 font-light tracking-wide">
                        Insira seu email para receber instruções de redefinição
                    </p>
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
                            <div className="w-4 h-4 border border-black/40 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1 h-1 bg-black/60" />
                            </div>
                            <p className="text-sm text-black/80 font-light">{error}</p>
                        </div>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {/* Email input */}
                    <motion.div variants={itemVariants} className="mb-8">
                    <div className="relative group">
                        <div className="relative">
                        <Mail
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                            focusedField === "email" ? "text-black" : "text-black/40"
                            }`}
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                            setEmail(e.target.value)
                            setError(null)
                            }}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent border-0 border-b border-black/20 pl-6 pr-0 py-4 text-black placeholder-black/40 focus:border-black focus:outline-none transition-colors duration-300 font-light"
                            placeholder="Enter your email address"
                            required
                        />
                        </div>
                        <motion.div
                        className="absolute bottom-0 left-0 h-[1px] bg-black origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        />
                    </div>
                    </motion.div>

                    {/* Send button */}
                    <motion.div variants={itemVariants} className="mb-8">
                    <motion.button
                        onClick={handleRecover}
                        disabled={isLoading || !email}
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
                            Enviando...
                            </>
                        ) : (
                            <>
                            Enviar Instruções
                            <motion.div
                                className="ml-2"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                            >
                                <Send className="w-4 h-4" />
                            </motion.div>
                            </>
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
                        Voltar para Login
                        </Link>
                    </motion.div>
                    </motion.div>
                </div>

                {/* Bottom accent line */}
                <motion.div className="absolute bottom-0 right-0 h-[1px] bg-black" variants={lineVariants} />
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
                {/* Success container */}
                <div className="border border-black/20 bg-white relative">
                {/* Top accent line */}
                <motion.div className="absolute top-0 left-0 h-[1px] bg-black" variants={lineVariants} />

                <div className="p-8 md:p-12">
                    {/* Success header */}
                    <motion.div variants={itemVariants} className="text-center mb-12">
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 border border-black/20 mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <CheckCircle className="w-8 h-8" />
                    </motion.div>

                    <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-black mb-3 uppercase">
                        Recuperação de Senha
                    </h1>
                    <div className="w-20 h-[1px] bg-black mx-auto mb-4" />
                    <p className="text-sm text-black/60 font-light tracking-wide">Instruções enviadas com sucesso</p>
                    </motion.div>

                    {/* Success message */}
                    <motion.div variants={itemVariants} className="mb-8">
                    <div className="text-center space-y-4">
                        <p className="text-sm text-black/80 font-light leading-relaxed">
                        Se o Email <span className="font-medium text-black border-b border-black/20">{email}</span> estiver
                        registrado em nosso sistema, você receberá instruções de redefinição de senha em breve.
                        </p>
                        <div className="pt-4 border-t border-black/10">
                        <p className="text-xs text-black/60 font-light">Por favor, verifique sua caixa de entrada e pasta de spam</p>
                        </div>
                    </div>
                    </motion.div>

                    {/* Try again button */}
                    <motion.div variants={itemVariants} className="mb-6">
                    <motion.button
                        onClick={handleTryAgain}
                        className="group relative w-full bg-white text-black py-4 px-6 font-light tracking-wide uppercase text-sm border border-black/20 transition-all duration-300 hover:bg-black/5 overflow-hidden"
                        whileHover={{ y: -1 }}
                        whileTap={{ y: 0 }}
                    >
                        <motion.div
                        className="absolute inset-0 bg-black/5"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                        />

                        <span className="relative z-10">Tente Novamente</span>
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
                        Voltar para Login
                        </Link>
                    </motion.div>
                    </motion.div>
                </div>

                {/* Bottom accent line */}
                <motion.div className="absolute bottom-0 right-0 h-[1px] bg-black" variants={lineVariants} />
                </div>
            </motion.div>
            )}
        </AnimatePresence>

        {/* Copyright notice */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-black/40 font-light tracking-wide"
        >
            <div className="flex items-center justify-center space-x-4">
            <div className="w-8 h-[1px] bg-black/20" />
            <span>© {new Date().getFullYear()} Todos os direitos reservados</span>
            <div className="w-8 h-[1px] bg-black/20" />
            </div>
        </motion.div>
        </div>
    )
}

export default RecoverPasswordPage
