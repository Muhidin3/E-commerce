'use client'
import { Search } from "@mui/icons-material"
import { Box,Input } from "@mui/material"
import { useState } from "react"

function MySearch({func,searchQuery}:{func:(a:string)=>void,searchQuery?:string}) {
  const [query, setQuery] = useState(searchQuery || '')
  function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      func(query)
    }

  }
  
  
  return (
    <div className="relative">
        <Input value={query} onChange={(e)=>setQuery(e.target.value)} 
                              onKeyDown={handleKeyDown} placeholder='Search' className='text-xl outline-0 relative pb-1' style={{width:'100%',borderRadius:'10px'}}></Input>
        <Box className='absolute right-0 top-2 cursor-pointer mr-3' onClick={()=>func(query)}>
          <Search />
        </Box>
    </div>
  )
}

export default MySearch