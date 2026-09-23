import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  LayoutGrid,
  SlidersHorizontal,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// Dedicated Solar PV, Inverters & Energy Storage Hardware Images
import inverterBrochureImg from '../assets/images/smartech_inverters_brochure_1789844458691.jpg';
import hwooCi11kImg from '../assets/images/hwoo_ci11k_hybrid_inverter_1788958456326.jpg';
import sunwaysSthImg from '../assets/images/sunways_sth_hybrid_1788969237983.jpg';
import sunwaysSttImg from '../assets/images/sunways_stt_inverter_1788969259593.jpg';
import photonAeroImg from '../assets/images/photon_aero_hybrid_1788969166263.jpg';
import photonPiecoImg from '../assets/images/photon_pieco_hybrid_1788969182114.jpg';
import photonPhtImg from '../assets/images/photon_pht_inverter_1788969276016.jpg';
import hwooWarehouseImg from '../assets/images/hwoo_warehouse_inverters_1788958476672.jpg';
import hwooBeatHeatImg from '../assets/images/hwoo_beat_the_heat_1788958440522.jpg';
import hwooEssImg from '../assets/images/hwoo_ess_solutions_expert_1788958504007.jpg';
import photonWallxImg from '../assets/images/photon_wallx_battery_1788969200565.jpg';
import photonWallxProImg from '../assets/images/photon_wallx_pro_1788969216247.jpg';
import apsunBatteryImg from '../assets/images/apsun_brand_battery_1788959871564.jpg';
import apsunLithiumImg from '../assets/images/apsun_lithium_battery_1788958491114.jpg';
import photonDealerImg from '../assets/images/photon_dealer_pakistan_1788969295269.jpg';
import solarArrayImg from '../assets/images/solar_electrical_eng_1787468705473.jpg';
import pakSolarEngImg from '../assets/images/pak_solar_engineers_1787655302518.jpg';
import pakInverterEngImg from '../assets/images/pak_inverter_engineer_1787655405064.jpg';

export interface SolarItem {
  id: string;
  image: string;
}

// 100% Dedicated Solar PV & Inverter Hardware & Installation Images
export const SOLAR_PV_ITEMS: SolarItem[] = [
  { id: 'solar-item-1', image: inverterBrochureImg },
  { id: 'solar-item-2', image: hwooCi11kImg },
  { id: 'solar-item-3', image: sunwaysSthImg },
  { id: 'solar-item-4', image: photonAeroImg },
  { id: 'solar-item-5', image: hwooWarehouseImg },
  { id: 'solar-item-6', image: sunwaysSttImg },
  { id: 'solar-item-7', image: photonPiecoImg },
  { id: 'solar-item-8', image: apsunLithiumImg },
  { id: 'solar-item-9', image: hwooBeatHeatImg },
  { id: 'solar-item-10', image: photonWallxImg },
  { id: 'solar-item-11', image: photonPhtImg },
  { id: 'solar-item-12', image: apsunBatteryImg },
  { id: 'solar-item-13', image: hwooEssImg },
  { id: 'solar-item-14', image: photonWallxProImg },
  { id: 'solar-item-15', image: photonDealerImg },
  { id: 'solar-item-16', image: solarArrayImg },
  { id: 'solar-item-17', image: pakSolarEngImg },
  { id: 'solar-item-18', image: pakInverterEngImg },
];

