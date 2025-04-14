import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');

    if (rootElement) {
        const initialData = window.__INITIAL_DATA__;
        hydrateRoot(
            rootElement,
            <BrowserRouter>
                <App initialData={initialData} />
            </BrowserRouter>);
    } else {
        console.error('Root element not found. Ensure <div id="root"> exists in the HTML.');
    }
});