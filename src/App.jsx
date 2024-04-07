import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import useAuthContext from './Hooks/useAuthContext'

import loading from './assets/loading.gif'
import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'

const AuthPage = React.lazy(() => import('./Pages/authPage/AuthPage'));
const Home = React.lazy(() => import('./Pages/Home/Home'));

function App() {
  const { authIsReady } = useAuthContext();
  const location = useLocation();
  return (
    <div className="App">
      {
        authIsReady &&
        <AnimatePresence exitBeforeEnter>
          <Suspense fallback={<div></div>}>

            <Routes location={location} key={location.pathname}>

              <Route path='/' element={<Layout><Home /></Layout>} />
              <Route path='/authpage' element={<Layout><AuthPage /></Layout>} />

            </Routes>
          </Suspense>
        </AnimatePresence>

      }
      {
        !authIsReady && <img src={loading} style={{ height: "20%" }} />
      }
    </div>
  )
}

export default App
