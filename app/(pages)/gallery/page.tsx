"use client";

import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';

export default function Main(){
    return(
        <div
        className="w-full h-screen flex items-center justify-center"
        >
            <div
            className="border-gray-500 w-[80%] grid grid-cols-3 grid-rows-2 gap-4"
            >
                <Image src={"https://images.unsplash.com/photo-1758274406801-53151bcb4af7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
                <Image src={"https://images.unsplash.com/photo-1592867618416-f57f3cbadfed?q=80&w=734&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
                <Image src={"https://images.unsplash.com/photo-1660940797486-930ec45fe131?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
                <Image src={"https://images.unsplash.com/photo-1626794149408-4c12f28321bc?q=80&w=826&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
                <Image src={"https://images.unsplash.com/photo-1626794060904-d15303736722?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
                <Image src={"https://images.unsplash.com/photo-1723053179998-8c82c0ac5c4c?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
            </div>
        </div>
    );
}

function Image({src}:{src: string}){
    const [clicked, setClicked] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    let animate = {scale: 1, x: 0, y: 0};

    if(ref.current && clicked){
        const rect = ref.current.getBoundingClientRect();
        const centerX = window.innerWidth / 2 - (rect.left + rect.width / 2)
        const centerY = window.innerHeight / 2 - (rect.top + rect.height / 2)

        animate = {
            scale: 2,
            x: centerX,
            y: centerY,
            zIndex: 1
        }
    }

    return(
        <>
        <motion.img 
        ref={ref}
        className="aspect-9/16 object-cover" 
        src={src} 
        alt="" 
        onClick={() => {
            setClicked(!clicked);
        }}
        animate={animate}
        transition={{type: "tween", duration: 0.2}}
        />
        {
            clicked ?
            <div className="fixed w-full h-screen bg-black opacity-50"></div>
            :
            null
        }
        </>
    );
}
