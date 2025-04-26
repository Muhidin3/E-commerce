/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Delete, EditOutlined } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, useTheme } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState,memo } from 'react'
import MyLoading from './MyLoading'
import { useSnackbar } from './SnackBar'
 
const PostCard = memo(function PostsCard({data}:{data:{price:string,description:string,productName:string,image:string,_id:string}}){
    const router = useRouter()
    const [deleteDialog,setdelDialog] = useState(false)
    const theme = useTheme()
    const [loading,setLoading] = useState(false)
    const [loadingMessage,setLoadingMessage] = useState('')
    const a = useSnackbar()


    const handleDeleteClick = async () => {
      setLoadingMessage('Deleting...')
      setLoading(true)
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${data._id}`)
      console.log(res.data)
      setdelDialog(false)
      router.refresh()
      if(res.data.message == 'Product deleted'){ 
        a('Product deleted sucessfuly','success')
      } else{
        a('Failed to delete the product','error')
      }
    }
  
    const handleUpdateClick = async (e:React.FormEvent) => {
      setLoadingMessage('Updating...')
      setLoading(true)
      e.preventDefault();
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('condition', condition);
      formData.append('category', category);
      formData.append('subcategory', subcategory);
      if (image) {
        formData.append('image', image);
      }
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/products/${data._id}`,formData)
      console.log(res.data)
      if(res.data.message == 'Edited successfully'){
        data = {productName:productName,price:price,description:description,_id:data._id,image:data.image}
        setDialogState(false)
        router.refresh()
        a('Product Updated sucessfuly','success')
      }else{
        a('Failed to updated the product','error')
      }
  
    }
  
  
    const [productName, setProductName] = useState(data.productName);
    const [price, setPrice] = useState(data.price.toLocaleString());
    const [description, setDescription] = useState(data.description);
    const [condition, setCondition] = useState('new');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [dialogState,setDialogState] = useState(false)
  
    if (loading) {
      return<MyLoading message={loadingMessage} />
    }
  
    return (
      <div className='my-2 shadow-md rounded-2xl hover:cursor-pointer border-1 border-slate-600 hover:shadow-xl mx-10'>
        <Box sx={{m:1,borderRadius:'0px',maxWidth:500,display:'flex',flexDirection:{xs:'column',sm:'row'},justifyContent:'space-between',alignItems:'center'}} >
            <Box sx={{p:1}} className="flex justify-center items-center">
              <div className="" style={{width:'200px',height:'100px'}}>
                <Image src={`https://ecom-mauve-eight.vercel.app/uploads/${data.image}`} style={{height:'100px',width:'auto',justifySelf:'center'}} width={100} height={100} alt='product photo'/>
              </div>
            </Box>
  
            <Box sx={{ml:1,p:1,position:'relative',pr:4,width:{xs:'100%',sx:'250px',md:'250px'}}}>
                <Typography variant='h5'>{data.productName}</Typography>
                <Typography variant='body2' sx={{display:'block',maxWidth:'300px'}}>{data.description}</Typography>
                <Typography variant='body2' sx={{display:'inline-block'}}>{data.price }</Typography>
                <Typography variant='body2' sx={{display:'inline-block',ml:'10%',color:'green'}}>Active </Typography>
                <Box sx={{color:'red',display:'inline-block',position:'absolute',top:10,right:10,scale:1,}}>
                  <Delete 
                  onClick={()=>{setdelDialog(true)}} sx={{display:'block',mb:1,color:theme.palette.primary.light,':hover':{scale:1.2,color:'rgba(255,80,80,1)'}}}></Delete>
                    <Dialog open={deleteDialog}>
                      
                      <DialogTitle sx={{bgcolor:'red',color:'white',mb:2}}>
                        Delete
                      </DialogTitle>
                      <DialogContent sx={{pt:2}}>
                        Are you sure yo want to delete {data.productName}?
                      </DialogContent>
                      <DialogActions>
                        <Button variant='outlined' onClick={()=>setdelDialog(false)}>Cancel</Button>
                        <Button variant='contained' onClick={handleDeleteClick} sx={{bgcolor:'red'}}>Delete</Button>
                      </DialogActions>
                    </Dialog>
                  <EditOutlined onClick={()=>setDialogState(true)} sx={{color:theme.palette.primary.light,':hover':{scale:1.1,color:'#2196f3'}}}/>
                  </Box>
            </Box>
  
        </Box>
  
      <Dialog open={dialogState}>
        <DialogTitle>
          Edit Product
        </DialogTitle>
  
        <DialogContent sx={{minWidth:'400px',mt:1}}>
            <Box sx={{ marginBottom: '15px',pt:1 }}>
                      <TextField
                        label="Product Name"
                        variant="outlined"
                        fullWidth
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </Box>
            
                    <Box sx={{ marginBottom: '15px' }}>
                      <TextField
                        label="Price"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </Box>
            
                    <Box sx={{ marginBottom: '15px' }}>
                      <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </Box>
            
                    <Box sx={{ marginBottom: '15px' }}>
                      <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ padding: '10px' }}
                      >
                        Change Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        />
                      </Button>
                    </Box>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={()=>setDialogState(false)}>Close</Button>
            <Button variant='contained' onClick={handleUpdateClick}>Save</Button>
        </DialogActions>
      </Dialog>
  
  
  
  
      </div>
    )
  }

)

export default PostCard

// 100000305791

//qreta qutr
//8008419968