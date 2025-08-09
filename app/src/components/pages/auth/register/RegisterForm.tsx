import {
  User,
  Mail,
  Phone,
  CreditCard,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { FormField } from "./FormField";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";
import { SignInLink } from "./SignInLink";

export const RegisterForm = ({
  formData,
  fieldValidation,
  fieldErrors,
  isLoading,
  handleChange,
  handlePhoneChange,
  handleCPFChange,
  handleDateChange,
  handleRegister,
  handleKeyDown,
  itemVariants,
  reduceMotion,
  focusedField,
  setFocusedField,
}: any) => (
  <motion.div variants={itemVariants} className="space-y-6">
    {/* Seção de campos obrigatórios */}
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
        placeholder="Nome completo"
        ariaLabel="Nome completo"
        required
        value={formData.nome}
        onChange={handleChange}
        isValid={fieldValidation.nome}
        showCheck={formData.nome.trim().length > 0}
        errorMessage={fieldErrors.nome}
        itemVariants={itemVariants}
        reduceMotion={reduceMotion}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        onKeyDown={handleKeyDown}
      />

      <FormField
        icon={Mail}
        name="email"
        type="email"
        placeholder="Email"
        ariaLabel="Endereço de email"
        required
        value={formData.email}
        onChange={handleChange}
        isValid={fieldValidation.email}
        showCheck={
          !!formData.email &&
          fieldValidation.email &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        }
        errorMessage={fieldErrors.email}
        itemVariants={itemVariants}
        reduceMotion={reduceMotion}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        onKeyDown={handleKeyDown}
      />

      <PasswordInput
        value={formData.senha}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        isValid={fieldValidation.senha}
        errorMessage={fieldErrors.senha}
        itemVariants={itemVariants}
        reduceMotion={reduceMotion}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />
    </div>

    {/* Seção de campos opcionais */}
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
        placeholder="Telefone"
        ariaLabel="Número de telefone"
        value={formData.telefone}
        onChange={handlePhoneChange}
        showCheck={!!formData.telefone && formData.telefone.length >= 14}
        itemVariants={itemVariants}
        reduceMotion={reduceMotion}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        onKeyDown={handleKeyDown}
      />

      <FormField
        icon={CreditCard}
        name="cpf"
        placeholder="CPF"
        ariaLabel="Número do CPF"
        value={formData.cpf}
        onChange={handleCPFChange}
        isValid={fieldValidation.cpf}
        showCheck={!!formData.cpf && formData.cpf.length === 14}
        maxLength={14}
        errorMessage={fieldErrors.cpf}
        itemVariants={itemVariants}
        reduceMotion={reduceMotion}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        onKeyDown={handleKeyDown}
      />

      <FormField
        icon={Calendar}
        name="dataNascimento"
        type="text"
        placeholder="Data de nascimento (DD/MM/AAAA)"
        ariaLabel="Data de nascimento"
        value={formData.dataNascimento}
        onChange={handleDateChange}
        showCheck={!!formData.dataNascimento}
        maxLength={10}
        itemVariants={itemVariants}
        reduceMotion={reduceMotion}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        onKeyDown={handleKeyDown}
      />
    </div>

    <SubmitButton
      isLoading={isLoading}
      handleRegister={handleRegister}
      itemVariants={itemVariants}
      reduceMotion={reduceMotion}
    />

    <SignInLink itemVariants={itemVariants} reduceMotion={reduceMotion} />
  </motion.div>
);
