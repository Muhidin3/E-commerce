'use client'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios' 
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import MyLoading from '@/app/components/MyLoading'

function SimpleComponent() {
    const [loading,setLoading] = useState(false)
    const [user, setUser] = useState({
        name: '',
        password: ''
    })
    const router = useRouter()
    async function handlesubmit() {
        setLoading(true)
        try {
            const response = await axios.post('/api/register', user) 
            console.log(response.data.message)
            if(response.data.message == 'sucessful'){
                const username = user.name
                const password = user.password
                const result = await signIn("credentials", {
                          username,
                          password,
                          redirect: false, // Prevent automatic redirection
                        });
                
                        console.log(result)
                        if (result?.error) {
                          alert("Login failed: " + result.error);
                        } else if(result?.status!=200){
                          alert('internal server error'+`more: ${result?.error} `)
                        }else {
                          router.push("/products"); // Redirect on successful login
                        }

                // redirect('/auth/login')
            }
        } catch (error) {
            console.error('Error registering user:', error)
        }
    }

    function handlechange(e: { target: { name: string, value: string } }) {
        setUser({ ...user, [e.target.name]: e.target.value }) 
    }

    return (
        <>
        <MyLoading bool={loading}/>
        <Box sx={{justifySelf:'center',p:3,borderRadius:'20px',mt:'10%',width:'500px',border:'1px solid #ccc',boxShadow:'0 0 10px rgba(0, 0, 0, 0.1)'}}>
            <Typography sx={{fontSize:'35px',textAlign:'center',mb:7,mt:7}}>Register</Typography>
    
            <TextField 
                label='Name' 
                name='name' 
                InputLabelProps={{ shrink: true  }}
                sx={{display:'block',mb:2,
                    '& input:-webkit-autofill': {
                        boxShadow: '0 0 0 1000px rgba(0,0,0,0) inset',
                        WebkitTextFillColor: 'white',
                        transition: 'background-color 5000s ease-in-out 0s',
                    }
                }} 
                fullWidth 
                onChange={handlechange}

            />
            
            <TextField 
                label='Password' 
                name='password' 
                type='password' 
                sx={{display:'block',
                    '& input:-webkit-autofill': {
                        boxShadow: '0 0 0 1000px rgba(0,0,0,0) inset',
                        WebkitTextFillColor: 'white',
                        transition: 'background-color 5000s ease-in-out 0s',
                    }}} 
                fullWidth 
                onChange={handlechange} 
                InputLabelProps={{ shrink: true  }}

            />
    
            <Button 
                variant='contained' 
                sx={{width:'100%',margin:'50px 0px 20px 0px'}} 
                onClick={handlesubmit}
            >
                Register
            </Button>
            <Typography variant='body2' sx={{textAlign:'center',}}>
                Already have an account? 
                <Link href={'/auth/login'}> Log in</Link>
            </Typography>
        </Box>
        </>
    )
}

export default SimpleComponent
