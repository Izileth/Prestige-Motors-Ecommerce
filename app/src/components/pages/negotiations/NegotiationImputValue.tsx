
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { MoneyUtils } from '~/src/utils/money';

interface MoneyInputProps {
    value: number; 
    onChange: (cents: number) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    error?: string;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
    value,
    onChange,
    placeholder = "0,00",
    disabled = false,
    className = "",
    id,
    error
    }) => {
    const [displayValue, setDisplayValue] = useState('');

    // Sincroniza o valor interno quando o valor externo muda
    useEffect(() => {
        setDisplayValue(MoneyUtils.formatCents(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        
        // Aplica máscara
        const maskedValue = MoneyUtils.applyMoneyMask(inputValue);
        setDisplayValue(maskedValue);
        
        // Converte para centavos e notifica mudança
        const cents = MoneyUtils.stringToCents(maskedValue);
        onChange(cents);
    };

    return (
        <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
            R$
        </span>
        <Input
            id={id}
            type="text"
            value={displayValue}
            onChange={handleChange}
            className={`pl-8 ${className} ${error ? 'border-red-500' : ''}`}
            placeholder={placeholder}
            disabled={disabled}
        />
        {error && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
        </div>
    );
};

