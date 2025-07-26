import { useState } from "react";
import { MoneyUtils } from "../utils/money";

export const useMoneyInput = (initialValue: number = 0) => {
    const [cents, setCents] = useState(initialValue);
    
    return {
        cents,
        reais: MoneyUtils.centsToReais(cents),
        formatted: MoneyUtils.formatCents(cents),
        formattedWithSymbol: MoneyUtils.formatCentsWithSymbol(cents),
        setCents,
        setReais: (reais: number) => setCents(Math.round(reais * 100)),
        setFromString: (value: string) => setCents(MoneyUtils.stringToCents(value)),
        isValid: cents >= 0
    };
};