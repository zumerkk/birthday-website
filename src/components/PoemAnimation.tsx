import React from 'react';
import { motion } from 'framer-motion';
import type { PoemLine } from '../types';

interface PoemAnimationProps {
  isVisible: boolean;
}

const PoemAnimation: React.FC<PoemAnimationProps> = ({ isVisible }) => {
  // Function to highlight special words
  const renderTextWithHighlights = (text: string, delay: number) => {
    const words = text.split(' ');
    return words.map((word, wordIndex) => {
      const cleanWord = word.replace(/[.,!?]/g, '');
      const punctuation = word.replace(/[^.,!?]/g, '');
      
      if (cleanWord === 'Berfin') {
        return (
          <React.Fragment key={wordIndex}>
            <motion.span
              className="text-pink-300 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl"
              style={{
                textShadow: '0 0 20px rgba(255, 182, 193, 0.8)',
                fontFamily: 'Dancing Script, cursive'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 182, 193, 0.8)',
                  '0 0 30px rgba(255, 182, 193, 1)',
                  '0 0 20px rgba(255, 182, 193, 0.8)',
                ],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay + wordIndex * 0.1,
              }}
            >
              {cleanWord}
            </motion.span>
            {punctuation && <span>{punctuation}</span>}
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        );
      } else if (cleanWord === 'Kar' && words[wordIndex + 1]?.replace(/[.,!?]/g, '') === 'Tanesi') {
        return (
          <React.Fragment key={wordIndex}>
            <motion.span
              className="text-cyan-300 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl"
              style={{
                textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                fontFamily: 'Dancing Script, cursive'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(0, 255, 255, 0.8)',
                  '0 0 30px rgba(0, 255, 255, 1)',
                  '0 0 20px rgba(0, 255, 255, 0.8)',
                ],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay + wordIndex * 0.1,
              }}
            >
              {cleanWord} {words[wordIndex + 1]?.replace(/[.,!?]/g, '')}
            </motion.span>
            {words[wordIndex + 1]?.replace(/[^.,!?]/g, '') && <span>{words[wordIndex + 1].replace(/[^.,!?]/g, '')}</span>}
            {wordIndex < words.length - 2 && ' '}
          </React.Fragment>
        );
      } else if (words[wordIndex - 1]?.replace(/[.,!?]/g, '') === 'Kar' && cleanWord === 'Tanesi') {
        // Skip this word as it's already handled in the previous condition
        return null;
      } else {
        return (
          <React.Fragment key={wordIndex}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: delay + wordIndex * 0.1,
              }}
            >
              {word}
            </motion.span>
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        );
      }
    });
  };

  const poemLines: PoemLine[] = [
    {
      letter: 'B',
      text: 'Bir yaz günü çok güzel bir çiçek doğmuş,',
      delay: 0,
    },
    {
      letter: 'E',
      text: 'En güzel çiçekler yanında solmuş,',
      delay: 1,
    },
    {
      letter: 'R',
      text: 'Renkler, gülüşüyle varolmuş,',
      delay: 2,
    },
    {
      letter: 'F',
      text: 'Farkında olmasanda bende ki kıymetinin,',
      delay: 3,
    },
    {
      letter: 'İ',
      text: 'İlk düşen Kar Tanesi kadar özelsin',
      delay: 4,
    },
    {
      letter: 'N',
      text: 'Nice mutlu yıllara Berfin, sen her halinle güzelsin.',
      delay: 5,
    },
  ];

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-4 sm:mt-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-dancing text-white mb-2 px-2">
          🎂 Doğum Günün Kutlu Olsun Berfin! 🎂
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 mx-auto rounded-full" />
      </motion.div>

      <div className="space-y-3 sm:space-y-6">
        {poemLines.map((line, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-2 sm:space-x-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 mx-2 sm:mx-0"
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: line.delay + 1,
              ease: "easeOut",
            }}
          >
            {/* Letter */}
            <motion.div
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-light to-blue-primary rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: line.delay + 1.2,
                type: "spring",
                stiffness: 200,
              }}
            >
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl font-poppins">
                {line.letter}
              </span>
            </motion.div>

            {/* Text */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: line.delay + 1.5,
              }}
            >
              <motion.p
                className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-poppins leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: line.delay + 1.5,
                }}
              >
                {renderTextWithHighlights(line.text, line.delay + 1.5)}
              </motion.p>
            </motion.div>

            {/* Sparkle effect */}
            <motion.div
              className="flex-shrink-0 text-yellow-300 text-xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: line.delay + 2,
              }}
            >
              ✨
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Final message */}
      <motion.div
        className="text-center mt-12 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 7,
          type: "spring",
          stiffness: 100,
        }}
      >
        <div className="bg-gradient-to-r from-blue-light to-blue-primary rounded-full px-8 py-4 inline-block shadow-2xl">
          <p className="text-white text-xl md:text-2xl font-dancing font-semibold">
            🎉 Kar Tanesi Kadar Özel Berfin! 🎉
          </p>
        </div>
        
        <motion.div
          className="mt-6 flex justify-center space-x-4"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-4xl">🎂</span>
          <span className="text-4xl">🎈</span>
          <span className="text-4xl">🎁</span>
          <span className="text-4xl">❄️</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PoemAnimation;