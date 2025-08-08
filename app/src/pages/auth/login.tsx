import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, Sparkles } from "lucide-react"
import { useAuth } from "~/src/hooks/useAuth"
import { useNavigate } from "react-router"
import { Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "~/src/components/ui/check-box"
const LoginPage = () => {
        const { login, status, error } = useAuth()
        const router = useNavigate()
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [showPassword, setShowPassword] = useState(false)
        const [rememberMe, setRememberMe] = useState(false)
        const [focusedField, setFocusedField] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
        const handleLogin = async () => {
            if (!email || !password) {
            return // Validação básica
            }

            try {
            await login({ email, senha: password })
            // Redireciona após login bem-sucedido
            router("/dashboard")
            } catch (err) {
            // O erro já é tratado pelo hook useAuth
            console.error("Erro no login:", err)
            }
        }

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
            handleLogin()
            }
        }


        const containerVariants = {
            hidden: { opacity: 0 },
            visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
            }
        }

        const itemVariants = {
            hidden: { opacity: 0, y: 20 },
            visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
            }
        }

        const lineVariants = {
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.3, ease: "easeOut" } }
        }

        
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                            linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
            }} />
        </div>

        {/* Floating geometric elements */}
        <motion.div
            className="absolute top-20 left-20 w-1 h-20 bg-black opacity-10"
            animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
            }}
            transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
            }}
        />
        <motion.div
            className="absolute bottom-32 right-32 w-20 h-1 bg-black opacity-10"
            animate={{
            rotate: [0, -180, -360],
            scale: [1, 1.1, 1]
            }}
            transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
            }}
        />

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-lg relative z-10"
        >
            {/* Main container with thin border */}
            <div className="border border-black/20 bg-white relative">
            {/* Top accent line */}
            <motion.div
                className="absolute top-0 left-0 h-[1px] bg-black"
                variants={lineVariants}
            />
            
            <div className="p-8 md:p-12">
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 border border-black/20 mb-6"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                >
                    <Sparkles className="w-5 h-5" />
                </motion.div>
                
                <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-black mb-3 uppercase">
                    Bem Vindo!
                    </h1>
                <div className="w-12 h-[1px] bg-black mx-auto mb-4" />
                <p className="text-sm text-black/60 font-light tracking-wide">
                    Entre com suas credenciais para continuar
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
                        <AlertCircle className="h-4 w-4 text-black mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-black/80 font-light">{error}</p>
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* Form */}
                <motion.div variants={itemVariants} className="space-y-8">
                {/* Email field */}
                <div className="relative group ">
                    <div className="relative  ">
                    <Mail className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300  ${
                        focusedField === "email" ? "text-black" : "text-black/40"
                    }`} />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-0 border-b border-black/20 pl-6 pr-0 py-4 text-black placeholder-black/40 focus:border-black focus:outline-none transition-colors duration-300 font-light "
                        placeholder="Email address"
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

                {/* Password field */}
                <div className="relative group">
                    <div className="relative">
                    <Lock className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                        focusedField === "password" ? "text-black" : "text-black/40"
                    }`} />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-0 border-b border-black/20 pl-6 pr-8 py-4 text-black placeholder-black/40 focus:border-black focus:outline-none transition-colors duration-300 font-light"
                        placeholder="Password"
                        required
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
                </div>

                {/* Remember me and forgot password */}
                <div className="flex items-center justify-between text-sm">
                    <motion.label
                    className="flex items-center cursor-pointer group"
                    whileHover={{ x: 2 }}
                    >
                    <Checkbox
                        checked={rememberMe}
                        onCheckedChange={(checked) => {
                            if (checked === 'indeterminate') {
                            } else {
                            setRememberMe(checked);
                            }
                        }}
                        className="mr-2 border-black/20 data-[state=checked]:bg-black data-[state=checked]:border-black"
                        />
                    <span className="text-black/60 font-light group-hover:text-black transition-colors duration-300">
                        Remember me
                    </span>
                    </motion.label>

                    <motion.div whileHover={{ x: 2 }}>
                    <Link
                        to="/passwords/forgot"
                        className="text-black/60 font-light hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black/20"
                    >
                        Esqueceu a Senha?
                    </Link>
                    </motion.div>
                </div>

                {/* Sign in button */}
                <motion.div variants={itemVariants}>
                    <motion.button
                    onClick={handleLogin}
                    disabled={isLoading}
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
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Processing...
                        </>
                        ) : (
                        <>
                            Fazer Login
                            <motion.div
                            className="ml-2"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                            >
                            <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </>
                        )}
                    </span>
                    </motion.button>
                </motion.div>

                {/* Sign up link */}
                <motion.div
                    variants={itemVariants}
                    className="text-center pt-6 border-t border-black/10"
                >
                    <p className="text-sm text-black/60 font-light">
                    Ainda Não Tem uma Conta?{" "}
                    <motion.span whileHover={{ x: 2 }} className="inline-block">
                        <Link
                        to="/register"
                        className="text-black font-light border-b border-transparent hover:border-black/20 transition-colors duration-300"
                        >
                        Cadastre-se
                        </Link>
                    </motion.span>
                    </p>
                </motion.div>
                </motion.div>
            </div>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 right-0 h-[1px] bg-black"
                variants={lineVariants}
            />
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

export default LoginPage