import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { SnackbarProvider } from 'notistack';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>
        <BrowserRouter>
            <SnackbarProvider  anchorOrigin={{vertical: 'top',horizontal: 'right',}} autoHideDuration={2000}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </RecoilRoot>
 
)
