"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Coord {
  xPos: number;
  yPos: number;
}

interface Mole{
    id: number,
    coord: {xPos: number, yPos: number}
}

export default function WhackAMole() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState<number>(0);
  const [moles, setMoles] = useState<Mole[]>([]);
  const [arenaBounds, setArenaBounds] = useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0
  });

  const moleSize = 3 * 16;
  const mappedMoles = moles.map(mole => 
    <Mole 
      key={mole.id}
      setMoles={setMoles}
      id={mole.id}
      setScore={setScore}
      coord={mole.coord}
    />
  );

  useEffect(() => {
    if (arenaRef.current) {
      const rect = arenaRef.current.getBoundingClientRect();
      setArenaBounds({
        minX: rect.left + moleSize,
        maxX: rect.left + rect.width - moleSize,
        minY: rect.top + moleSize,
        maxY: rect.top + rect.height - moleSize
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        setMoles(prev => [...prev, {
            id: Date.now(), 
            coord: getRandomPos(arenaBounds)
        }])
    }, 3000);
    return () => clearInterval(interval);

  }, [arenaBounds]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div ref={arenaRef} className="arena w-[90%] h-[90%] bg-gray-700 relative">
        <div 
          className="bg-blue-500 rounded-lg w-20 text-center absolute top-4 right-4"
        >{score}</div>
        <AnimatePresence>
          {mappedMoles}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Mole({ coord, setScore, id, setMoles }: { coord: Coord; setScore: React.Dispatch<React.SetStateAction<number>>; id: number; setMoles: React.Dispatch<React.SetStateAction<Mole[]>>; }) {
  const { xPos, yPos } = coord;

  return (
    <motion.div
      key={id}
      initial={{ scale: 0, x: xPos, y: yPos }}
      animate={{ scale: 1, x: xPos, y: yPos }}
      exit={{ scale: 0, x: xPos, y: yPos }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        setScore(prev => prev + 1);
          setMoles(prev => prev.filter(mole => mole.id !== id));
      }}
      className="w-[3rem] h-[3rem] bg-blue-500 absolute"
    />
  );
}

function getRandomPos({ minX, maxX, minY, maxY }: { minX: number; maxX: number; minY: number; maxY: number }) {
  const xPos = Math.random() * (maxX - minX) + minX;
  const yPos = Math.random() * (maxY - minY) + minY;
  return { xPos, yPos };
}

