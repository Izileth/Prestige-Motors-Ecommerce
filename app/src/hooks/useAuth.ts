import { useCallback, useEffect, useMemo } from 'react';
import { useAuthStore } from '~/src/store/slices/auth';
import type { LoginData, RegisterData } from '~/src/types/auth';
import type { ResetPasswordData } from '~/src/types/password';
import type { User } from '~/src/types/user';

export interface NestedUserData {
    user: User;
    [key: string]: any;
}

export function useAuth() {
    const {
        user,
        status,
        resetPasswordState,
        error,
        isInitialized,
        loginUser,
        logoutUser: logoutAction,
        registerUser,
        checkSession,
        forgotPassword,
        resetPassword: resetPasswordAction,
        clearResetPasswordStatus,
        setUser,
        initialize
    } = useAuthStore();
    
    // Calcula isAuthenticated a partir do user
    const isAuthenticated = useMemo(() => !!user, [user]);
    
    // Normaliza os dados do usuário para componentes
    const normalizedUser = useMemo<User | null>(() => {
        if (!user) return null;
        
        // Se o user estiver aninhado em um objeto com propriedade 'user'
        if (user && typeof user === 'object' && 'user' in user) {
            return (user as NestedUserData).user;
        }
        
        return user as User;
    }, [user]);

    // Inicialização automática quando o hook é montado
    useEffect(() => {
        if (!isInitialized) {
            initialize();
        }
    }, [isInitialized, initialize]);

    // Logs para debug
    useEffect(() => {
        if (isInitialized) {
            console.log("Auth Status:", status);
            console.log("Is Authenticated:", isAuthenticated);
            console.log("User Data:", normalizedUser);
            if (normalizedUser) {
                console.log("User ID:", normalizedUser.id);
            }
        }
    }, [status, isAuthenticated, normalizedUser, isInitialized]);

    const login = useCallback(async (credentials: LoginData) => {
        try {
            console.log("Iniciando login para:", credentials.email);
            await loginUser(credentials);
            console.log("Login bem-sucedido");
        } catch (error) {
            console.error("Erro durante login:", error);
            throw error;
        }
    }, [loginUser]);

    const logout = useCallback(async () => {
        console.log("Iniciando logout...");
        try {
            await logoutAction();
            console.log("Logout bem-sucedido");
        } catch (error) {
            console.error("Erro durante logout:", error);
            throw error;
        }
    }, [logoutAction]);

    const register = useCallback(async (userData: RegisterData) => {
        console.log("Tentando registrar usuário:", userData.email);
        try {
            await registerUser(userData);
            console.log("Registro bem-sucedido");
        } catch (error) {
            console.error("Erro no registro:", error);
            throw error;
        }
    }, [registerUser]);

    const manuallySetUser = useCallback((userData: User | NestedUserData | null) => {
        console.log("Definindo usuário manualmente:", userData);
        const normalizedUser = userData && 'user' in userData ? userData.user : userData;
        setUser(normalizedUser);
    }, [setUser]);

    const requestPasswordReset = useCallback(async (email: string) => {
        return forgotPassword(email);
    }, [forgotPassword]);

    const confirmPasswordReset = useCallback(async (data: ResetPasswordData) => {
        return resetPasswordAction(data);
    }, [resetPasswordAction]);

    const clearPasswordResetStatus = useCallback(() => {
        clearResetPasswordStatus();
    }, [clearResetPasswordStatus]);

    const hasRole = useCallback((role: string) => {
        if (!normalizedUser) return false;
        return normalizedUser.role === role;
    }, [normalizedUser]);

    return {
        user: normalizedUser,
        userId: normalizedUser?.id || null,
        isAuthenticated,
        status,
        resetPasswordState,
        error,
        isInitialized, // Expor este campo para componentes saberem quando está pronto
        hasRole,
        login,
        logout,
        register,
        requestPasswordReset,
        confirmPasswordReset,
        clearPasswordResetStatus,
        manuallySetUser,
    };
}