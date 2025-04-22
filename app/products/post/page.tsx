import React from 'react'
import Mainpage from './Mainpage'
import Header from '@/app/components/Header'
import { auth } from '@/app/api/auth/[...nextauth]/auth'

async function page() {
  const session = await auth()
  return (
    <div><Header/> 
      <Mainpage session={session}/> </div>
  )
}

export default page