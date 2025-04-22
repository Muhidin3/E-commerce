'use client'
import { DarkModeOutlined,LightModeOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useThemeMode } from "../Theme";

const ColourMode = ()=>{
  'use client'
  const { toggleColorMode,mode } = useThemeMode();
  return(<>
      <Box onClick={()=>toggleColorMode()} sx={{':active':{bgcolor:'rgba(200,200,200,0.5)'},ml:2,border:'1px solid silver',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',p:'3px',':hover':{scale:1.1}}} >
              {mode=='dark'? <LightModeOutlined/>:<DarkModeOutlined/>}
      </Box>
  
  
  </>)
}



export default ColourMode