"use client";

import { motion } from 'motion/react';
import { useEffect, useState, createContext, useContext } from 'react';

interface Card{
    id: number,
    visibility: boolean,
    color: string
}

const CardContext = createContext<{
    revealed: Card[],
    setRevealed: React.Dispatch<React.SetStateAction<Card[]>>,
    cards: Card[]
} | null>(null);


function shuffle(array: string[]){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function Main(){
    const [revealed, setRevealed] = useState<Card[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [visible, setVisible] = useState<number>(0);
    const colors: string[] = ["green", "green", "red", "red", "blue", "blue", "yellow", "yellow"];

    useEffect(() => {
        const shuffledColors = shuffle(colors);
        const newCards = shuffledColors.map((color, index) => {
            return {
                id: index,
                visibility: true,
                color: color
            };
            });
        setCards(newCards);
        setVisible(newCards.length);
    }, []);

    useEffect(() => {
        setVisible(cards.filter(card => card.visibility !== false).length);
    }, [cards]);

    useEffect(() => {
        if(revealed.length == 2){
            if(revealed[0].color == revealed[1].color){
                const newCards = cards.map(card => {
                    if(card.id === revealed[0].id || card.id === revealed[1].id){
                        return {...card, visibility: false };
                    }
                    return card;
                });
                setCards(newCards);
                setRevealed([]);
            }
        }
    }, [revealed]);

    const mappedCards = cards.map(card => 
        <Card 
            key={card.id}
            id={card.id}
            visibility={card.visibility}
            color={card.color}
        />
    );

    return(
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <div 
            className="grid grid-cols-4 grid-rows-2 gap-4"
            style={{
                perspective: "800px",
            }}
            >
            {
                visible > 0 ?
                    (
                        <CardContext.Provider value={{revealed, setRevealed, cards}}>
                            {mappedCards}
                        </CardContext.Provider>
                    )
                    :
                    (
                        <h1 className="text-2xl">You win</h1>
                    )
            }
            </div>
        </div>
    );
}
  
function Card({id, visibility, color} : {id: number, visibility: boolean; color: string}){
    const [clicked, setClicked] = useState<boolean>(false);
    const cardContext = useContext(CardContext);

    return(
        <motion.div 
        className="bg-blue-500 rounded-lg w-20 aspect-9/16"
        animate={
            clicked ? {rotateY: 0} : {rotateY: 180}
        }
        onClick={() => {
            if(!cardContext) return;

            if(clicked){
                setClicked(false);
                const newRevealed = cardContext.revealed.filter(card => card.id !== id);
                cardContext.setRevealed(newRevealed);
            }else{
                if(cardContext.revealed.length < 2){
                    setClicked(true);
                    const self = cardContext.cards.find(card => card.id == id);
                    if(!self) return;
                    cardContext.setRevealed(prev => [...prev, self]);
                }
            }
        }}
        style={{
            transformStyle: "preserve-3d",
            visibility: visibility ? "visible" : "hidden",
        }}
        >
        <div className="backface-hidden flex items-center justify-center front absolute w-full h-full">
        <div 
        className="rounded-full w-8 aspect-1/1"
        style={{
            background: color,
        }}
        ></div>
        </div>
        </motion.div>
    );
}
