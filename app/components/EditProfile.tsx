'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, TextField } from '@mui/material'
import React, { useState } from 'react'

function EditProfile() {
    const [user, setUser] = useState({name: '',oldPassword: '',newPassword: ''})
    const [open, setOpen] = useState(false)  
      
      
      return (<div>
    
    <Grid2 sx={{ml:'auto',mr:2,mt:2}} className="absolute right-0">
        <Button variant='contained' disableRipple onClick={()=>setOpen(true)}>Edit Profile</Button>
        <Dialog open={open} sx={{width:'100%'}}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
            <form action="" autoComplete='off'>

                <TextField 
                    label='Name' 
                    name='name' 
                    type='name' 
                    sx={{display:'block',my:2}} 
                    fullWidth 
                    autoComplete='off'
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    
                    />
                <TextField 
                    label='oldPassword' 
                    name='oldPassword' 
                    type='password' 
                    sx={{display:'block',my:2}} 
                    autoComplete='current-password'
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    fullWidth 
                    
                    />
                <TextField 
                    label='newPassword' 
                    name='newPassword' 
                    type='password' 
                    sx={{display:'block',my:2}} 
                    autoComplete='new-password'
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    fullWidth 
                    
                    />
            </form>

            <DialogContentText></DialogContentText>
            <DialogActions>
                <Button variant='outlined' disableRipple onClick={()=>setOpen(false)}>Cancel</Button>
                <Button variant='contained' disableRipple>Save</Button>
            </DialogActions>
            </DialogContent>
        </Dialog>
    </Grid2>

</div>)
}

export default EditProfile