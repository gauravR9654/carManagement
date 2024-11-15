'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import CarList from '../Component/AllCarComp';
import LoginSignUp from '../Component/Login_signUp';

const Dashboard = () => {
    const router = useRouter();
  
  return (
    <div>
    <LoginSignUp/>
    </div>
  )
}

export default Dashboard