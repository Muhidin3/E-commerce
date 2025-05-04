import React from 'react'
import ConversationPage from './Page2'
import axios from 'axios'
import { auth } from '@/app/api/auth/[...nextauth]/auth'


async function page({params}:{params:Promise<{id:string}>}) {
  const session = await auth()
  // console.log(session)
  const {id} = await params
  // console.log(await params)
  const senderId = session?.user?.id 
  const receiverId = id
  // console.log(`sender id ${senderId}`)
  // console.log(`reciver id ${receiverId}`)

  if (!senderId || !receiverId) {
    console.log('no sender or reciver id')
    return(<>some error</>)
  }
  const res = await axios.get(`${process.env.MESSAGE_API_URL}/api/message`+'?senderId='+senderId+'&receiverId='+receiverId)
  if (res.data.message=='no message') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responce = await axios.post(`${process.env.MESSAGE_API_URL}/api/addmessage`,{id:senderId,receiverId:receiverId})
    // console.log(responce.data)
    // console.log('addmessage')
  }
  // console.log(res.data)
  return (
    <>
    <ConversationPage id={id}/>
    </>
  )
}

export default page

