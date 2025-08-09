import { useState, useEffect } from "react";
import { useAuth } from "~/src/hooks/useAuth";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { formatDateForAPI } from "~/src/utils/format";
import {
  BackgroundAnimations,
  Copyright,
  ErrorMessage,
  FormHeader,
  ProgressBar,
  RegisterForm,
} from "~/src/components/pages/auth/register";

import Loading
 from "~/src/components/layout/loading/AuthLoads";
export default function RegisterPage() {
  const { register, isInitialized } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useNavigate();
  const [reduceMotion, setReduceMotion] = useState(false);
   
  if (!isInitialized) {
    return (
      <Loading />
    );
  }
  

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) setReduceMotion(true);

    const handler = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldValidation, setFieldValidation] = useState({
    nome: true,
    email: true,
    senha: true,
    cpf: true,
  });
  const [fieldErrors, setFieldErrors] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
  });

  const containerVariants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.3,
            staggerChildren: 0.02,
          },
        },
      };

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.2, ease: "easeOut" },
        },
      };

  const lineVariants = reduceMotion
    ? { hidden: { scaleX: 1 }, visible: { scaleX: 1 } }
    : {
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, transition: { duration: 0.3, ease: "easeOut" } },
      };

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

    const newProgress = Math.round(requiredProgress + optionalProgress);

    if (newProgress !== formProgress) {
      setFormProgress(newProgress);
    }
  }, [formData, formProgress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "email") {
      // CORREÇÃO: Regex correta para email
      const isValid = !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setFieldValidation((prev) => ({ ...prev, email: isValid }));
      if (!isValid && value.trim()) {
        setFieldErrors((prev) => ({
          ...prev,
          email: "Por favor, insira um email válido",
        }));
      }
    } else if (name === "senha") {
      const isValid = !value.trim() || value.length >= 6;
      setFieldValidation((prev) => ({ ...prev, senha: isValid }));
      if (!isValid && value.trim()) {
        setFieldErrors((prev) => ({
          ...prev,
          senha: "A senha deve ter pelo menos 6 caracteres",
        }));
      }
    } else if (name === "nome") {
      const isValid = !value.trim() || value.trim().length >= 3; // CORREÇÃO: mínimo 3 chars
      setFieldValidation((prev) => ({ ...prev, nome: isValid }));
      if (!isValid && value.trim()) {
        setFieldErrors((prev) => ({ 
          ...prev, 
          nome: "Nome deve ter pelo menos 3 caracteres" 
        }));
      }
    }
  };

  const handleRegister = async () => {
    let hasError = false;
    const newErrors = {
      nome: "",
      email: "",
      senha: "",
      cpf: "",
    };

    // Validação do nome (mínimo 3 caracteres)
    if (!formData.nome.trim() || formData.nome.trim().length < 3) {
      newErrors.nome = "Nome deve ter pelo menos 3 caracteres";
      hasError = true;
    }

    // CORREÇÃO: Validação correta do email
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor, insira um email válido";
      hasError = true;
    }

    // Validação da senha
    if (!formData.senha.trim() || formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
      hasError = true;
    }

    // CORREÇÃO: Validação do CPF apenas se preenchido
    if (formData.cpf && formData.cpf.replace(/\D/g, "").length !== 11) {
      newErrors.cpf = "CPF deve ter 11 dígitos";
      hasError = true;
    }

    setFieldErrors(newErrors);
    setFieldValidation({
      nome: !newErrors.nome,
      email: !newErrors.email,
      senha: !newErrors.senha,
      cpf: !newErrors.cpf,
    });

    if (hasError) {
      return;
    }

    try {
      setIsLoading(true);
      await register({
        nome: formData.nome.trim(),
        email: formData.email.trim().toLowerCase(),
        senha: formData.senha,
        telefone: formData.telefone?.replace(/\D/g, "") || undefined,
        cpf: formData.cpf?.replace(/\D/g, "") || undefined, // CORREÇÃO: undefined em vez de string vazia
        dataNascimento: formData.dataNascimento
          ? formatDateForAPI(formData.dataNascimento)
          : undefined,
      });

      router("/login?registered=true");
    } catch (err) {
      console.error("Erro no registro:", err);
      setFormError(
        "Ocorreu um erro durante o registro. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  
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

  const formatDate = (value: string) => {
    if (!value) return value;
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: formattedCPF }));
    setFormError(null);
    setFieldErrors((prev) => ({ ...prev, cpf: "" }));

    const validateCPF = (cpf: string) => {
      if (!cpf) return true; // Campo opcional
      const cleaned = cpf.replace(/\D/g, "");
      return cleaned.length === 11;
    };

    const isValid = validateCPF(e.target.value);
    setFieldValidation((prev) => ({ ...prev, cpf: isValid }));
    
    if (!isValid && e.target.value.trim()) {
      setFieldErrors((prev) => ({ 
        ...prev, 
        cpf: "CPF deve ter 11 dígitos" 
      }));
    }
  };


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, telefone: formattedPhone }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatDate(e.target.value);
    setFormData((prev) => ({ ...prev, dataNascimento: formattedDate }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <BackgroundAnimations reduceMotion={reduceMotion} />

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

          <div className="p-6 md:p-10">
            <FormHeader
              itemVariants={itemVariants}
              reduceMotion={reduceMotion}
            />
            <ProgressBar
              formProgress={formProgress}
              itemVariants={itemVariants}
            />
            <ErrorMessage formError={formError} />

            <RegisterForm
              formData={formData}
              fieldValidation={fieldValidation}
              fieldErrors={fieldErrors}
              isLoading={isLoading}
              handleChange={handleChange}
              handlePhoneChange={handlePhoneChange}
              handleCPFChange={handleCPFChange}
              handleDateChange={handleDateChange}
              handleRegister={handleRegister}
              handleKeyDown={handleKeyDown}
              itemVariants={itemVariants}
              reduceMotion={reduceMotion}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
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
}