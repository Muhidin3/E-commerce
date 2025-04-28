'use client'
import { AppBar, Box, Button, TextField, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios' 
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import MyLoading from '@/app/components/MyLoading'
import ColourMode from '@/app/components/small/ColourMode'

function validatePassword(password: string): string {
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character';
    if (/\s/.test(password)) return 'Password cannot contain spaces';
    return ''; // all good
  }
function SimpleComponent() {
    const [loading,setLoading] = useState(false)
    const [loadingmessage,setLoadingMessage] = useState('')
    const [user, setUser] = useState({
        name: '',
        password: ''
    })
    const [passwordError,setPasswordError] = useState('')
    const router = useRouter()

    async function handlesubmit() {
        setLoading(true) 
        setLoadingMessage('Registering...')
        if (user.name == '' || user.password == '') {
            setPasswordError('please fill all fields')
            setLoading(false)
            return
            
        }
        if (passwordError!='') {
            setPasswordError('please follow rules before submitting')
            setLoading(false)
            return
        }
        try {
            const response = await axios.post(`/api/register`, user) 
            if(response.data.message == 'sucessful'){
                setLoadingMessage('Logging in...')
                const username = user.name
                const password = user.password
                const result = await signIn("credentials", {
                          username,
                          password,
                          redirect: false,
                        });
                
                        console.log(result)
                        if (result?.error) {
                          alert("Login failed: " + result.error);
                        } else if(result?.status!=200){
                          alert('internal server error'+`more: ${result?.error} `)
                        }else {
                          router.push("/products");
                        }
            }
            else{
                setPasswordError('user already exists')
            }
        } catch (error) {
            console.error('Error registering user:', error)
        }
    }

    function handlechange(e: { target: { name: string, value: string } }) {
        setUser({ ...user, [e.target.name]: e.target.value }) 
        if(e.target.name=='password'){
            const error = validatePassword(e.target.value)
            setPasswordError(error)
        }
    }

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
    if (loading) {
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

        <Box sx={{justifySelf:'center',p:3,pt:0,borderRadius:'20px',mt:'10%',border:'1px solid #ccc',boxShadow:'0 0 10px rgba(0, 0, 0, 0.1)',width:{xs:'90%',sm:'80%',md:'60%',lg:'40%'}}}>
            <Typography sx={{fontSize:'35px',textAlign:'center',my:{xs:5,sm:7}}}>Register</Typography>
    
            <TextField 
                label='Name' 
                name='name' 
                InputLabelProps={{ shrink: true  }}
                sx={{display:'block',mb:2,
                    '& input:-webkit-autofill': {
                        boxShadow: '0 0 0 1000px rgba(0,0,0,0) inset',
                        WebkitTextFillColor: 'blue',
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
                        WebkitTextFillColor: 'blue',
                        transition: 'background-color 5000s ease-in-out 0s',
                    }}} 
                fullWidth 
                onChange={handlechange} 
                InputLabelProps={{ shrink: true  }}
                
            />
            <Typography variant='body2' sx={{color:'red',justifySelf:'center',mt:2,opacity:0.9}}>{passwordError}</Typography>

            <Button 
                variant='contained' 
                sx={{width:'100%',margin:'50px 0px 20px 0px'}} 
                onClick={handlesubmit}
            >
                Register
            </Button>
            <Typography variant='body2' sx={{textAlign:'center',}}>
                Already have an account? 
                <Link href={'/auth/login'} onClick={()=>{setLoading(true);setLoadingMessage('Wait a moment...')}}> Log in</Link>
            </Typography>
        </Box>
        </>
    )
}

export default SimpleComponent
