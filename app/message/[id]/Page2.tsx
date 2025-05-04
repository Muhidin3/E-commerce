/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MyLoading from "@/app/components/MyLoading";
import { RefreshRounded, Send } from "@mui/icons-material";
import { Box, Typography, Paper, Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {io} from 'socket.io-client'


type AMessage = {
  _id?: string;
  senderId: string;
  message: string;
  time:number;
};

// const message = [{}]

const socket = io(`${process.env.NEXT_PUBLIC_MESSAGE_API_URL}`)

export default function ConversationPage({id}:{id:string}) {
  const {data:session,status} = useSession()
  const senderId = session?.user?.id as string
  const receiverId = id
  const [userMessage,setUserMessage] = useState('')   
  // const [messages,setMessages] = useState([{_id:'',senderId: '',message: '',time: Date.now()}])
  const [messages,setMessages] = useState<AMessage[]>([])
  const [loading,setLoading] = useState(false)
  const [withuser,setwithuser] = useState('')
  const [height,setheight] = useState(600)
  
    useEffect(()=>{
      setheight(window.innerHeight-200)
    },[])

    useEffect(()=>{
      if (status =='loading') {
        return
      }
      socket.emit('register',senderId)
      fetchdata()
    },[senderId,status])


    const handleSend = async (e:React.FormEvent)=>{
      e.preventDefault()
      setLoading(true)
      // const res = await axios.post(url,newMessage) 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = socket.emit('sendMessage',{
        senderId: senderId,
        receiverId: receiverId,
        text: userMessage
      })

      // console.log(res)
      setUserMessage('')
      setLoading(false)
      fetchdata()
    }

    async function fetchdata(){
      const getuser = await axios.get(`${process.env.NEXT_PUBLIC_MESSAGE_API_URL}/api/getusername?id=${receiverId}`)
      setwithuser(getuser.data.name)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_MESSAGE_API_URL}/api/message`+'?senderId='+senderId+'&receiverId='+receiverId)
      if (res.data.message=='no message') {
        console.log(res.data.message)
      }
      setMessages(res.data)
    }


    useEffect(()=>{
      const handler = ({ senderId, text,id }:{senderId:string,text:string,id:string}) => {
          setMessages((previous)=>{
            const array = [...previous]
            array.push({_id:id,message:text,senderId:senderId,time:Date.now()})
            
            return array
          })
        }
      socket.on("receiveMessage",handler);

      return ()=>{socket.off('receiveMessage')}
    },[socket])


  if (status=='unauthenticated') {
    return(<>please authenticate first</>)
  }



  return (
    <>
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Conversation with {withuser.toUpperCase()}
      <Button onClick={fetchdata}> <RefreshRounded /></Button>
      </Typography>

      <div className="relative" >

      <div style={{position:'absolute',top:'0px',left:'0px',width:'100%',height:'150px',backgroundImage:'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0))',zIndex:2}}>
          </div>
      <Paper
        sx={{p: 3, mb: 3, 
              minHeight: "300px",
              position:'relative', 
              bgcolor: "background.paper", 
              borderRadius: 2,
              maxHeight:height,
              overflowY:'scroll',
              scrollbarWidth:'none',
              display:"flex",
              flexDirection:'column-reverse' }}
        elevation={3}
        // ref={containerRef}
      >
        <Stack spacing={2} sx={{}} >


          {messages!.slice().reverse().map((a:AMessage,index)=>{
            return(<div  key={index} style={{display:'flex',justifyContent: a.senderId==senderId?'flex-end':'flex-start'}}>
              <Paper 
                    sx={{px:2,pt:1,minWidth:'100px',pb:3,position:'relative',  
                            bgcolor: a.senderId==senderId?"text.main":"grey.200" , 
                            color: a.senderId==senderId?"text.contrastText":"text.secondary" }}>
                <Typography>{a.message}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{position:'absolute',bottom:'2px'}}>{new Date(a.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
              </Paper>
            </div>)
          })}

        </Stack>
  
      </Paper>
      </div>

      {/* Message input */}
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          sx={{ bgcolor: "background.paper", }}
          onChange={(e)=>setUserMessage(e.target.value)}
          value={userMessage}
          onKeyDown={(e)=>{if (e.key=='Enter'){handleSend(e)} }}
        />
        
        {loading?
        <MyLoading message="sending..."/>:
        <Button disabled={userMessage==''?true:false} variant="text" sx={{borderRadius:'20px'}} onClick={handleSend}><Send/> </Button>}

      </Stack>
    </Box></>
  );
}
