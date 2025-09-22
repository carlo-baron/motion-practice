"use client";

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import styles from './style.module.css';

export default function Main(){
    return(
        <div className="flex flex-col w-full h-screen items-center">
            <ExpandingCard>
                Hello, kamusta
            </ExpandingCard>
            <ExpandingCard>
                <ExpandingCard>
                </ExpandingCard>
            </ExpandingCard>
        </div>
    );
}

function ExpandingCard({children=null} : {children?: React.ReactNode}){
    const [expanded, setExpanded] = useState<boolean>(false);

    return(
        <div className="w-[80%]">
            <div className="p-4 h-16 bg-blue-500 flex justify-between rounded-lg">
                <p className="text-xl font-semibold">Title goes here.</p>
                <button 
                    className="cursor-pointer"
                    onClick={() => setExpanded(!expanded)}
                >
                [{expanded ? "Collapse" : "Expand"}]</button>
            </div>
            <AnimatePresence>
                {expanded ? 
                        <motion.div 
                        className={`${styles.scrollable} rounded-lg h-40 w-full bg-green-500`}
                        initial={{height: "0rem"}}
                        animate={{height: "10rem"}}
                        exit={{height: "0rem"}}
                        transition={{type: "ease", duration: 0.4}}
                        >
                            {children}
                        </motion.div>
                    :
                        null
                }
            </AnimatePresence>
        </div>
    );
}
