'use client'
import { createContext, useContext,useState } from "react";
import Snackbar from '@mui/material/Snackbar'
import { Alert , AlertColor } from "@mui/material";

type SnackbarContextType = (message: string, severity?: 'error' | 'warning' | 'info' | 'success') => void;

interface SnackbarState {
    open: boolean;
    message: string;
    severity: AlertColor; // 👈 use AlertColor (from MUI)
  }

const SnackbarContext = createContext<SnackbarContextType>(()=>{});

export const useSnackbar = ()=>{
    return useContext(SnackbarContext);
};

export const SnackbarProvider = ({children}:{children:React.ReactNode})=>{
    const [snackbar,setSnackBar]= useState<SnackbarState>({open:false,message:'',severity:'info'});

    const showSnackbar =(message:string,severity:AlertColor= 'info')=>{
        setSnackBar({open:true,message,severity})
    };

    const handleClose = ()=>{
        setSnackBar({...snackbar,open:false})
    };
    
    return(
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <Snackbar open={snackbar.open} 
                      autoHideDuration={5000}
                      onClose={handleClose}
                      anchorOrigin={{vertical:"top",horizontal:'center'}}>
                <Alert onClose={handleClose} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};