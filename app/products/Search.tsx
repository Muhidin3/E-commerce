'use client'
import { Search, Tune } from "@mui/icons-material"
import { Box,Input } from "@mui/material"
import { useState } from "react"
import MyLoading from "../components/MyLoading"
import FilterDialog from "../components/small/DialogForFilter"

function MySearch({func,searchQuery}:{func:(a:string)=>void,searchQuery?:string}) {
  const [query, setQuery] = useState(searchQuery || '')
  const [loading,setLoading] = useState(false)
  const [dialog,setDialog]= useState<boolean>(false)
  function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setLoading(true)
      func(query)
    }
  }

  if (loading) {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
      return(<MyLoading/>)
    
    
  }
  if (loading) {
    return <MyLoading message="Searching ..."/>
    
  }
  
  return (
    <Box className="relative" sx={{width:'100%'}}>
        <Input value={query} 
               onChange={(e)=>setQuery(e.target.value)} 
               onKeyDown={handleKeyDown} placeholder='Search' className='text-xl outline-0 relative pb-1 w-full' 
               ></Input>

        <Box className='absolute right-0 top-2 cursor-pointer mr-3' >
            <Search onClick={()=>{func(query);setLoading(true)}}/>
            <Tune sx={{position:'relative',left:'10px'}} onClick={()=>setDialog(true)}/>
        </Box>
            <FilterDialog open={dialog} onClose={()=>setDialog(false)}/>        
    </Box>
  )
}

export default MySearch