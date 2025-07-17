import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '~/src/types/users';
import { userService } from '~/src/services/user';

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  lastFetch: number | null; // Para controlar cache
}

interface UsersActions {
  fetchUsers: (force?: boolean) => Promise<void>;
  clearError: () => void;
  reset: () => void;
  setUsers: (users: User[]) => void;
}

type UsersStore = UsersState & UsersActions;

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
  lastFetch: null,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milliseconds

const useUsersStore = create<UsersStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchUsers: async (force = false) => {
        const state = get();
        const now = Date.now();

        // Se já está carregando, não fazer nova requisição
        if (state.isLoading) {
          return;
        }

        // Se tem cache válido e não é forçado, não buscar novamente
        if (
          !force &&
          state.lastFetch &&
          state.users.length > 0 &&
          (now - state.lastFetch) < CACHE_DURATION
        ) {
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await userService.getUsers();
          
          // Extrair users do response baseado na estrutura da API
          const users = response?.users || [];
          
          if (!Array.isArray(users)) {
            throw new Error('Formato de resposta inválido');
          }

          set({
            users,
            isLoading: false,
            error: null,
            lastFetch: now,
          });
        } catch (error) {
          console.error('Erro ao buscar usuários:', error);
          set({
            error: error instanceof Error ? error.message : 'Erro ao buscar usuários',
            isLoading: false,
            users: [],
            lastFetch: null,
          });
        }
      },

      setUsers: (users: User[]) => {
        set({ users, lastFetch: Date.now() });
      },

      clearError: () => set({ error: null }),

      reset: () => set({ ...initialState }),
    }),
    {
      name: 'users-store',
    }
  )
);

export default useUsersStore;