'use client'
import { Search } from "@mui/icons-material"
import { Box,Input } from "@mui/material"
import { useState } from "react"
import MyLoading from "../components/MyLoading"

function MySearch({func,searchQuery}:{func:(a:string)=>void,searchQuery?:string}) {
  const [query, setQuery] = useState(searchQuery || '')
  const [loading,setLoading] = useState(false)
  function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setLoading(true)
      func(query)

    }

  }
  
  
  return (
    <div className="relative">
      <MyLoading bool={loading}/>
        <Input value={query} onChange={(e)=>setQuery(e.target.value)} 
                              onKeyDown={handleKeyDown} placeholder='Search' className='text-xl outline-0 relative pb-1' style={{width:'100%',borderRadius:'10px'}}></Input>
        <Box className='absolute right-0 top-2 cursor-pointer mr-3' onClick={()=>{func(query);setLoading(true)}}>
          <Search />
        </Box>
    </div>
  )
}

export default MySearch