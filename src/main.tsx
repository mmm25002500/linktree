import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'

// components
import Navbar from './components/navbar';
import Footer from './components/Footer';

// Pages
import App from './App';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Test from './pages/Test';
import UserPage from './pages/UserPage';
import NotFound from './pages/NotFound';

import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// firebase
import { initializeApp } from 'firebase/app'
import { config } from './config/config'
import AuthRoute from './components/AuthRoute';

initializeApp(config.firebaseConfig)

library.add(fas, fab)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<AuthRoute><Home /></AuthRoute>} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<AuthRoute><LoginPage /></AuthRoute>}></Route>
        {/* <Route path='/login' element={<LoginPage />}></Route> */}
        <Route path='/test' element={<Test />}></Route>
        <Route path='/user/:id' element={<UserPage />}></Route>
        <Route path='/user' element={<NotFound />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)
