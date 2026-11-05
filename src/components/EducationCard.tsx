import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, MapPin, Trophy, BookOpen, Calendar, BookKey } from 'lucide-react';

const EducationCard = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Since it's a slider, we can plan for multiple slides (e.g., College, High School).
  // For now, we simulate one interactive slide that matches the requested content.
  const content = [
    {
      type: 'EDUCATION',
      title: 'Madhav Institute of Technology & Science',
      location: 'Gwalior, Madhya Pradesh',
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      details: [
        {
          label: 'DEGREE',
          value: 'B.Tech',
          icon: <BookOpen className="w-3.5 h-3.5 text-muted-foreground mb-1" />
        },
        {
          label: 'DURATION',
          value: '2024 - 2028',
          icon: <Calendar className="w-3.5 h-3.5 text-muted-foreground mb-1" />
        },
        {
          label: 'BRANCH',
          value: 'Computer Science & Design',
          icon: <BookKey className="w-3.5 h-3.5 text-muted-foreground mb-1" />
        },
        {
          label: 'ACHIEVEMENT',
          value: (
            <span>
              8.88 <span className="text-xs font-semibold text-primary/70 tracking-widest uppercase">CGPA</span>
            </span>
          ),
          valueClass: 'text-primary',
          icon: <Trophy className="w-3.5 h-3.5 text-primary mb-1" />
        }
      ]
    },
    {
      type: 'EDUCATION',
      title: 'High School / Senior Secondary',
      location: 'Madhya Pradesh Board',
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      details: [
        {
          label: 'DEGREE',
          value: 'Class 12th (PCM)',
          icon: <BookOpen className="w-3.5 h-3.5 text-muted-foreground mb-1" />
        },
        {
          label: 'DURATION',
          value: '2023 - 2024',
          icon: <Calendar className="w-3.5 h-3.5 text-muted-foreground mb-1" />
        },
        {
          label: 'BRANCH',
          value: 'Science & Mathematics',
          icon: <BookKey className="w-3.5 h-3.5 text-muted-foreground mb-1" />
        },
        {
          label: 'ACHIEVEMENT',
          value: (
            <span>
              90.2 <span className="text-xs font-semibold text-primary/70 tracking-widest uppercase">%</span>
            </span>
          ),
          valueClass: 'text-primary',
          icon: <Trophy className="w-3.5 h-3.5 text-primary mb-1" />
        }
      ]
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % content.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + content.length) % content.length);
  };

  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[380px] bg-[#0c0d10] border border-white/5 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {/* Header section */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex gap-3.5 sm:gap-5">
              {/* Icon Box */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border border-white/10 bg-[#121418] flex items-center justify-center shrink-0">
                {content[activeSlide].icon}
              </div>
              
              {/* Title Area */}
              <div>
                <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary mb-1.5 sm:mb-2 uppercase">
                  {content[activeSlide].type}
                </p>
                <h3 className="text-base sm:text-xl md:text-2xl font-meridian font-medium text-primary mb-1.5 sm:mb-2 leading-tight">
                  {content[activeSlide].title}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{content[activeSlide].location}</span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2 self-start shrink-0">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 sm:w-11 sm:h-11 min-w-[44px] min-h-[44px] rounded-full border border-foreground/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 sm:w-11 sm:h-11 min-w-[44px] min-h-[44px] rounded-full border border-foreground/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/5 mb-6 sm:mb-8" />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-5 sm:gap-y-8 gap-x-3 sm:gap-x-4 mb-8 sm:mb-0">
            {content[activeSlide].details.map((detail, index) => (
              <div key={index}>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                  {detail.icon}
                  <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                    {detail.label}
                  </p>
                </div>
                <p className={`text-base sm:text-xl font-bold tracking-tight ${detail.valueClass || 'text-foreground'}`}>
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="relative sm:absolute sm:bottom-10 sm:left-10 flex gap-2 pt-4 sm:pt-0">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 sm:h-1.5 rounded-full transition-all duration-300 min-h-[24px] flex items-center ${
              index === activeSlide ? 'w-8 bg-primary' : 'w-2 sm:w-1.5 bg-foreground/20 dark:bg-white/20 hover:bg-foreground/40 dark:hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        {/* Decorative inactive dot to match standard design patterns */}
        <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 dark:bg-white/20 self-center" />
      </div>
    </div>
  );
};

export default EducationCard;
