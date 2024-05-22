import { useState } from "react"

export const useToggle = () =>{
    const [toggle, setToggle] = useState(false);

    const toggleExpand = () => setToggle(prev => !prev);

    return {toggle, toggleExpand};
}