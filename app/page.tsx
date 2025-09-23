"use client";

import { useRouter } from "next/navigation";

export default function Home(){
    const router = useRouter();

    return(
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <h1 className="text-4xl font-bold">WELCOME</h1>
            <h2 className="text-lg font-medium">Choose a feature:</h2>
            <ol className="list-disc underline">
                <li 
                className="cursor-pointer"
                onClick={() => router.push('/cards')}
                >Cards</li>
                <li 
                className="cursor-pointer"
                onClick={() => router.push('/sidebar')}
                >Sidebar</li>
                <li 
                className="cursor-pointer"
                onClick={() => router.push('/faq')}
                >Faq</li>
                <li 
                className="cursor-pointer"
                onClick={() => router.push('/gallery')}
                >Gallery</li>
                <li 
                className="cursor-pointer"
                onClick={() => router.push('/whack')}
                >Whack A Mole</li>
                <li 
                className="cursor-pointer"
                onClick={() => router.push('/memory')}
                >Memory Game</li>
            </ol>
        </div>
    );
}
