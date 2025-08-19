import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { ConfettiParticle } from '../types';

interface ConfettiEffectProps {
  isActive: boolean;
  particleCount?: number;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ isActive, particleCount = 100 }) => {
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE', '#FEF3C7', '#FDE68A'];

  useEffect(() => {
    if (!isActive) {
      setConfetti([]);
      return;
    }

    const createConfettiParticle = (id: number): ConfettiParticle => ({
      id,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
      vx: (Math.random() - 0.5) * 4,
      vy: -(Math.random() * 8 + 5),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    });

    const initialConfetti = Array.from({ length: particleCount }, (_, i) => 
      createConfettiParticle(i)
    );

    setConfetti(initialConfetti);

    const animateConfetti = () => {
      setConfetti(prev => 
        prev.map(particle => {
          const newX = particle.x + particle.vx;
          const newY = particle.y + particle.vy;
          const newVy = particle.vy + 0.3; // gravity
          const newRotation = particle.rotation + particle.rotationSpeed;

          if (newY > window.innerHeight + 50) {
            return createConfettiParticle(particle.id);
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vy: newVy,
            rotation: newRotation,
          };
        })
      );
    };

    const interval = setInterval(animateConfetti, 50);
    return () => clearInterval(interval);
  }, [isActive, particleCount]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {confetti.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;