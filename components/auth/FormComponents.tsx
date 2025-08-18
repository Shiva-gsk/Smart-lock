import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

interface Props{
    message?: string
}

const FormError = ({message}: Props) => {
  if (!message) return null;

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex item-center gap-x-3 text-sm text-destructive'>
        <FaExclamationTriangle className='h-4 w-4'/>
        <p>{message}</p>
    </div>
  )
}

import { FaCheckCircle } from 'react-icons/fa'

interface Props{
    message?: string
}

const FormSuccess = ({message}: Props) => {
  if (!message) return null;

  return (
    <div className='bg-emerald-200 p-3 rounded-md flex item-center gap-x-3 text-sm text-emerald-500'>
        <FaCheckCircle className='h-4 w-4'/>
        <p>{message}</p>
    </div>
  )
}

export default FormSuccess


export { FormError, FormSuccess }
