import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER,
} from 'redux-persist';
import type { Persistor } from "redux-persist";
import storage from 'redux-persist/lib/storage';

// Importação dos reducers
import vehicleReducer from "./slices/vehicle";
import userReducer from "./slices/user";
import authReducer from "./slices/auth";
import salesReducer from "./slices/sales";
import negociationReducer from "./slices/negociation";

// Configuração da persistência para auth (apenas o que precisamos manter entre sessões)
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'status'], // apenas persiste user e status do slice auth
};

// Combinando todos os reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
  vehicle: vehicleReducer,
  sales: salesReducer,
  negociation: negociationReducer,
});

// Tipo para o estado raiz
export type RootState = ReturnType<typeof rootReducer>;

// Interface para o retorno da função createStore
interface StoreWithPersistor {
  store: ReturnType<typeof configureStore>;
  persistor: Persistor;
}

// Interface para o retorno da função createStore no servidor
interface ServerStore {
  store: ReturnType<typeof configureStore>;
  persistor?: never; // Não terá persistor no servidor
}

// Função para criar um novo store
// Esta função é adaptada para SSR com React 19
export function createStore(preloadedState?: Partial<RootState>): StoreWithPersistor | ServerStore {
  const isServer = typeof window === 'undefined';
  
  // Configuração do store com suporte a serializabilidade para redux-persist
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  // No servidor, retornamos apenas a store sem persistor
  if (isServer) {
    return { store };
  }
  
  // No cliente, criamos e retornamos o persistor também
  const persistor = persistStore(store);
  return { store, persistor };
}

// Singleton store para uso no cliente
let clientStore: StoreWithPersistor | undefined = undefined;

// Função para acessar o store no cliente
export function getClientStore(): StoreWithPersistor {
  if (typeof window === 'undefined') {
    // No servidor, criamos uma store temporária apenas para satisfazer a tipagem
    const tempStore = createStore() as ServerStore;
    return { 
      store: tempStore.store, 
      // Criamos um persistor vazio que nunca será usado no servidor
      persistor: {} as Persistor 
    };
  }
  
  if (!clientStore) {
    clientStore = createStore() as StoreWithPersistor;
  }
  
  return clientStore;
}

// Exportar store e persistor para uso no cliente
export const { store, persistor } = getClientStore();

// Tipo para o dispatch da store
export type AppDispatch = typeof store.dispatch;