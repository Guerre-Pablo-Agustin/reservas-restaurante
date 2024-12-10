'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LoginForm from '@/components/Login/LoginForm'
import RegisterForm from '@/components/Login/RegisterForm'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => setIsLogin(!isLogin)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl lg:overflow-hidden bg-white rounded-lg shadow-lg h-screen lg:h-auto">
        <div className="flex flex-col-reverse lg:flex-row">
          {/* Formulario de Login/Register sin animación en pantallas pequeñas */}
          <div className="block lg:hidden w-full">
            <motion.div 
            animate={{ y: isLogin ? 0 : '170%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full bg-blue-600 text-white p-8  flex-col lg:flex justify-center items-center text-center transition-colors duration-300 h-1/2">
              <h2 className="text-3xl font-bold mb-4">
                {isLogin ? 'Bienvenido!' : 'Únete a nosotros!'}
              </h2>
              <p className="mb-8">
                {isLogin
                  ? 'Si no tienes una cuenta, puedes crear una nueva.'
                  : 'Si ya tienes una cuenta, inicia sesión para continuar.'}
              </p>
              <button
              onClick={toggleForm}
              className="mt-4 px-6 py-2 border-2 border-white rounded-full text-white hover:bg-blue-600 hover:text-white transition-colors duration-300 "
            >
              {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
            </motion.div>
            <motion.div 
            animate={{ y: isLogin ? 0 : '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={`w-full p-8 ${!isLogin ? 'mt-48' : ''} flex-col lg:flex justify-center items-center text-center transition-colors duration-300 h-1/2`}>
            {isLogin ? <LoginForm /> : <RegisterForm />}
            </motion.div>
          </div>
          
          {/* Formulario con animación en pantallas grandes */}
          <motion.div
            className="hidden lg:block w-full lg:w-1/2 p-8"
            animate={{ x: isLogin ? 0 : '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </motion.div>
          <motion.div
            className="hidden w-full lg:w-1/2 bg-blue-600 text-white p-8  flex-col lg:flex justify-center items-center text-center h-auto"
            animate={{ x: isLogin ? 0 : '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {isLogin ? 'Bienvenido de vuelta!' : 'Únete a nosotros!'}
            </h2>
            <p className="mb-8">
              {isLogin
                ? 'Si no tienes una cuenta, puedes crear una nueva.'
                : 'Si ya tienes una cuenta, inicia sesión para continuar.'}
            </p>
            <button
              onClick={toggleForm}
              className="px-6 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
