import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShieldCheck,
} from 'lucide-react';
import { RevealHeading, RevealText } from './MotionReveal';

// 10 Colorful 3D Animated Cartoon Images for the manual horizontal slider
import cartoonImg01 from '../assets/images/cartoon_slide_one_1790150746569.jpg';
import cartoonImg02 from '../assets/images/cartoon_slide_two_1790150767867.jpg';
import cartoonImg03 from '../assets/images/regenerated_image_1790154646089.jpg';
import cartoonImg04 from '../assets/images/cartoon_slide_four_1790150814957.jpg';
import cartoonImg05 from '../assets/images/cartoon_slide_five_1790150832111.jpg';
import cartoonImg06 from '../assets/images/cartoon_slide_six_1790150852131.jpg';
import cartoonImg07 from '../assets/images/cartoon_slide_seven_1790150876047.jpg';
import cartoonImg08 from '../assets/images/cartoon_slide_eight_1790150891537.jpg';
import cartoonImg09 from '../assets/images/cartoon_slide_nine_1790150908532.jpg';
import cartoonImg10 from '../assets/images/cartoon_slide_ten_1790150925998.jpg';

interface ProjectSlide {
  id: number;
  image: string;
}

const PROJECT_SLIDES: ProjectSlide[] = [
  { id: 1, image: cartoonImg01 },
  { id: 2, image: cartoonImg02 },
  { id: 3, image: cartoonImg03 },
  { id: 4, image: cartoonImg04 },
  { id: 5, image: cartoonImg05 },
  { id: 6, image: cartoonImg06 },
  { id: 7, image: cartoonImg07 },
  { id: 8, image: cartoonImg08 },
  { id: 9, image: cartoonImg09 },
  { id: 10, image: cartoonImg10 },
];

interface CaseStudiesSectionProps {
  onOpenQuoteModal: (projectType: string, category: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Manual slide navigation (strictly no autoplay/interval)
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? PROJECT_SLIDES.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === PROJECT_SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const handleSelectSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
        return;
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, lightboxOpen]);

  const currentSlide = PROJECT_SLIDES[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0.8,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.22 },
      },
    }),
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Clean title 'Projects' with no sector tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#E8E5DF]">
          <div className="space-y-2">
            <RevealText delay={0.05}>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E14D2A]">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Engineering Portfolio</span>
              </div>
            </RevealText>
            <RevealHeading delay={0.1}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
                Projects
              </h2>
            </RevealHeading>
            <RevealText delay={0.15}>
              <p className="text-[#57534E] text-sm sm:text-base max-w-2xl leading-relaxed">
                Explore our turnkey solar, electrical switchgear, CCTV surveillance, data cabling, and automation engineering gallery.
              </p>
            </RevealText>
          </div>

          {/* Top Manual Slider Controls & Counter */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#E8E5DF] rounded-lg shadow-2xs">
              <span className="text-xs font-mono font-bold text-[#E14D2A]">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#A8A29E]">/</span>
              <span className="text-xs font-mono text-[#57534E]">
                {String(PROJECT_SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project photo"
                className="w-10 h-10 flex items-center justify-center bg-white hover:bg-[#1C1917] hover:text-white text-[#1C1917] border border-[#E8E5DF] rounded-lg shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project photo"
                className="w-10 h-10 flex items-center justify-center bg-[#E14D2A] hover:bg-[#C83B1B] text-white rounded-lg shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Horizontal Image Slider (Fills Entire Frame Boldly, No Overlay Names) */}
        <div className="relative bg-[#1C1917] rounded-2xl overflow-hidden shadow-2xl border border-[#292524]">
          {/* Main Slide Display with Full Edge-to-Edge Image */}
          <div className="relative h-[480px] sm:h-[580px] lg:h-[660px] w-full overflow-hidden bg-[#0A0A0A]">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_e, { offset }) => {
                  const swipeThreshold = 50;
                  if (offset.x > swipeThreshold) {
                    handlePrev();
                  } else if (offset.x < -swipeThreshold) {
                    handleNext();
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
              >
                {/* Full-bleed crisp image filling entire container */}
                <img
                  src={currentSlide.image}
                  alt={`Project ${currentIndex + 1}`}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />

                {/* Subtle vignette for controls legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

                {/* Minimalist Top Indicator Badge (No image names, only slide count) */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                  <span className="px-3 py-1.5 bg-black/75 backdrop-blur-md text-white text-xs font-mono font-bold rounded-lg border border-white/15 shadow-md">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(PROJECT_SLIDES.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Fullscreen Preview Trigger */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="p-2.5 bg-black/75 hover:bg-[#E14D2A] text-white rounded-lg backdrop-blur-md border border-white/15 transition-colors cursor-pointer shadow-md"
                    title="View Fullscreen"
                    aria-label="View Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left & Right In-Slide Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/65 hover:bg-[#E14D2A] text-white rounded-full backdrop-blur-md border border-white/20 transition-all duration-200 cursor-pointer active:scale-90 shadow-xl"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/65 hover:bg-[#E14D2A] text-white rounded-full backdrop-blur-md border border-white/20 transition-all duration-200 cursor-pointer active:scale-90 shadow-xl"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Indicator Dots Bar */}
          <div className="bg-[#141211] border-t border-[#292524] px-4 py-3.5 flex items-center justify-between">
            <span className="text-[11px] text-stone-400 font-mono hidden sm:inline-block">
              Use arrow buttons or keyboard &larr; &rarr; to slide
            </span>

            {/* 10 Interactive Dots */}
            <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
              {PROJECT_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 transition-all duration-200 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-7 bg-[#E14D2A]'
                      : 'w-2 bg-stone-700 hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>

            <span className="text-xs text-stone-400 font-mono">
              Slide {currentIndex + 1} of {PROJECT_SLIDES.length}
            </span>
          </div>
        </div>

        {/* 10 Horizontal Thumbnail Strip for Instant Jump (No Names) */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
              Project Gallery Thumbnails (Click to view)
            </span>
            <span className="text-xs text-[#78716C] font-mono">
              {currentIndex + 1} / {PROJECT_SLIDES.length}
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {PROJECT_SLIDES.map((slide, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  className={`group relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#E14D2A] ring-2 ring-[#E14D2A]/40 scale-102 z-10'
                      : 'border-transparent opacity-65 hover:opacity-100 hover:border-stone-400'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity ${
                      isSelected
                        ? 'bg-[#E14D2A]/15'
                        : 'bg-black/30 group-hover:bg-transparent'
                    }`}
                  />
                  <span className="absolute bottom-1 right-1 text-[10px] font-mono font-bold px-1 py-0.5 rounded bg-black/75 text-white leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal (No Names) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
              <span className="text-sm font-mono text-[#E14D2A] font-bold">
                Photo {String(currentIndex + 1).padStart(2, '0')} / {String(PROJECT_SLIDES.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-[#E14D2A] text-white transition-colors cursor-pointer"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Image & Navigation */}
            <div className="relative flex-grow flex items-center justify-center py-4 overflow-hidden">
              <img
                src={currentSlide.image}
                alt={`Photo ${currentIndex + 1}`}
                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
              />

              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-[#E14D2A] text-white rounded-full transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-[#E14D2A] text-white rounded-full transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer */}
            <div className="text-center text-xs text-stone-400 font-mono pt-2">
              Press Escape to exit fullscreen · Left / Right arrows to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
