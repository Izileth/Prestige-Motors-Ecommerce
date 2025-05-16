import { configureStore } from "@reduxjs/toolkit";

import vehicleReducer from "./slices/vehicle";
import userReducer from "./slices/user"
import authReducer from "./slices/auth"
import salesReducer from "./slices/sales"
import negociationReducer from "./slices/negociation"

// Função para criar um novo store para cada requisição
export function createStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      vehicle: vehicleReducer,
      sales: salesReducer,
      negociation: negociationReducer,
    },
  });
}

// Para uso no cliente
export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;