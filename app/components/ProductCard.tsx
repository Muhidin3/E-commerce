'use client'
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '../products/page';
import MyLoading from './MyLoading';


const style = {
  root: {
    cursor:'pointer',
    maxWidth: 345,
    margin: '20px',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.01)',
    },
    height:'310px',
    borderRadius:'10px',
    zIndex:0
  },
  media: {
    height: 140,
    borderRadius:'0px 0px 5px 5px',
  },
  price: {
    fontWeight: 'bold',
    marginTop: '5px',
  },
  date: {
    color: 'gray',
    marginTop: '10px',
  },
}
const ProductCard= ({ productName, description, image, price,_id,condition  }:Product) => {
  const [width,setWidth] = useState(700)
  useEffect(()=>{
    setWidth(window.innerWidth)
  
  
  },[])
    if (width<600) {
      
    }
  const[ loading,setLoading] = useState(false)
  const router = useRouter()
  const handleClick = ()=>{
    setLoading(true)
    router.push(`/products/${_id}`)
}
if(loading){
  return (<MyLoading/>)
}



  return (

    <div onClick={handleClick}>
    <Card style={style.root}>

      <div style={style.media} >
        {/* <CardMedia image={image} title={title}    /> */}
        <Image src={`/uploads/${image}`} style={{height:'100%',justifySelf:'center',width:'auto'}}  alt='product image'  width={1000} height={1000} />
        
      </div>

      <CardContent className='relative'>
        <Typography variant="h5" sx={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',fontSize:'clamp(12px,2.5vw,30px)'}}>
          {productName}
        </Typography>
        <Typography variant="body2" className='line-clamp-2' color="textSecondary" component="p" sx={{maxHeight:'40px',display:'inline-block'}}>
          {description.slice(0,50)}
        </Typography>
        <Typography style={style.price} variant="h6" component="div">
          {price} Birr
        </Typography>

        <Typography style={style.date} variant="body2" component="div">
          5 days ago 
        </Typography>
        <Typography className='absolute right-4 bottom-4 rounded-3xl p-2' sx={{color:condition=='new'?'green':'orange',bgcolor:'#',fontSize:'.9rem'}}>
          {condition.toLocaleUpperCase()}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
};

export default ProductCard;
