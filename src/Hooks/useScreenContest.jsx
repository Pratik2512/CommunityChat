import { useContext, useEffect } from "react";
import { ScreenContext } from "../Context/ScreenContext";

const useScreenContext = ()=>{
    const {size,setSize} = useContext(ScreenContext);
    useEffect(()=>{
        const handleResize = ()=>{
            setSize([window.innerHeight,window.innerWidth]);
        }
        window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("resize", handleResize);
        }
    },[])
    return {size,setSize};
}

export default useScreenContext;