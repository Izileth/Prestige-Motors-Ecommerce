export const createSlug = (marca: string, modelo: string, ano: string, id: string): string => {
    const baseSlug = `${marca}-${modelo}-${ano}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    
    // Encode o ID em base64 e limpa caracteres problemáticos
    const encodedId = btoa(id).replace(/[+/=]/g, (match) => {
        switch (match) {
            case '+': return '-';
            case '/': return '_';
            case '=': return '';
            default: return match;
        }
    });
    
    return `${baseSlug}-${encodedId}`;
};

export const extractIdFromSlug = (slug: string): string => {
    const parts = slug.split('-');
    const encodedId = parts[parts.length - 1];
    
    try {
        // Restaura caracteres base64 e decodifica
        const paddedEncodedId = encodedId.replace(/-/g, '+').replace(/_/g, '/');
        const padding = '='.repeat((4 - paddedEncodedId.length % 4) % 4);
        return atob(paddedEncodedId + padding);
    } catch (error) {
        console.error('Erro ao decodificar slug:', error);
        throw new Error('Slug inválido');
    }
};

