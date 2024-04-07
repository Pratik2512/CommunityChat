import { createContext, useState } from "react";

export const ScreenContext = createContext();

export const ScreenProvider = ({children})=>{

    const [size,setSize] = useState([window.innerHeight,window.innerWidth]);

    return <ScreenContext.Provider value={{size,setSize}}>
        {children}
    </ScreenContext.Provider>
}