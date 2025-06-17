import Image from 'next/image'
import React from 'react'
import LoginForm from '../../../../components/Auth/LoginForm'

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#fffbe6]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center p-4 md:flex-row md:p-8">
        {/* Left side with illustration */}
        <div className="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
          <div className="mb-8 text-center md:text-left">
            <div className="relative h-40 w-40">
              <Image
                src="/images/Logo-text.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="relative h-64 w-full md:h-96">
            <Image
              src="/images/image-login.svg"
              alt="Isometric illustration of business elements"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-1/2">
          <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                SIGN IN
              </h1>
              <p className="text-sm text-gray-500">
                If you have an account with us, please sign in.
              </p>
            </div>

            <LoginForm />

          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage