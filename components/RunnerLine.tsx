import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const RunnerLine: React.FunctionComponent = () => {
  const location = useLocation();
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const animateRoute = async () => {
      setIsAnimating(true);
      await controls.start({
        scaleX: [0, 1],
        opacity: [0, 1, 0],
        transition: { duration: 1.5, ease: "easeInOut" }
      });
      setIsAnimating(false);
    };

    animateRoute();
  }, [location.pathname, controls]);

  if (!isAnimating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-transparent via-[#D4A55F] to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={controls}
        style={{ originX: 0 }}
      />
      {/* Silk Road Motif - Stylized Cloud/Brushstroke */}
      <motion.div
        className="absolute top-0 right-0 h-8 w-32 bg-[url('/silk-road-pattern.svg')] bg-contain bg-no-repeat opacity-50"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: '100vw', opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default RunnerLine;