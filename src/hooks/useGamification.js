import { useState, useEffect } from 'react';

// Hook 1: Progresso de Scroll (para barra visual)
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress();

    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return { scrollProgress };
};

// Hook 2: Contadores Dinâmicos (spots, viewers, buyers)
export const useDynamicCounters = (initialSpots = 12, initialViewers = 200, initialBuyers = 80) => {
  const [spotsLeft, setSpotsLeft] = useState(initialSpots);
  const [viewers, setViewers] = useState(initialViewers);
  const [buyers, setBuyers] = useState(initialBuyers);

  useEffect(() => {
    // Spots diminuem a cada 45-90 segundos
    const spotsInterval = setInterval(() => {
      setSpotsLeft(prev => Math.max(3, prev - 1));
    }, Math.random() * 45000 + 45000);

    // Viewers variam a cada 8-15 segundos
    const viewersInterval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(150, Math.min(250, prev + change));
      });
    }, Math.random() * 7000 + 8000);

    // Buyers aumentam a cada 60-120 segundos
    const buyersInterval = setInterval(() => {
      setBuyers(prev => prev + 1);
    }, Math.random() * 60000 + 60000);

    return () => {
      clearInterval(spotsInterval);
      clearInterval(viewersInterval);
      clearInterval(buyersInterval);
    };
  }, []);

  return { spotsLeft, viewers, buyers };
};