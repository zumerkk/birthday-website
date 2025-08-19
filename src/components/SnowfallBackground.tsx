import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Snowflake } from '../types';

interface SnowfallBackgroundProps {
  particleCount?: number;
}

const SnowfallBackground: React.FC<SnowfallBackgroundProps> = ({ particleCount = 50 }) => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const createSnowflake = (id: number): Snowflake => ({
      id,
      x: Math.random() * window.innerWidth,
      y: -10,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.4,
    });

    const initialSnowflakes = Array.from({ length: 80 }, (_, i) => ({
      ...createSnowflake(i),
      y: Math.random() * window.innerHeight,
    }));

    setSnowflakes(initialSnowflakes);

    const animateSnowflakes = () => {
      setSnowflakes(prev => 
        prev.map(snowflake => {
          const newY = snowflake.y + snowflake.speed;
          if (newY > window.innerHeight + 10) {
            return createSnowflake(snowflake.id);
          }
          return { ...snowflake, y: newY };
        })
      );
    };

    const interval = setInterval(animateSnowflakes, 50);
    return () => clearInterval(interval);
  }, [particleCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {snowflakes.map(snowflake => (
        <motion.div
          key={snowflake.id}
          className="absolute text-white text-opacity-80"
          style={{
            left: snowflake.x,
            top: snowflake.y,
            fontSize: snowflake.size,
            opacity: snowflake.opacity,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❄
        </motion.div>
      ))}
    </div>
  );
};

export default SnowfallBackground;