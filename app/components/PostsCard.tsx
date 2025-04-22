/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Delete, Edit } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, MenuItem, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState,memo } from 'react'
 
const PostCard = memo(
  function PostsCard({data}:{data:{price:number,description:string,productName:string,image:string,_id:string}}){
    const router = useRouter()
    const [deleteDialog,setdelDialog] = useState(false)



    const handleDeleteClick = async () => {

      const res = await axios.delete(`http://localhost:3000/api/products/${data._id}`)
      console.log(res.data)
      setdelDialog(false)
      router.refresh()
    }
  
    const handleUpdateClick = async (e:React.FormEvent) => {
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
      const res = await axios.patch(`http://localhost:3000/api/products/${data._id}`,formData)
      console.log(res.data)
      if(res.data.message == 'Edited successfully'){
        data = {productName:productName,price:price,description:description,_id:data._id,image:data.image}
        setDialogState(false)
        router.refresh()
      }
  
    }
  
  
    const [productName, setProductName] = useState(data.productName);
    const [price, setPrice] = useState(data.price);
    const [description, setDescription] = useState(data.description);
    const [condition, setCondition] = useState('new');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [dialogState,setDialogState] = useState(false)
  
    const categories: Record<string, string[]> = {
      Electronics: ['Mobile Phones', 'Computers', 'Home Appliances'],
      Fashion: ['Clothing', 'Footwear', 'Accessories'],
      'Home & Furniture': ['Furniture', 'Home Décor', 'Bedding', 'Kitchenware'],
      'Cars & Accessories': ['Cars', 'Motorcycles', 'Car Parts'],
      'Beauty & Personal Care': ['Skincare', 'Hair Care', 'Makeup', 'Fragrances'],
      'Sports & Outdoors': ['Fitness Equipment', 'Outdoor Gear', 'Sports Equipment'],
      'Toys & Games': ['Action Figures', 'Board Games', 'Educational Toys'],
      'Books, Music & Movies': ['Books', 'Music', 'Movies'],
      'Food & Beverages': ['Gourmet Food', 'Organic Items', 'Drinks'],
      'Health & Wellness': ['Supplements', 'Medical Supplies', 'Personal Care Devices'],
    };
  
    return (
      <div className='my-2 shadow-md rounded-2xl hover:bg-gray-100 hover:cursor-pointer'>
        <Grid2 container sx={{m:1,borderRadius:'0px',maxWidth:500}}>
  
            <Grid2 sx={{p:1}}>
              <div className="" style={{width:'200px',height:'100px'}}>
                <Image src={`/uploads/${data.image}`} style={{height:'100px',width:'auto',justifySelf:'center'}} width={100} height={100} alt='product photo'/>
              </div>
              {/* <Avatar sx={{height:100,width:100,borderRadius:'10px 0 0 10px'}} variant='square'></Avatar>    */}
            </Grid2>
  
            <Grid2 sx={{ml:1,p:1,width:'250px',position:'relative',pr:4}}>
                <Typography variant='h5'>{data.productName}</Typography>
                <Typography variant='body2' sx={{display:'block',maxWidth:'300px'}}>{data.description}</Typography>
                <Typography variant='body2' sx={{display:'inline-block'}}>{data.price }</Typography>
                <Typography variant='body2' sx={{display:'inline-block',ml:'10%',color:'green'}}>Active </Typography>
                <Box sx={{color:'red',display:'inline-block',position:'absolute',top:10,right:10,scale:1,}}>
                  <Delete onClick={()=>setdelDialog(true)} sx={{display:'block',mb:1,':hover':{scale:1.2}}}></Delete>
                    <Dialog open={deleteDialog}>
                      
                      <DialogTitle sx={{bgcolor:'Background'}}>
                        Delete
                      </DialogTitle>
                      <DialogContent>
                        Are you sure yo want to delete {data.productName}?
                      </DialogContent>
                      <DialogActions>
                        <Button variant='outlined' onClick={()=>setdelDialog(false)}>Cancel</Button>
                        <Button variant='contained' onClick={handleDeleteClick} sx={{bgcolor:'red'}}>Delete</Button>
                      </DialogActions>
                    </Dialog>

                  <Edit onClick={()=>setDialogState(true)} sx={{color:'#2196f3',':hover':{scale:1.1}}}></Edit>
                  </Box>
  
            </Grid2>
  
        </Grid2>
  
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