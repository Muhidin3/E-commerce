/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import HeaderProducts from './small/HeaderProducts';
import { auth } from '../api/auth/[...nextauth]/auth';
import ProfileWithDropdown from './ProfileWithDropdown';
import { Box } from '@mui/material';
import { DarkModeOutlined } from '@mui/icons-material';
import { useThemeMode } from './Theme';
import ColourMode from './small/ColourMode';





const Header: React.FC = async () => {
  const session  = await auth()
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
  return (
    <div style={style.root}>
      <AppBar position="static" style={style.appBar}>
        <Toolbar>
          <Typography variant="h6" style={style.title} className='text-white'>
            <Link href={'/'}>E-com</Link>
          </Typography>

           
              <HeaderProducts />
              
              {!session && <><Link href={'/auth/login'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Login</Link>
              <Link href={'/auth/register'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Signup</Link></>}
              <ColourMode/>
              {session &&
              <Box style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>
                <ProfileWithDropdown user={session.user?.name as string}/>
              </Box>
              }
            
          
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