export const SolarPvInvertersSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'slider' | 'cart-grid'>('slider');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const { addToCart, cartItems } = useCart();

  // Manual slider navigation
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? SOLAR_PV_ITEMS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === SOLAR_PV_ITEMS.length - 1 ? 0 : prev + 1));
  }, []);

  const handleSelectSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation support
  useEffect(() => {
    if (viewMode !== 'slider') return;
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
  }, [handlePrev, handleNext, lightboxOpen, viewMode]);

  const handleQtyChange = (itemId: string, delta: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setQuantities((prev) => {
      const current = prev[itemId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  const handleAddToCart = (item: SolarItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const qty = quantities[item.id] || 1;
    addToCart(
      {
        id: item.id,
        name: `Solar PV & Inverter Hardware #${item.id.replace('solar-item-', '')}`,
        category: 'solar',
        categoryLabel: 'Solar PV & Inverters',
        brand: 'Smartech Solar',
        specs: ['Tier-1 Certified Hardware', 'Standard Warranty', 'Factory Calibrated'],
        type: 'product',
      },
      qty
    );

    // Trigger brief visual feedback
    setAddedAnimation((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const currentSlide = SOLAR_PV_ITEMS[currentIndex];

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
    <div className="space-y-6">
      {/* TOP CENTER: Add to Cart / View Mode Switch Button */}
      <div className="flex flex-col items-center justify-center pt-2 pb-4">
        {viewMode === 'slider' ? (
          <button
            type="button"
            onClick={() => setViewMode('cart-grid')}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E14D2A] hover:bg-[#C83B1B] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-98 font-bold text-xs uppercase tracking-wider"
          >
            <ShoppingCart className="w-4 h-4 transition-transform group-hover:scale-115" />
            <span>Add to Cart (2-Column View)</span>
            <LayoutGrid className="w-4 h-4 ml-1 opacity-80" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1C1917] hover:bg-[#E14D2A] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-98 font-bold text-xs uppercase tracking-wider"
          >
            <SlidersHorizontal className="w-4 h-4 transition-transform group-hover:scale-115" />
            <span>Back to Image Slider View</span>
          </button>
        )}
      </div>

      {/* VIEW 1: MANUAL HORIZONTAL IMAGE SLIDER (Just like Projects, No Names) */}
      {viewMode === 'slider' && (
        <div className="space-y-6">
          <div className="relative bg-[#1C1917] rounded-2xl overflow-hidden shadow-2xl border border-[#292524]">
            {/* Top Control Bar in Slider */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
              <span className="px-3.5 py-1.5 bg-black/75 backdrop-blur-md text-white text-xs font-mono font-bold rounded-lg border border-white/15 shadow-md pointer-events-auto">
                {String(currentIndex + 1).padStart(2, '0')} / {String(SOLAR_PV_ITEMS.length).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('cart-grid')}
                  className="px-3 py-1.5 bg-[#E14D2A] hover:bg-[#C83B1B] text-white rounded-lg backdrop-blur-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md inline-flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="p-2 bg-black/75 hover:bg-[#E14D2A] text-white rounded-lg backdrop-blur-md border border-white/15 transition-colors cursor-pointer shadow-md"
                  title="View Fullscreen"
                  aria-label="View Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Slide Display (Fills Entire Frame Boldly, No Names) */}
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
                  <img
                    src={currentSlide.image}
                    alt={`Solar Item ${currentIndex + 1}`}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />

                  {/* Subtle Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
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

              {/* Interactive Dots */}
              <div className="flex items-center gap-1.5 mx-auto sm:mx-0 overflow-x-auto max-w-[280px] sm:max-w-none py-1">
                {SOLAR_PV_ITEMS.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleSelectSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 transition-all duration-200 rounded-full cursor-pointer shrink-0 ${
                      currentIndex === idx
                        ? 'w-7 bg-[#E14D2A]'
                        : 'w-2 bg-stone-700 hover:bg-stone-500'
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs text-stone-400 font-mono">
                Slide {currentIndex + 1} of {SOLAR_PV_ITEMS.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip (Click to View, No Names) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
                All Images ({SOLAR_PV_ITEMS.length} Photos)
              </span>
              <span className="text-xs text-[#78716C] font-mono">
                {currentIndex + 1} / {SOLAR_PV_ITEMS.length}
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-15 gap-2">
              {SOLAR_PV_ITEMS.map((slide, idx) => {
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
      )}

      {/* VIEW 2: 2-COLUMN VERTICAL GRID WITH ADD TO CART & QUANTITY CONTROLS */}
      {viewMode === 'cart-grid' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          {/* Top Banner inside Cart Grid */}
          <div className="bg-white border border-[#E8E5DF] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E14D2A]">
                2-Column Ordering Grid
              </span>
              <p className="text-xs sm:text-sm text-[#57534E]">
                Adjust quantity with <span className="font-bold text-[#1C1917]">- 1 +</span> and click any item to add directly to your cart.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#1C1917] hover:text-white text-[#1C1917] border border-[#E8E5DF] rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
            >
              Switch to Slider View
            </button>
          </div>

          {/* 2-Column Grid (Vertically Do Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOLAR_PV_ITEMS.map((item, idx) => {
              const qty = quantities[item.id] || 1;
              const cartItem = cartItems.find((c) => c.id === item.id);
              const isJustAdded = addedAnimation[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => handleAddToCart(item)}
                  className="group bg-white border border-[#E8E5DF] hover:border-[#E14D2A] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Full image display with NO names on it */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/11] bg-stone-900 overflow-hidden">
                    <img
                      src={item.image}
                      alt={`Item ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    />

                    {/* Minimal index badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md text-white text-xs font-mono font-bold rounded-md border border-white/15">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Cart Status Badge */}
                    {cartItem && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-md shadow-md">
                          <Check className="w-3.5 h-3.5" />
                          <span>In Cart ({cartItem.quantity})</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Controls Bar: [- 1 +] Quantity Selector & Add to Cart Button */}
                  <div className="p-4 sm:p-5 bg-white border-t border-[#E8E5DF] flex items-center justify-between gap-3">
                    {/* Quantity Selector: _ 1 + */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center border border-[#E8E5DF] bg-[#FAF8F5] rounded-xl p-1 shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={(e) => handleQtyChange(item.id, -1, e)}
                        className="w-8 h-8 flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:bg-white rounded-lg transition-colors cursor-pointer active:scale-95"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-mono text-sm font-bold text-[#1C1917]">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleQtyChange(item.id, 1, e)}
                        className="w-8 h-8 flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:bg-white rounded-lg transition-colors cursor-pointer active:scale-95"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to Cart Action Button */}
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(item, e)}
                      className={`inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md active:scale-98 ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E14D2A] hover:bg-[#C83B1B] text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

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
                Photo {String(currentIndex + 1).padStart(2, '0')} / {String(SOLAR_PV_ITEMS.length).padStart(2, '0')}
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
    </div>
  );
};
