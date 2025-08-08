import type React from "react";

import { useState, useEffect } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    Calendar,
    CreditCard,
    ArrowRight,
    AlertCircle,
    Check,
    Shield,

} from "lucide-react";
import { useAuth } from "~/src/hooks/useAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateForAPI } from "~/src/utils/format";

export default function RegisterPage() {
    const { register, status, error } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const router = useNavigate();

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        cpf: "",
        dataNascimento: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formProgress, setFormProgress] = useState(0);
    const [fieldValidation, setFieldValidation] = useState({
        nome: true,
        email: true,
        senha: true,
        cpf: true,
    });

    // Calculate form completion progress
    useEffect(() => {
        const requiredFields = ["nome", "email", "senha"];
        const filledRequiredFields = requiredFields.filter((field) =>
        formData[field as keyof typeof formData]?.trim()
        );
        const optionalFields = ["telefone", "cpf", "dataNascimento"];
        const filledOptionalFields = optionalFields.filter((field) =>
        formData[field as keyof typeof formData]?.trim()
        );

        const requiredProgress =
        (filledRequiredFields.length / requiredFields.length) * 70;
        const optionalProgress =
        (filledOptionalFields.length / optionalFields.length) * 30;

        setFormProgress(Math.round(requiredProgress + optionalProgress));
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError(null); // Limpa erros ao digitar

        // Validate fields as user types
        if (name === "email") {
        setFieldValidation((prev) => ({
            ...prev,
            email: !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        }));
        } else if (name === "senha") {
        setFieldValidation((prev) => ({
            ...prev,
            senha: !value.trim() || value.length >= 6,
        }));
        } else if (name === "nome") {
        setFieldValidation((prev) => ({
            ...prev,
            nome: !value.trim() || value.trim().length > 0,
        }));
        }
    };

    const handleRegister = async () => {
        // Validações básicas
        if (!formData.nome.trim()) {
        setFormError("Nome é obrigatório");
        return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setFormError("Por favor, insira um email válido");
        return;
        }

        if (formData.senha.length < 6) {
        setFormError("A senha deve ter pelo menos 6 caracteres");
        return;
        }

        if (formData.cpf && formData.cpf.replace(/\D/g, "").length !== 11) {
        setFormError("CPF deve ter 11 dígitos");
        return;
        }

        try {
        await register({
            nome: formData.nome.trim(),
            email: formData.email.trim().toLowerCase(),
            senha: formData.senha,
            telefone: formData.telefone?.replace(/\D/g, ""),
            cpf: formData.cpf?.replace(/\D/g, ""),
            dataNascimento: formData.dataNascimento
            ? formatDateForAPI(formData.dataNascimento) // 🔧 PADRONIZADO
            : undefined,
        });

        router("/login?registered=true");
        } catch (err) {
        console.error("Erro no registro:", err);
        // Handle error...
        }
    };
    // Formatar CPF
    const formatCPF = (value: string) => {
        if (!value) return value;

        const cpfDigits = value.replace(/\D/g, "");
        if (cpfDigits.length <= 3) return cpfDigits;
        if (cpfDigits.length <= 6)
        return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3)}`;
        if (cpfDigits.length <= 9)
        return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(
            3,
            6
        )}.${cpfDigits.slice(6)}`;
        return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(
        6,
        9
        )}-${cpfDigits.slice(9, 11)}`;
    };

    const validateCPF = (cpf: string) => {
        if (!cpf) return true;
        const cleaned = cpf.replace(/\D/g, "");
        return cleaned.length === 11;
    };

    // Formatar telefone
    const formatPhone = (value: string) => {
        if (!value) return value;

        const phoneDigits = value.replace(/\D/g, "");
        if (phoneDigits.length <= 2) return `(${phoneDigits}`;
        if (phoneDigits.length <= 7)
        return `(${phoneDigits.slice(0, 2)}) ${phoneDigits.slice(2)}`;
        return `(${phoneDigits.slice(0, 2)}) ${phoneDigits.slice(
        2,
        7
        )}-${phoneDigits.slice(7, 11)}`;
    };

    // Handler para CPF formatado
    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCPF = formatCPF(e.target.value);
        setFormData((prev) => ({ ...prev, cpf: formattedCPF }));

        // Validate CPF
        setFieldValidation((prev) => ({
        ...prev,
        cpf: !e.target.value.trim() || validateCPF(e.target.value),
        }));
    };

    // Handler para telefone formatado
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhone(e.target.value);
        setFormData((prev) => ({ ...prev, telefone: formattedPhone }));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
        handleRegister();
        }
    };

    const FormField = ({
        icon: Icon,
        name,
        type = "text",
        placeholder,
        required = false,
        value,
        onChange,
        isValid = true,
        showCheck = false,
        maxLength,
    }: {
        icon: any;
        name: string;
        type?: string;
        placeholder: string;
        required?: boolean;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        isValid?: boolean;
        showCheck?: boolean;
        maxLength?: number;
    }) => (
        <motion.div
        variants={itemVariants}
        className="relative group"
        whileTap={{ scale: 0.998 }}
        >
        <div className="relative">
            <Icon
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                focusedField === name ? "text-black" : "text-black/40"
            }`}
            />
            <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent border-0 border-b pl-6 pr-8 py-4 text-black placeholder-black/40 focus:outline-none transition-all duration-300 font-light ${
                !isValid ? "border-red-500" : "border-black/20 focus:border-black"
            }`}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            />
            {showCheck && (
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 top-1/2 -translate-y-1/2"
            >
                <Check className="w-4 h-4 text-black" />
            </motion.div>
            )}
        </div>
        <motion.div
            className={`absolute bottom-0 left-0 h-[1px] origin-left ${
            !isValid ? "bg-red-500" : "bg-black"
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: focusedField === name ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        />
        </motion.div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.05,
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
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-[0.02]">
            <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                            linear-gradient(to bottom, #000 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
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
            repeat: Infinity,
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
            repeat: Infinity,
            ease: "linear",
            }}
        />

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-lg relative z-10"
        >
            {/* Main container */}
            <div className="border border-black/20 bg-white relative">
            {/* Top accent line */}
            <motion.div
                className="absolute top-0 left-0 h-[1px] bg-black"
                variants={lineVariants}
            />

            <div className="p-8 md:p-12">
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 border border-black/20 mb-6"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                >
                    <Shield className="w-5 h-5" />
                </motion.div>

                <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-black mb-3 uppercase">
                    Cadastre-se
                </h1>
                <div className="w-16 h-[1px] bg-black mx-auto mb-4" />
                <p className="text-sm text-black/60 font-light tracking-wide">
                    Junte-se a nós e comece sua jornada
                </p>
                </motion.div>

                {/* Progress bar */}
                <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-black/60 font-light tracking-wide">
                    PROGRESS
                    </span>
                    <span className="text-xs text-black/60 font-light">
                    {formProgress}%
                    </span>
                </div>
                <div className="relative h-[1px] bg-black/10">
                    <motion.div
                    className="absolute left-0 top-0 h-full bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: formProgress / 100 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>
                </motion.div>

                {/* Error message */}
                <AnimatePresence>
                {formError && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 border border-black/20 bg-black/5"
                    >
                    <div className="p-4 flex items-start">
                        <AlertCircle className="h-4 w-4 text-black mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-black/80 font-light">
                        {formError}
                        </p>
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* Form fields */}
                <motion.div variants={itemVariants} className="space-y-6">
                {/* Required fields section */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-black" />
                    <span className="text-xs text-black/60 font-light tracking-wide uppercase">
                        Informações Obrigatórias
                    </span>
                    <div className="flex-1 h-[1px] bg-black/10" />
                    </div>

                    <FormField
                    icon={User}
                    name="nome"
                    placeholder="Full name"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    isValid={fieldValidation.nome}
                    showCheck={formData.nome.trim().length > 0}
                    />

                    <FormField
                    icon={Mail}
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    isValid={fieldValidation.email}
                    showCheck={
                        !!formData.email &&
                        fieldValidation.email &&
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                    }
                    />

                    <motion.div
                    variants={itemVariants}
                    className="relative group"
                    whileTap={{ scale: 0.998 }}
                    >
                    <div className="relative">
                        <Lock
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                            focusedField === "senha"
                            ? "text-black"
                            : "text-black/40"
                        }`}
                        />
                        <input
                        type={showPassword ? "text" : "password"}
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("senha")}
                        onBlur={() => setFocusedField(null)}
                        onKeyDown={handleKeyDown}
                        className={`w-full bg-transparent border-0 border-b pl-6 pr-16 py-4 text-black placeholder-black/40 focus:outline-none transition-all duration-300 font-light ${
                            !fieldValidation.senha
                            ? "border-red-500"
                            : "border-black/20 focus:border-black"
                        }`}
                        placeholder="Password (min. 6 characters)"
                        required
                        />
                        <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                        </motion.button>
                        {formData.senha && formData.senha.length >= 6 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2"
                        >
                            <Check className="w-4 h-4 text-black" />
                        </motion.div>
                        )}
                    </div>
                    <motion.div
                        className={`absolute bottom-0 left-0 h-[1px] origin-left ${
                        !fieldValidation.senha ? "bg-red-500" : "bg-black"
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === "senha" ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    </motion.div>
                </div>

                {/* Optional fields section */}
                <div className="space-y-6 pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 border border-black/40" />
                    <span className="text-xs text-black/60 font-light tracking-wide uppercase">
                        Informações Opcionais
                    </span>
                    <div className="flex-1 h-[1px] bg-black/10" />
                    </div>

                    <FormField
                    icon={Phone}
                    name="telefone"
                    type="tel"
                    placeholder="Phone number"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    showCheck={
                        !!formData.telefone && formData.telefone.length >= 14
                    }
                    />

                    <FormField
                    icon={CreditCard}
                    name="cpf"
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={handleCPFChange}
                    isValid={fieldValidation.cpf}
                    showCheck={!!formData.cpf && formData.cpf.length === 14}
                    maxLength={14}
                    />

                    <FormField
                    icon={Calendar}
                    name="dataNascimento"
                    type="date"
                    placeholder="Birth date"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    showCheck={!!formData.dataNascimento}
                    />
                </div>

                {/* Create account button */}
                <motion.div variants={itemVariants} className="pt-8">
                    <motion.button
                    onClick={handleRegister}
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
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            />
                            Creating Account...
                        </>
                        ) : (
                        <>
                        Cadastrar
                            <motion.div
                            className="ml-2"
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                            >
                            <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </>
                        )}
                    </span>
                    </motion.button>
                </motion.div>

                {/* Sign in link */}
                <motion.div
                    variants={itemVariants}
                    className="text-center pt-6 border-t border-black/10"
                >
                    <p className="text-sm text-black/60 font-light">
                    Já tem uma conta?{" "}
                    <motion.span whileHover={{ x: 2 }} className="inline-block">
                        <Link
                        to="/login"
                        className="text-black font-light border-b border-transparent hover:border-black/20 transition-colors duration-300"
                        >
                        Fazer login
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
    );
}
