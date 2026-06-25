import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IsometricButtonProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const IsometricButton = ({ children, href, variant = 'primary', onClick }: IsometricButtonProps) => {
  const isPrimary = variant === 'primary';
  
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="relative inline-block group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Main button face */}
      <div 
        className={`
          relative z-10 px-8 py-4 font-medium text-sm tracking-wide
          border-2 transition-all duration-300
          ${isPrimary 
            ? 'bg-primary/15 border-primary/60 text-primary hover:bg-primary/25 hover:border-primary' 
            : 'bg-secondary/15 border-secondary/60 text-secondary hover:bg-secondary/25 hover:border-secondary'
          }
        `}
      >
        <span className="flex items-center gap-2">
          {children}
        </span>
      </div>
      
      {/* Right side (3D depth) */}
      <div 
        className={`
          absolute top-2 -right-2 w-2 h-full z-0
          transition-all duration-300
          ${isPrimary 
            ? 'bg-primary/40 group-hover:bg-primary/50' 
            : 'bg-secondary/40 group-hover:bg-secondary/50'
          }
        `}
        style={{
          transform: 'skewY(-45deg)',
          transformOrigin: 'top left',
        }}
      />
      
      {/* Bottom side (3D depth) */}
      <div 
        className={`
          absolute -bottom-2 left-2 h-2 w-full z-0
          transition-all duration-300
          ${isPrimary 
            ? 'bg-primary/30 group-hover:bg-primary/40' 
            : 'bg-secondary/30 group-hover:bg-secondary/40'
          }
        `}
        style={{
          transform: 'skewX(-45deg)',
          transformOrigin: 'top left',
        }}
      />
      
      {/* Corner piece */}
      <div 
        className={`
          absolute -bottom-2 -right-2 w-2 h-2 z-0
          ${isPrimary 
            ? 'bg-primary/25' 
            : 'bg-secondary/25'
          }
        `}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
        }}
      />
      
      {/* Glow effect on hover */}
      <div 
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          ${isPrimary 
            ? 'shadow-[0_0_30px_rgba(79,206,196,0.3)]' 
            : 'shadow-[0_0_30px_rgba(200,120,140,0.3)]'
          }
        `}
      />
    </motion.a>
  );
};

export default IsometricButton;
