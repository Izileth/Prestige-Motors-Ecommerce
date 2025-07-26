
export class MoneyUtils {
  static stringToCents(value: string): number {
    if (!value || typeof value !== 'string') return 0;
    
    // Remove tudo exceto dígitos, vírgulas e pontos
    const cleaned = value.replace(/[^\d.,]/g, '');
    
    // Se não tem vírgula nem ponto, assume que são reais inteiros
    if (!cleaned.includes(',') && !cleaned.includes('.')) {
      return parseInt(cleaned || '0') * 100;
    }
    
    // Se tem vírgula, assume formato brasileiro (vírgula = decimal)
    if (cleaned.includes(',')) {
      const parts = cleaned.split(',');
      const reais = parseInt(parts[0].replace(/\./g, '') || '0');
      const centavos = parseInt((parts[1] || '00').padEnd(2, '0').slice(0, 2));
      return reais * 100 + centavos;
    }
    
    // Se só tem ponto, pode ser separador de milhar ou decimal
    // Assume decimal se tem exatamente 2 dígitos após o último ponto
    const parts = cleaned.split('.');
    if (parts.length >= 2 && parts[parts.length - 1].length === 2) {
      // É decimal: "1234.56" -> 123456
      const lastPart = parts.pop()!;
      const reais = parseInt(parts.join('') || '0');
      const centavos = parseInt(lastPart);
      return reais * 100 + centavos;
    } else {
      // É separador de milhar: "1.234" -> 123400
      return parseInt(parts.join('') || '0') * 100;
    }
  }

  /**
   * Converte centavos (inteiro) para reais (float)
   * 123456 -> 1234.56
   */
  static centsToReais(cents: number): number {
    return cents / 100;
  }

  /**
   * Formata centavos para string brasileira
   * 123456 -> "1.234,56"
   */
  static formatCents(cents: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(cents / 100).replace('R$', '').trim();
  }

  /**
   * Formata centavos para display com R$
   * 123456 -> "R$ 1.234,56"
   */
  static formatCentsWithSymbol(cents: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(cents / 100);
  }

  /**
   * Valida se o valor é um valor monetário válido
   */
  static isValidAmount(value: string | number): boolean {
    if (typeof value === 'number') {
      return value >= 0 && Number.isFinite(value);
    }
    
    const cents = this.stringToCents(value);
    return cents >= 0;
  }

  /**
   * Máscara para input de dinheiro
   * Aplica formatação enquanto o usuário digita
   */
  static applyMoneyMask(value: string): string {
    // Remove tudo exceto dígitos
    const numbers = value.replace(/\D/g, '');
    
    if (!numbers) return '';
    
    // Converte para centavos e formata
    const cents = parseInt(numbers);
    return this.formatCents(cents);
  }
}

