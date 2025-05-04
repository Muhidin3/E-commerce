"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import MyLoading from "../components/MyLoading";


export default function MessagesPage() {
  const {data:session,status} = useSession()
  const router = useRouter();
  const [data,setData] = useState([])
  const [loading,setLoading]= useState(false)

  useEffect(()=>{
    setLoading(true)
    if (status =='loading') {
      return
    }
    const senderId = session?.user?.id as string
    console.log(senderId)
    const fetch = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_MESSAGE_API_URL}/api/chats?id=${senderId}`)
      setData(res.data)
      setLoading(false)
    }
    fetch()
  },[session?.user?.id, status])



  if (loading) {
    return<><MyLoading/></>
  }
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Messages
      </Typography>

      <List component={motion.ul} initial="hidden" animate="visible">
        {data.map((person:{id:string,name:string}, index) => (
          <motion.li
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
            }}
            style={{ listStyle: "none" }}
          >
            <ListItemButton
              component={Paper}
              onClick={() => router.push(`/message/${person.id}`)}
              sx={{
                mb: 2,
                p: 2,
                bgcolor: "background.paper",
                boxShadow: 2,
                borderRadius: 2,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemText primary={person.name} />
            </ListItemButton>
          </motion.li>
        ))}
      </List>
    </Box>
  );
}
