import React from 'react';
import { motion } from 'framer-motion';
import type { GiftBoxState } from '../types';
import { Sparkles } from 'lucide-react';

interface GiftBoxProps {
  giftBoxState: GiftBoxState;
  onOpen: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ giftBoxState, onOpen }) => {
  const { isOpened, isAnimating } = giftBoxState;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 3D Container with perspective */}
      <div className="perspective-1000 transform-gpu">
        <motion.div
          className="relative cursor-pointer touch-manipulation transform-gpu"
          onClick={!isOpened ? onOpen : undefined}
          whileHover={!isOpened ? { 
            scale: 1.08, 
            rotateY: 5, 
            rotateX: -5,
            filter: "brightness(1.1) drop-shadow(0 25px 50px rgba(0,0,0,0.4))"
          } : {}}
          whileTap={!isOpened ? { scale: 0.92 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          animate={{
            y: isOpened ? 0 : -8,
            filter: isOpened ? "brightness(1.2) drop-shadow(0 30px 60px rgba(255,215,0,0.3))" : "brightness(1) drop-shadow(0 20px 40px rgba(0,0,0,0.3))"
          }}
          style={{
            transformStyle: "preserve-3d",
            animation: !isOpened ? "float 3s ease-in-out infinite" : "none"
          }}
        >
          {/* Gift Box Base - Enhanced with 3D effects */}
          <motion.div
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 relative transform-gpu"
            style={{
              background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 25%, #991b1b 50%, #7f1d1d 75%, #dc2626 100%)",
              borderRadius: "12px",
              boxShadow: `
                0 0 0 2px rgba(153, 27, 27, 0.8),
                0 8px 32px rgba(0, 0, 0, 0.4),
                inset 0 2px 8px rgba(255, 255, 255, 0.2),
                inset 0 -2px 8px rgba(0, 0, 0, 0.3),
                0 0 40px rgba(220, 38, 38, 0.3)
              `,
              transformStyle: "preserve-3d"
            }}
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: isOpened ? 180 : 0,
              scale: isAnimating ? [1, 1.15, 1] : 1,
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
          >
            {/* Metallic shine overlay */}
            <div 
              className="absolute inset-0 rounded-lg opacity-30"
              style={{
                background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
                animation: isOpened ? "none" : "shine 3s ease-in-out infinite"
              }}
            />
            
            {/* Texture pattern */}
            <div 
              className="absolute inset-0 rounded-lg opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, rgba(0,0,0,0.2) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px"
              }}
            />
            {/* Luxury Vertical Ribbon */}
            <motion.div
              className="absolute top-0 left-1/2 w-5 sm:w-7 md:w-10 h-full transform -translate-x-1/2 z-10"
              style={{
                background: "linear-gradient(to bottom, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #fbbf24 100%)",
                boxShadow: `
                  0 0 20px rgba(251, 191, 36, 0.5),
                  inset 2px 0 4px rgba(255, 255, 255, 0.4),
                  inset -2px 0 4px rgba(0, 0, 0, 0.3),
                  0 4px 12px rgba(0, 0, 0, 0.3)
                `,
                borderRadius: "2px"
              }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: isOpened ? 0 : 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Ribbon shine effect */}
              <div 
                className="absolute inset-0 opacity-60"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                  animation: "ribbonShine 2s ease-in-out infinite"
                }}
              />
            </motion.div>
            
            {/* Luxury Horizontal Ribbon */}
            <motion.div
              className="absolute top-1/2 left-0 w-full h-5 sm:h-7 md:h-10 transform -translate-y-1/2 z-10"
              style={{
                background: "linear-gradient(to right, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #fbbf24 100%)",
                boxShadow: `
                  0 0 20px rgba(251, 191, 36, 0.5),
                  inset 0 2px 4px rgba(255, 255, 255, 0.4),
                  inset 0 -2px 4px rgba(0, 0, 0, 0.3),
                  0 4px 12px rgba(0, 0, 0, 0.3)
                `,
                borderRadius: "2px"
              }}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: isOpened ? 0 : 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Ribbon shine effect */}
              <div 
                className="absolute inset-0 opacity-60"
                style={{
                  background: "linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                  animation: "ribbonShine 2s ease-in-out infinite 0.5s"
                }}
              />
            </motion.div>
          
            {/* Enhanced Sparkle Effects */}
            {isOpened && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300"
                    style={{
                      top: `${20 + (i % 4) * 20}%`,
                      left: `${20 + (i % 3) * 30}%`,
                      fontSize: `${1.2 + (i % 3) * 0.3}rem`,
                      filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))"
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2 + (i % 3) * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {i % 3 === 0 ? '✨' : i % 3 === 1 ? '💫' : '⭐'}
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>

          {/* Enhanced Gift Box Lid */}
          <motion.div
            className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-4 md:-left-4 w-32 h-8 sm:w-42 sm:h-10 md:w-60 md:h-16 transform-gpu"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 25%, #b91c1c 50%, #991b1b 75%, #ef4444 100%)",
              borderRadius: "12px",
              boxShadow: `
                0 0 0 2px rgba(153, 27, 27, 0.8),
                0 12px 40px rgba(0, 0, 0, 0.5),
                inset 0 3px 12px rgba(255, 255, 255, 0.3),
                inset 0 -3px 12px rgba(0, 0, 0, 0.4),
                0 0 50px rgba(239, 68, 68, 0.4)
              `,
              transformStyle: "preserve-3d"
            }}
            initial={{ rotateX: 0, y: 0, z: 0 }}
            animate={{
              rotateX: isOpened ? -60 : 0,
              y: isOpened ? -30 : 0,
              z: isOpened ? 20 : 0,
            }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            {/* Lid shine overlay */}
            <div 
              className="absolute inset-0 rounded-lg opacity-40"
              style={{
                background: "linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.7) 50%, transparent 80%)",
                animation: isOpened ? "none" : "lidShine 4s ease-in-out infinite"
              }}
            />
            {/* Luxury Bow */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{
                scale: isOpened ? 0 : [1, 1.1, 1],
                rotate: isOpened ? 180 : [0, 5, -5, 0]
              }}
              transition={{ 
                duration: isOpened ? 0.5 : 3,
                repeat: isOpened ? 0 : Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <Sparkles 
                  className="w-8 h-8 md:w-12 md:h-12 text-yellow-400"
                  style={{
                    filter: "drop-shadow(0 0 12px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.4))"
                  }}
                />
                {/* Bow glow effect */}
                <div 
                  className="absolute inset-0 w-8 h-8 md:w-12 md:h-12 rounded-full opacity-60"
                  style={{
                    background: "radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)",
                    animation: "bowGlow 2s ease-in-out infinite alternate"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Click instruction */}
      {!isOpened && (
        <motion.p
          className="text-white text-base sm:text-lg md:text-xl font-poppins mt-4 sm:mt-6 text-center px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🎁 Hediyeni açmak için tıkla! 🎁
        </motion.p>
      )}
    </div>
  );
};

export default GiftBox;