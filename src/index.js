import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { AuthProvider } from "contexts/AuthContext";
import { AdminDataProvider } from "contexts/AdminDataContext";
import Modal from "react-modal";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/inter';

Modal.setAppElement("#root");

const container = document.getElementById('root');
const root = createRoot(container);
root.render(

    <AuthProvider>
        <AdminDataProvider>
            <App />
        </AdminDataProvider>
    </AuthProvider>
);