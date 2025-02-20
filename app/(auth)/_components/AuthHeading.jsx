import { mainInfo } from '@/app/constants/info'
import React from 'react'

const AuthHeading = () => {
  return (
    <div className=' w-full flex justify-start items-start'>
      <h1 className='w-full text-2xl md:text-4xl font-bold text-black'>{mainInfo.name}</h1>
    </div>
  )
}

export default AuthHeading