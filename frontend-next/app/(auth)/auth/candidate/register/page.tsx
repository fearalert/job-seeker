import AuthForm from '@/components/auth/AuthForm'
import { ROLES } from '@/constants'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='flex mt-24 mb-8'>
    <AuthForm type='register' role={ROLES.JOB_SEEKER} />

    </div>
  )
}

export default RegisterPage