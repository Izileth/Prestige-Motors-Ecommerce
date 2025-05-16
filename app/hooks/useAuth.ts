import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    loginUser,
    logoutUser,
    registerUser,
    checkSession,
    forgotPassword,
    resetPassword,
    clearResetPasswordStatus,
    selectCurrentUser,
    selectAuthStatus,
    selectResetPasswordStatus,
    selectAuthError,
    setUser
} from '~/store/slices/auth';
import { useCallback, useEffect, useState, useMemo } from 'react';
import type { LoginData, RegisterData } from '~/types/auth';
import type { ResetPasswordData } from '~/types/password';
import type { User } from '~/types/user';


interface NestedUserData {
    user: User;
    [key: string]: any; // Para outros campos que possam existir neste objeto
}

export function useAuth() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const status = useAppSelector(selectAuthStatus);
    const resetPasswordState = useAppSelector(selectResetPasswordStatus);
    const error = useAppSelector(selectAuthError);
    
    // Remova o estado interno do usuário para evitar desincronização
    // const [internalUser, setInternalUser] = useState(user);
    
    const [sessionChecked, setSessionChecked] = useState(false);
    
    // Use useMemo para calcular isAuthenticated a partir do user
    // Isso garante que quando o user mudar, isAuthenticated também mudará
    const isAuthenticated = useMemo(() => !!user, [user]);
    
    // Normalize os dados do usuário para componentes
    // Isso garante que estamos fornecendo uma estrutura consistente
    const normalizedUser = useMemo<User | null>(() => {
        if (!user) return null;
        
        // Se o user estiver aninhado em um objeto com propriedade 'user'
        if (user && typeof user === 'object' && 'user' in user) {
            return (user as NestedUserData).user;
        }
        
        // Caso contrário, assumimos que o próprio user já é do tipo UserData
        return user as User;
    }, [user]);

    // Efeito para debug - remove em produção
    useEffect(() => {
        console.log("User updated in useAuth:", normalizedUser);
    }, [normalizedUser]);

    // Efeito para verificar a sessão na montagem e quando o status muda
    useEffect(() => {
        if (status === 'idle' && !sessionChecked) {
            dispatch(checkSession())
                .unwrap()
                .finally(() => setSessionChecked(true));
        }
    }, [dispatch, status, sessionChecked]);

    // Função de login com logs detalhados
    const login = useCallback(async (credentials: LoginData) => {
        try {
            console.log("Iniciando login para:", credentials.email);
            const result = await dispatch(loginUser(credentials)).unwrap();
            console.log("Login bem-sucedido, resultado:", result);
            return result;
        } catch (error) {
            console.error("Erro durante login:", error);
            throw error;
        }
    }, [dispatch]);

    // Função para definir manualmente o usuário (útil para debugging)
    const manuallySetUser = useCallback(
        (userData: User | NestedUserData) => {
            console.log("Definindo usuário manualmente:", userData);
            dispatch(setUser(userData));
        },
        [dispatch]
    );

    const logout = useCallback(async () => {
        console.log("Iniciando logout...");
        try {
            await dispatch(logoutUser()).unwrap();
            console.log("Logout bem-sucedido");
        } catch (error) {
            console.error("Erro durante logout:", error);
            throw error;
        }
    }, [dispatch]);

    const register = useCallback(
        async (userData: RegisterData) => {
            console.log("Tentando registrar usuário:", userData.email);
            try {
                const result = await dispatch(registerUser(userData)).unwrap();
                console.log("Registro bem-sucedido:", result);
                return result;
            } catch (error) {
                console.error("Erro no registro:", error);
                throw error;
            }
        },
        [dispatch]
    );

    const requestPasswordReset = useCallback(
        async (email: string) => {
            return dispatch(forgotPassword(email)).unwrap();
        },
        [dispatch]
    );

    const confirmPasswordReset = useCallback(
        async (data: ResetPasswordData) => {
            return dispatch(resetPassword(data)).unwrap();
        },
        [dispatch]
    );

    const clearPasswordResetStatus = useCallback(() => {
        dispatch(clearResetPasswordStatus());
    }, [dispatch]);

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
        user: normalizedUser, // Retorna o usuário normalizado
        userId: normalizedUser?.id || null, // Disponibiliza o ID diretamente
        isAuthenticated,
        status,
        resetPasswordState,
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