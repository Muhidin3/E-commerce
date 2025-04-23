'use client'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Page() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error,setError] = useState(false)
    const router = useRouter();
  
      const handleSubmit = async () => {
    
        const result = await signIn("credentials", {
          username,
          password,
          redirect: false, // Prevent automatic redirection
        });

        console.log(result)
        if (result?.error) {
          alert("Login failed: " + result.error);
          setError(true)
        } else if(result?.status!=200){
          alert('internal server error'+`more: ${result?.error} `)
        }else {
          router.push("/products"); // Redirect on successful login
        }
      };
  
  
    return (
    <>
    <Box sx={{justifySelf:'center',p:3,borderRadius:'20px',mt:'10%',width:'500px'}}>
        <Typography sx={{fontSize:'35px',textAlign:'center',mb:7,mt:7}}>Login</Typography>
        <TextField label='Name' 
        sx={{display:'block',mb:2,bgcolor:'white',
            '& input:-webkit-autofill': {
                boxShadow: '0 0 0 1000px rgba(0,0,0,0) inset',
                WebkitTextFillColor: 'white',
                transition: 'background-color 5000s ease-in-out 0s',
            }}} 
          fullWidth
          InputLabelProps={{ shrink: true  }}
          type='text'
          placeholder='username'
          value={username}
          onChange={e=>setUsername(e.target.value)}
          required        
        ></TextField>

        <TextField label='Password' type='password'
        sx={{display:'block',mb:2,
            '& input:-webkit-autofill': {
                boxShadow: '0 0 0 1000px rgba(0,0,0,0) inset',
                WebkitTextFillColor: 'white',
                transition: 'background-color 5000s ease-in-out 0s',
            }}} 
          fullWidth
          InputLabelProps={{ shrink: true  }}
          placeholder='password'
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        
        ></TextField>
        <Typography className='text-center text-red-500' sx={{display:error?'block':'none'}}>Check your credentials!</Typography>

        <Button variant='contained' sx={{width:'100%',margin:'30px 0px 20px 0px'}} onClick={handleSubmit} type='submit'>Login</Button>
        <Typography variant='body2' sx={{textAlign:'center',}}>Dont have an account? 
            <Link href={'/auth/register'}> Register</Link>
            
            </Typography>
    </Box>
    </>
  )
}

export default Page