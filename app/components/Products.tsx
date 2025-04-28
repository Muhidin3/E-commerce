/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Input, Typography } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '../products/page'
import { Search } from '@mui/icons-material'
import MySearch from '../products/Search'

function Products({items,func,searchQuery}:{items:Product[],func:(a:string)=>void,searchQuery?:string}) {



  return (
    <Box sx={{p:0}} >
      <Box sx={{display:'flex',flexDirection:'row',}}>
            <Typography sx={{ minWidth: '100px', p: 1,display:{xs:'none',sm:'block',mr:1},fontSize:'2rem',fontWeight:'bold'}}>
              Products
              </Typography> 

            <Box sx={{ minWidth: '10px', p: 1,mx:3}} className='sm:w-xl'>
              <MySearch func={func} searchQuery={searchQuery}/>
            </Box>
      </Box>

      {items?<Grid container spacing={1} sx={{borderRadius:'10px'}}>
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
        </Grid>:<><Typography>No product found</Typography></>}
        
      </Box>
  )
}

export default Products