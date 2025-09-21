"use client";

import { motion } from 'motion/react';
import { useState, useRef, useContext, createContext } from 'react';

export default function Cards() {
  const [cards, setCards] = useState<number[]>([]);
  return (
    <div className="w-full h-screen">
      <button
        className="rounded-lg px-4 py-2 bg-blue-500"
        onClick={() => setCards(prev => [...prev, Date.now()])}
      >
        Add Card
      </button>
      <Deck cards={cards} setCards={setCards} />
    </div>
  );
}

const DeckContext = createContext<React.RefObject<HTMLDivElement> | null>(null);

function Deck({ cards, setCards }: { cards: number[]; setCards: React.Dispatch<React.SetStateAction<number[]>> }) {
  const deleteRef = useRef<HTMLDivElement>(null);

  return (
    <DeckContext.Provider value={deleteRef}>
      <div className="absolute left-0 bottom-0 flex items-end gap-4 p-4">
        {cards.map(id => (
          <Card key={id} id={id} setCards={setCards} />
        ))}
      </div>
      <div
        className="w-16 h-16 bg-blue-200 absolute right-0 top-[50%] translate-y-[-50%] hidden"
        ref={deleteRef}
      ></div>
    </DeckContext.Provider>
  );
}

function Card({ id, setCards }: { id: number; setCards: React.Dispatch<React.SetStateAction<number[]>> }) {
  const ref = useRef<HTMLDivElement>(null);
  const deleteRef = useContext(DeckContext);

  return (
    <motion.div
      ref={ref}
      className="static w-20 h-40 aspect-1/2 bg-blue-500 rounded-lg"
      drag
      dragSnapToOrigin
      dragMomentum={false}
      onDrag={() => {
        if (deleteRef?.current) deleteRef.current.style.display = "block";
      }}
      onDragEnd={(e, info) => {
        if (!deleteRef?.current) return;

        if (isMouseInside(info.point, deleteRef.current)) {
          setCards(prev => prev.filter(x => x !== id));
            deleteRef.current.style.display = "none";
        } else {
          console.log("not deleted");
        }
      }}
    >
    </motion.div>
  );
}

function isMouseInside(point: { x: number; y: number }, element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const left = rect.left + window.scrollX;
  const right = rect.right + window.scrollX;
  const top = rect.top + window.scrollY;
  const bottom = rect.bottom + window.scrollY;

  return (
    point.x >= left &&
    point.x <= right &&
    point.y >= top &&
    point.y <= bottom
  );
}
