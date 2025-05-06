'use client'
import { Search, Tune } from "@mui/icons-material"
import { Box, useTheme } from "@mui/material"
import { useState } from "react"
import MyLoading from "../components/MyLoading"
import FilterDialog from "../components/small/DialogForFilter"

function MySearch({func,searchQuery}:{func:(a:string)=>void,searchQuery?:string}) {
  const [query, setQuery] = useState(searchQuery || '')
  const [loading,setLoading] = useState(false)
  const [dialog,setDialog]= useState<boolean>(false)
  const theme = useTheme()
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
        <input value={query} 
               onChange={(e)=>setQuery(e.target.value)} 
               onKeyDown={handleKeyDown} placeholder='search' 
               style={{color:theme.palette.text.secondary}}
               className='text-lg outline-0 relative pb-1 w-full mt-2 border-b-blue-200 border-b-2 focus:border-b-blue-500 focus:outline-none' type="text"
               ></input>

        <Box className='absolute right-0 top-2 cursor-pointer mr-3' >
            <Search onClick={()=>{func(query);setLoading(true)}}/>
            <Tune sx={{position:'relative',left:'10px'}} onClick={()=>setDialog(true)}/>
        </Box>
            <FilterDialog open={dialog} onClose={()=>setDialog(false)}/>        
    </Box>
  )
}

export default MySearch