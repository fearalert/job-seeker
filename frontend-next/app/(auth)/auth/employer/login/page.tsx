import AuthForm from '@/components/auth/AuthForm'
import { ROLES } from '@/constants'
import React from 'react'

const LoginPage = () => {
  return (
    <AuthForm type='login' role={ROLES.EMPLOYER} />
  )
}

export default LoginPage