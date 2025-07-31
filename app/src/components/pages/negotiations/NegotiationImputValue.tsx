import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../../ui/input';
import { MoneyUtils } from '~/src/utils/money';

interface MoneyInputProps {
    value: number; // sempre em centavos
    onChange: (cents: number) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    error?: string;
    maxValue?: number; // em centavos
    autoFocus?: boolean;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
    value,
    onChange,
    placeholder = "0,00",
    disabled = false,
    className = "",
    id,
    error,
    maxValue,
    autoFocus = false
}) => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const lastValueRef = useRef(value);

    // Sincroniza o valor interno quando o valor externo muda
    // Mas só se não estiver focado (para não interferir durante a digitação)
    useEffect(() => {
        if (!isFocused && value !== lastValueRef.current) {
            const formatted = value > 0 ? MoneyUtils.formatCents(value) : '';
            setDisplayValue(formatted);
            lastValueRef.current = value;
        }
    }, [value, isFocused]);

    // Auto focus se solicitado
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        
        // Se o usuário apagou tudo, permite campo vazio
        if (inputValue === '') {
            setDisplayValue('');
            onChange(0);
            return;
        }

        // Remove caracteres inválidos (mantém apenas números, vírgula e ponto)
        const cleanInput = inputValue.replace(/[^\d.,]/g, '');
        
        // Aplica máscara de dinheiro
        const maskedValue = MoneyUtils.applyMoneyMask(cleanInput);
        setDisplayValue(maskedValue);
        
        // Converte para centavos
        const cents = MoneyUtils.stringToCents(maskedValue);
        
        // Valida valor máximo se definido
        if (maxValue && cents > maxValue) {
            // Reverte para o valor anterior se exceder o máximo
            const maxFormatted = MoneyUtils.formatCents(maxValue);
            setDisplayValue(maxFormatted);
            onChange(maxValue);
            return;
        }
        
        // Notifica mudança
        onChange(cents);
        lastValueRef.current = cents;
    };

    const handleFocus = () => {
        setIsFocused(true);
        // Se o valor é 0 e o campo está vazio, limpa para facilitar digitação
        if (value === 0 && displayValue === '') {
            setDisplayValue('');
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        // Se saiu do foco e o campo está vazio, mostra 0,00 se o valor for 0
        if (displayValue === '' && value === 0) {
            setDisplayValue('0,00');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Permite: backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
            // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true) ||
            // Permite: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        
        // Bloqueia se não for número, vírgula ou ponto
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && 
            (e.keyCode < 96 || e.keyCode > 105) && 
            e.keyCode !== 188 && e.keyCode !== 190) {
            e.preventDefault();
        }
    };

    return (
        <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground z-10 pointer-events-none">
                R$
            </span>
            <Input
                ref={inputRef}
                id={id}
                type="text"
                value={displayValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`pl-10 text-right ${className} ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete="off"
                inputMode="numeric"
            />
            {error && (
                <p className="text-sm text-red-600 mt-1 flex items-start">
                    <span className="mt-0.5 mr-1">⚠️</span>
                    {error}
                </p>
            )}
            {maxValue && (
                <p className="text-xs text-gray-500 mt-1">
                    Valor máximo: {MoneyUtils.formatCentsWithSymbol(maxValue)}
                </p>
            )}
        </div>
    );
};