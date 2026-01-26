import { useEffect, useState, memo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const StarField = memo(() => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = window.innerWidth < 768 ? 50 : 100;
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

    generateStars();
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
      
      {/* Rare shooting stars */}
      <div 
        className="shooting-star hidden md:block"
        style={{ top: '15%', left: '20%', animationDelay: '0s', animationDuration: '8s' }}
      />
      <div 
        className="shooting-star hidden md:block"
        style={{ top: '40%', left: '60%', animationDelay: '4s', animationDuration: '10s' }}
      />
    </div>
  );
});

StarField.displayName = 'StarField';

export default StarField;
