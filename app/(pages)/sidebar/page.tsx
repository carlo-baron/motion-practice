"use client";

import { useState, useRef } from 'react';
import { motion } from 'motion/react';

export default function SideBar(){

    return(
        <div className="w-full h-screen flex">
            <Bar />
            <h1>Contents Go Here</h1>
        </div>
    );
}

function Bar(){
    const [reveal, setReveal] = useState<boolean>(false);
    const ref = useRef();
    
    return(
        <>
        <motion.div 
        className="fixed sidebar bg-blue-500 w-[30%] h-screen"
        ref={ref}
        initial={{x: "-100%"}}
        animate={
            reveal ? 
                {
                    x: "0%",
                }
            :
                {
                    x: "-100%",
                }
        }
        transition={{type: "ease", duration: 0.3}}
        ></motion.div>            
        <motion.div 
        layout
        className="fixed arrow flex items-center justify-center w-4 h-16 bg-blue-500 outline-solid self-center"
        initial={{x: "0%"}}
        animate={
            ref.current ? 
                reveal ? 
                {
                    x: ref.current.getBoundingClientRect().width
                } : 
                {
                    x: "0%"
                }
                :
                {}
        }
        transition={{type: "ease", duration: 0.3}}
        onClick={() => setReveal(!reveal)}
        >
            {reveal ? "<" : ">"}
        </motion.div>
        </>
    );
}
