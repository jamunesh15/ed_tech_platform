import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.js'
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
 
   
    <Provider store ={store} >
    <BrowserRouter>
   <Toaster/>
      <App />

    </BrowserRouter>
    </Provider>
   
 
)
