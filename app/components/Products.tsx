import { Box, Grid, Input, Typography } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '../products/page'
import { Search } from '@mui/icons-material'

function Products({items}:{items:Product[]}) {



  return (
    <Box sx={{p:0}}>
      <Typography sx={{
                        display:'inline-block',
                        fontSize:'30px',p:1,pr:5,
                        borderRadius:'20px 20px 0 0'}}>Products</Typography> 

      <Box className='relative inline-block size-10 m-1 bottom-2 pl-1 pt-1' sx={{width:'70%',borderBottom:'1px solid #f2f2f2'}}>
      {/* <MySearch change={handleChangeQuery}/> */}
      <Input  placeholder='Search' className='text-xl outline-0 relative pb-1' style={{width:'100%',borderRadius:'10px'}}></Input>
        <Search className='absolute right--5 top-2 cursor-pointer mr-3'/>
      </Box>

      <Grid container spacing={1} sx={{borderRadius:'10px'}}>
          {items.map((item, index) => (
            <Grid key={index} item  xs={12} sm={6} md={4} lg={3} xl={2} >
              <ProductCard 
                productName={item.productName} 
                description={item.description} 
                price={item.price} 
                image={item.image}
                _id={item._id}
                condition={item.condition}
                subcategory={item.subcategory}
                category={item.category}
                />
            </Grid>
          ))}
        </Grid>
        
      </Box>
  )
}

export default Products