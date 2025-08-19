import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SnowfallBackground from './components/SnowfallBackground';
import GiftBox from './components/GiftBox';
import PoemAnimation from './components/PoemAnimation';
import ConfettiEffect from './components/ConfettiEffect';
import type { GiftBoxState } from './types';

function App() {
  const [giftBoxState, setGiftBoxState] = useState<GiftBoxState>({
    isOpened: false,
    isAnimating: false,
  });
  const [showPoem, setShowPoem] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showGiftBox, setShowGiftBox] = useState(false);

  const handleWelcomeComplete = () => {
    setShowWelcomeMessage(false);
    setTimeout(() => {
      setShowGiftBox(true);
    }, 500);
  };

  const handleGiftBoxOpen = () => {
    if (giftBoxState.isOpened || giftBoxState.isAnimating) return;

    setGiftBoxState({ isOpened: false, isAnimating: true });
    
    // Start confetti immediately
    setShowConfetti(true);
    
    // Open the gift box after a short delay
    setTimeout(() => {
      setGiftBoxState({ isOpened: true, isAnimating: false });
    }, 600);
    
    // Show poem after gift box opens
    setTimeout(() => {
      setShowPoem(true);
    }, 1200);
  };

  // Auto-advance from welcome message after 4 seconds
  useEffect(() => {
    if (showWelcomeMessage) {
      const timer = setTimeout(() => {
        handleWelcomeComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-deep via-blue-primary to-blue-light relative overflow-hidden">
      {/* Snowfall Background */}
      <SnowfallBackground particleCount={60} />
      
      {/* Confetti Effect */}
      <ConfettiEffect isActive={showConfetti} particleCount={80} />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="text-center pt-8 pb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-dancing text-white font-bold mb-2"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,255,255,0.5)",
                "0 0 30px rgba(255,255,255,0.8)",
                "0 0 20px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ❄️ Berfin'e Özel ❄️
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-poppins text-blue-pale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Kar Tanesi Kadar Özel Bir Sürpriz
          </motion.p>
        </motion.header>

        {/* Welcome Message Section */}
        {showWelcomeMessage && (
          <motion.div
            className="flex-1 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            <motion.div
               className="text-center max-w-2xl cursor-pointer touch-manipulation"
               onClick={handleWelcomeComplete}
               whileTap={{ scale: 0.98 }}
             >
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(255,255,255,0.3)",
                    "0 0 50px rgba(255,255,255,0.5)",
                    "0 0 30px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.h2
                   className="text-xl sm:text-2xl md:text-4xl font-dancing text-white mb-4 md:mb-6 leading-relaxed px-2"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 1, delay: 0.5 }}
                 >
                  💝 Zümer'den bu yıl hayatıma anlam katan anlamlı insanlardan biri olan{" "}
                  <motion.span
                     className="text-yellow-300 font-bold text-2xl sm:text-3xl md:text-5xl block sm:inline"
                     animate={{
                       textShadow: [
                         "0 0 20px rgba(255,255,0,0.8)",
                         "0 0 30px rgba(255,255,0,1)",
                         "0 0 20px rgba(255,255,0,0.8)",
                       ],
                     }}
                     transition={{
                       duration: 1.5,
                       repeat: Infinity,
                       ease: "easeInOut",
                     }}
                   >
                    Berfin'e
                  </motion.span>{" "}
                  💝
                </motion.h2>
                <motion.p
                   className="text-base sm:text-lg md:text-xl text-blue-pale font-poppins px-2"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 1, delay: 1.5 }}
                 >
                  ✨ Dokunarak devam et ✨
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Gift Box Section */}
        {showGiftBox && !showPoem && (
          <motion.div
            className="flex-1 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <GiftBox giftBoxState={giftBoxState} onOpen={handleGiftBoxOpen} />
          </motion.div>
        )}

        {/* Poem Section */}
        {showPoem && (
          <motion.div
            className="flex-1 flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <PoemAnimation isVisible={showPoem} />
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          className="text-center pb-8 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="flex justify-center space-x-4 text-3xl mb-4"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span>🎂</span>
            <span>🎈</span>
            <span>🎁</span>
            <span>❄️</span>
            <span>✨</span>
          </motion.div>
          <p className="text-blue-pale font-poppins text-sm md:text-base">
            Doğum günün kutlu olsun! 🎉
          </p>
        </motion.footer>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 text-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App;
