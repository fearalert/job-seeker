import AuthForm from '@/components/auth/AuthForm'
import { ROLES } from '@/constants'
import React from 'react'

const RegisterPage = () => {
  return (
    <AuthForm type='register' role={ROLES.EMPLOYER} />
  )
}

export default RegisterPage