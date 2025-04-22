'use client'
import { Search } from "@mui/icons-material"
import { Input } from "@mui/material"

function MySearch({change}:{change:(a:string)=>void}) {

  return (
    <div>
        <Input onChange={(e)=>change(e.target.value)} placeholder='Search' className='text-xl outline-0 relative pb-1' style={{width:'100%',borderRadius:'10px'}}></Input>
        <Search className='absolute right--5 top-2 cursor-pointer mr-3'/>
    </div>
  )
}

export default MySearch