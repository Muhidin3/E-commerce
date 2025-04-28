'use client'
import { AppBar, Box, Button, TextField, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import MyLoading from '@/app/components/MyLoading';
import ColourMode from '@/app/components/small/ColourMode';
import { useSnackbar } from '@/app/components/SnackBar';

function Page() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error,setError] = useState(false)
    const router = useRouter();
    const [loading,setLoading] = useState(false)
    const [loadingmessage,setLoadingMessage] = useState('')
    const [errormessage,setErrorMessage] = useState('')
    const snackbar = useSnackbar()
      const handleSubmit = async () => {
        if (username === "" || password === "") {
          setErrorMessage("Please fill all fields");
          setError(true)
          return;
        }
        setLoading(true)
        setLoadingMessage('Logging in...')
        const result = await signIn("credentials", {
          username,
          password,
          redirect: false, // Prevent automatic redirection
        });
        if (result?.error) {
          setLoading(false)
          snackbar('Login failed: ' + result.error +'error','error')
          setError(true)
        } else if(result?.status!=200){
          alert('internal server error'+`more: ${result?.error} `)
        }else {
          router.push("/products")
        }
      };
      
      const style = {
        root: {
          flexGrow: 1,
        },
        appBar: {
        
        },
        title: {
          flexGrow: 1,
        },
        link: {
          marginLeft: '20px',
          color: '#fff',
          textTransform: 'none',
        },
      }

      if(loading){
        return(<MyLoading message={loadingmessage}/>)
      }
  
    return (
    <>
    <div style={style.root}>
      <AppBar position="static" style={style.appBar}>
        <Toolbar>
          <Typography variant="h6" style={style.title} className='text-white text-nowrap'>
            <Link href={'/'}>E-com</Link>
          </Typography>

              <ColourMode/>
            
          
        </Toolbar>
      </AppBar>
    </div>
    <Box sx={{justifySelf:'center',p:3,borderRadius:'20px',mt:'10%',minWidth:'300px',border:'1px solid',width:{xs:'90%',sm:'80%',md:'60%',lg:'40%'},maxWidth:'700px'}}>
        <Typography sx={{fontSize:'35px',textAlign:'center',mb:7,mt:7}}>Login</Typography>
        <TextField label='Name' 
        sx={{display:'block',mb:2,
            '& input:-webkit-autofill': {
                boxShadow: '0 0 0 1000px rgba(0,0,0,0) inset',
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
                transition: 'background-color 5000s ease-in-out 0s',
            }}} 
          fullWidth
          InputLabelProps={{ shrink: true  }}
          placeholder='password'
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        
        ></TextField>
        <Typography className='text-center text-red-500' sx={{display:error?'block':'none'}}>{errormessage?errormessage:'Check your credentials!'} </Typography>

        <Button variant='contained' sx={{width:'100%',margin:'30px 0px 20px 0px'}} onClick={handleSubmit} type='submit'>Login</Button>
        <Typography variant='body2' sx={{textAlign:'center',mb:3,mt:3}}>Dont have an account? 
            <Link href={'/auth/register'} onClick={()=>setLoading(true)}> Register</Link>
            </Typography>
    </Box>
    </>
  )
}

export default Page