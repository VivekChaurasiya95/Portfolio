import { useEffect, useState, memo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  length: number;
}

const StarField = memo(() => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = window.innerWidth < 768 ? 60 : 120;
      const newStars: Star[] = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          delay: Math.random() * 4,
          duration: Math.random() * 3 + 2,
        });
      }
      
      setStars(newStars);
    };

    // Generate multiple shooting stars
    const generateShootingStars = () => {
      const shootingCount = window.innerWidth < 768 ? 4 : 8;
      const newShootingStars: ShootingStar[] = [];
      
      for (let i = 0; i < shootingCount; i++) {
        newShootingStars.push({
          id: i,
          startX: Math.random() * 50, // Start from left half
          startY: Math.random() * 40, // Start from top portion
          delay: i * 1.5, // Staggered delays
          duration: 1.5 + Math.random() * 1,
          length: 60 + Math.random() * 40,
        });
      }
      
      setShootingStars(newShootingStars);
    };

    generateStars();
    generateShootingStars();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Nebula gradient overlay */}
      <div className="absolute inset-0 nebula-bg opacity-60" />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      
      {/* Enhanced shooting stars - diagonal from top-left to bottom-right */}
      {shootingStars.map((shootingStar) => (
        <div
          key={`shooting-${shootingStar.id}`}
          className="shooting-star-enhanced hidden md:block"
          style={{
            top: `${shootingStar.startY}%`,
            left: `${shootingStar.startX}%`,
            '--delay': `${shootingStar.delay}s`,
            '--duration': `${shootingStar.duration}s`,
            '--length': `${shootingStar.length}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

StarField.displayName = 'StarField';

export default StarField;
