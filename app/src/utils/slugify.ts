export const createSlug = (marca: string, modelo: string, ano: string): string => {
    const baseSlug = `${marca}-${modelo}-${ano}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    
    return baseSlug;
};

