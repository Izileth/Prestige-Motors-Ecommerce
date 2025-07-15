import { configureStore } from "@reduxjs/toolkit";


import userReducer from "./slices/user"
import salesReducer from "./slices/sales"


// Função para criar um novo store para cada requisição
export function createStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      sales: salesReducer,
    },
  });
}

// Para uso no cliente
export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;