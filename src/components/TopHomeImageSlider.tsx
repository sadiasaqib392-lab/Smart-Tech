import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

import slide1Img from '../assets/images/regenerated_image_1789754321224.png';
import pakCctvImg from '../assets/images/pak_cctv_technicians_1787655322618.jpg';
import slide3Img from '../assets/images/regenerated_image_1789754330452.png';
import slide4Img from '../assets/images/regenerated_image_1789754337646.png';

export interface TopSlideItem {
  id: string;
  image: string;
  alt: string;
}

export const TopHomeImageSlider: React.FC = () => {
  const slides: TopSlideItem[] = [
    {
      id: 'pak-solar-engineering',
      image: slide1Img,
      alt: 'Smartech Solar Engineering Rooftop Installation Pakistan',
    },
    {
      id: 'pak-cctv-surveillance',
      image: pakCctvImg,
      alt: 'Smartech 4K AcuSense CCTV Smart Security Technician Pakistan',
    },
    {
      id: 'pak-network-fiber',
      image: slide3Img,
      alt: 'Smartech Optical Fiber Splicing & Datacenter Server Racks Pakistan',
    },
    {
      id: 'pak-industrial-vfd',
      image: slide4Img,
      alt: 'Smartech 3-Phase Industrial Switchgear & VFD Panel Engineering Pakistan',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Automatic slide cycle: strictly 3.5 seconds (3500ms)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 3500);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, isPlaying]);

  return (
    <div
      className="relative w-full bg-[#1C1917] text-white overflow-hidden border-b-2 border-[#E14D2A] shadow-xl select-none group/topslider"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="Smartech Electrical and Networking Solutions Top Automated Slider"
    >
      {/* Full-bleed visual image canvas (Clear visibility, no text clutter) */}
      <div className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] w-full overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Very subtle edge vignette to keep image clear and vibrant */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-transparent to-[#1C1917]/40" />
            </div>
          );
        })}

        {/* Manual Left / Right Arrow Navigation Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 bg-[#1C1917]/85 hover:bg-[#E14D2A] text-white border border-stone-700 hover:border-[#E14D2A] rounded-lg flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-105 cursor-pointer focus:outline-none hover-float-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 bg-[#1C1917]/85 hover:bg-[#E14D2A] text-white border border-stone-700 hover:border-[#E14D2A] rounded-lg flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-105 cursor-pointer focus:outline-none hover-float-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Bar: 3.5-Second Progress Line + Dots + Counter + Play/Pause */}
        <div className="absolute bottom-0 inset-x-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/90 to-transparent space-y-2">
          {/* 3.5s Auto Slide Progress Indicator */}
          <div className="w-full bg-stone-800/80 h-1 rounded-full overflow-hidden">
            <div
              key={currentIndex}
              className={`h-full bg-gradient-to-r from-[#E14D2A] via-[#F97316] to-[#FB923C] ${
                isPlaying ? 'animate-[topSlideProgress_3.5s_linear_infinite]' : 'w-full opacity-60'
              }`}
              style={{
                animationDuration: '3500ms',
              }}
            />
          </div>

          <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto px-2">
            {/* Interactive Slide Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-7 sm:w-10 bg-[#E14D2A] shadow-sm'
                      : 'w-2 sm:w-2.5 bg-stone-700 hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>

            {/* Counter Badge & Play/Pause */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-stone-300 bg-[#292524]/90 px-2.5 py-1 rounded-md border border-stone-700">
                0{currentIndex + 1} <span className="text-stone-500">/</span> 0{slides.length}
              </span>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause 3.5s auto-slide' : 'Resume 3.5s auto-slide'}
                className="p-1.5 text-stone-300 hover:text-white bg-[#292524]/90 hover:bg-[#E14D2A] border border-stone-700 rounded-md transition-colors cursor-pointer"
                title={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
