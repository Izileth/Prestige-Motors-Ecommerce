// use-auth.ts
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useAuthStore } from '~/store/slices/auth';
import type { LoginData, RegisterData } from '~/types/auth';
import type { ResetPasswordData } from '~/types/password';
import type { User } from '~/types/user';

export interface NestedUserData {
    user: User;
    [key: string]: any;
}

export function useAuth() {
    // Obtém estado e ações do store Zustand
    const {
        user,
        status,
        resetPassword,
        error,
        loginUser,
        logoutUser: logoutAction,
        registerUser,
        checkSession,
        forgotPassword,
        resetPassword: resetPasswordAction,
        clearResetPasswordStatus,
        setUser
    } = useAuthStore();
    
    
    const [sessionChecked, setSessionChecked] = useState(false);
    
    // Calcula isAuthenticated a partir do user
    const isAuthenticated = useMemo(() => !!user, [user]);
    
    // Normaliza os dados do usuário para componentes
    const normalizedUser = useMemo<User | null>(() => {
        if (!user) return null;
        
        // Se o user estiver aninhado em um objeto com propriedade 'user'
        if (user && typeof user === 'object' && 'user' in user) {
            return (user as NestedUserData).user;
        }
        
        // Caso contrário, assumimos que o próprio user já é do tipo User
        return user as User;
    }, [user]);

    // Efeito para debug - remove em produção
    useEffect(() => {
        console.log("User updated in useAuth:", normalizedUser);
    }, [normalizedUser]);

    // Efeito para verificar a sessão na montagem e quando o status muda
    useEffect(() => {
        if (status === 'idle' && !sessionChecked) {
            checkSession()
                .finally(() => setSessionChecked(true));
        }
    }, [status, sessionChecked, checkSession]);

    // Função de login com logs detalhados
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

    // Função para definir manualmente o usuário (útil para debugging)
 
    const manuallySetUser = useCallback(
    (userData: User | NestedUserData | null) => {
        console.log("Definindo usuário manualmente:", userData);
        // Normaliza antes de enviar ao store
        const normalizedUser = userData && 'user' in userData ? userData.user : userData;
        setUser(normalizedUser);
    },
    [setUser]
    );


    const logout = useCallback(async () => {
        console.log("Iniciando logout...");
        try {
            await logoutAction();
            // Limpar o token do localStorage
            localStorage.removeItem('token');
            console.log("Logout bem-sucedido");
        } catch (error) {
            console.error("Erro durante logout:", error);
            throw error;
        }
    }, [logoutAction]);

    const register = useCallback(
        async (userData: RegisterData) => {
            console.log("Tentando registrar usuário:", userData.email);
            try {
                await registerUser(userData);
                console.log("Registro bem-sucedido");
            } catch (error) {
                console.error("Erro no registro:", error);
                throw error;
            }
        },
        [registerUser]
    );

    const requestPasswordReset = useCallback(
        async (email: string) => {
            return forgotPassword(email);
        },
        [forgotPassword]
    );

    const confirmPasswordReset = useCallback(
        async (data: ResetPasswordData) => {
            return resetPasswordAction(data);
        },
        [resetPasswordAction]
    );

    const clearPasswordResetStatus = useCallback(() => {
        clearResetPasswordStatus();
    }, [clearResetPasswordStatus]);

    const hasRole = useCallback(
        (role: string) => {
            if (!normalizedUser) return false;
            return normalizedUser.role === role;
        },
        [normalizedUser]
    );

    // Adicionar dados extras para debugging
    useEffect(() => {
        console.log("Auth Status:", status);
        console.log("Is Authenticated:", isAuthenticated);
        console.log("User Data:", normalizedUser);
        // Log explícito do ID para debugging
        if (normalizedUser) {
            console.log("User ID:", normalizedUser.id);
        }
    }, [status, isAuthenticated, normalizedUser]);

    return {
        user: normalizedUser,
        userId: normalizedUser?.id || null,
        isAuthenticated,
        status,
        resetPasswordState: resetPassword,
        error,
        sessionChecked,
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