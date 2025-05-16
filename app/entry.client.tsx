import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/global';

import App from './root';

// Crie o router do cliente
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
]);

// Componente de carregamento enquanto o estado está sendo restaurado
const LoadingView = () => <div>Carregando...</div>;

// Hidrate o aplicativo no cliente
ReactDOM.hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
        <Provider store={store}>
        {persistor ? (
            <PersistGate loading={<LoadingView />} persistor={persistor}>
            <RouterProvider router={router} />
            </PersistGate>
        ) : (
            <RouterProvider router={router} />
        )}
        </Provider>
    </React.StrictMode>
);