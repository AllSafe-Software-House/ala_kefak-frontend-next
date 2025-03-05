"use client";
import LangBtn from '@/app/components/navbar/LangBtn';
import { LightDarkToggle } from '@/app/components/navbar/LightDarkToggle';
import { useTheme } from '@/app/providers/Theme-context';
import React from 'react'

const AuthHeading = () => {
    const { theme } = useTheme();
    const logoSrc = theme === "light" ? "/images/logo.png" : "/images/logo1.png";
  return (
    <div className=' w-full flex justify-between items-center'>
      <img src={logoSrc} alt="logo" className="w-[90px] md:w-[150px] h-[60px] md:h-[90px]"  />
      <div className='flex items-center gap-2'> 
      <LightDarkToggle />
      <LangBtn />
      </div>
    </div>
  )
}

export default AuthHeading