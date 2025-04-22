'use Client'
import React from 'react'
import { auth } from '../api/auth/[...nextauth]/auth'
async function page() {
    const session = await auth()
    // console.log(session)
  return (
    <div>
        <h2 ><b>Hello</b>{session?.user?.name}</h2>
        <h2>email?:  {session?.user?.email}</h2>
    </div>
  )
}

export default page