import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Viewport configuration for all scroll-triggered elements
// Elements float into viewport during scroll, and stay visible without re-animating repeatedly
const VIEWPORT_CONFIG = {
  once: true,
  margin: '0px 0px -40px 0px',
  amount: 0.08,
};

// Buoyant, silky-smooth float-in easing curve
const FLOAT_EASING = [0.16, 1, 0.3, 1];

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  duration?: number;
  distance?: number;
  type?: 'heading' | 'text' | 'card' | 'image' | 'icon' | 'button' | 'stat' | 'section';
  hoverFloat?: boolean;
}

/**
 * Universal Float-In component that brings any element smoothly into view
 * with a buoyant vertical or scaled glide and opacity fade.
 */
export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration,
  distance = 30,
  type,
  hoverFloat = false,
}) => {
  // Preset float animation configurations based on element type
  if (type === 'heading') {
    return <RevealHeading delay={delay} className={className}>{children}</RevealHeading>;
  }
  if (type === 'text') {
    return <RevealText delay={delay} className={className}>{children}</RevealText>;
  }
  if (type === 'card') {
    return <RevealCard delay={delay} className={className}>{children}</RevealCard>;
  }
  if (type === 'image') {
    return <RevealImage delay={delay} className={className}>{children}</RevealImage>;
  }
  if (type === 'icon') {
    return <RevealIcon delay={delay} className={className}>{children}</RevealIcon>;
  }
  if (type === 'button') {
    return <RevealButton delay={delay} className={className}>{children}</RevealButton>;
  }
  if (type === 'stat') {
    return <RevealStat delay={delay} className={className}>{children}</RevealStat>;
  }

  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: -distance, y: 10 };
      case 'right':
        return { opacity: 0, x: distance, y: 10 };
      case 'scale':
        return { opacity: 0, scale: 0.94, y: distance / 2 };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      whileHover={hoverFloat ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration: duration || 0.55,
        delay,
        ease: FLOAT_EASING,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Alias FloatIn to MotionReveal for semantic float-in usage
export const FloatIn = MotionReveal;

/**
 * RevealHeading / FloatInHeading: Smooth upward float-in for headlines, titles, and section headers
 */
export const RevealHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}> = ({ children, className = '', delay = 0, distance = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT_CONFIG}
    transition={{
      duration: 0.58,
      delay,
      ease: FLOAT_EASING,
    }}
    className={className}
  >
    {children}
  </motion.div>
);
export const FloatInHeading = RevealHeading;

/**
 * RevealText / FloatInText: Gentle upward float-in for paragraphs, descriptions, and list copy
 */
export const RevealText: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}> = ({ children, className = '', delay = 0.05, distance = 22 }) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT_CONFIG}
    transition={{
      duration: 0.5,
      delay,
      ease: FLOAT_EASING,
    }}
    className={className}
  >
    {children}
  </motion.div>
);
export const FloatInText = RevealText;

/**
 * RevealCard / FloatInCard: Smooth card float-in from bottom with elegant hover levitation
 */
export const RevealCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}> = ({ children, className = '', delay = 0, distance = 34 }) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -6, transition: { duration: 0.28, ease: 'easeOut' } }}
    viewport={VIEWPORT_CONFIG}
    transition={{
      duration: 0.58,
      delay,
      ease: FLOAT_EASING,
    }}
    className={className}
  >
    {children}
  </motion.div>
);
export const FloatInCard = RevealCard;

/**
 * RevealImage / FloatInImage: Floating reveal for photos and illustrations
 * with upward glide and gentle zoom-in (scale 0.94 -> 1.0)
 */
export const RevealImage: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  hoverFloat?: boolean;
}> = ({ children, className = '', delay = 0, distance = 28, hoverFloat = true }) => (
  <motion.div
    initial={{ opacity: 0, y: distance, scale: 0.94 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={hoverFloat ? { y: -4, transition: { duration: 0.3, ease: 'easeOut' } } : undefined}
    viewport={VIEWPORT_CONFIG}
    transition={{
      duration: 0.65,
      delay,
      ease: FLOAT_EASING,
    }}
    className={className}
  >
    {children}
  </motion.div>
);
export const FloatInImage = RevealImage;

/**
 * RevealIcon / FloatInIcon: Buoyant floating scale and glide for badges, features, and icons
 */
export const RevealIcon: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.82 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={VIEWPORT_CONFIG}
    transition={{
      duration: 0.45,
      delay,
      ease: FLOAT_EASING,
    }}
    className={className}
  >
    {children}
  </motion.div>
);
export const FloatInIcon = RevealIcon;
export const FloatInBadge = RevealIcon;

/**
 * RevealButton / FloatInButton: Float-in with hover lift for CTAs, action buttons, and links
 */
export const RevealButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
    viewport={VIEWPORT_CONFIG}
    transition={{
      duration: 0.46,
      delay,
      ease: FLOAT_EASING,
    }}
    className={className}
  >
    {children}
  </motion.div>
);
export const FloatInButton = RevealButton;

/**
 * RevealStat / FloatInStat: Dynamic float and lift for numerical metrics and trust figures
 */
export const RevealStat: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.88, y: 22 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={VIEWPORT_CONFIG}
    transition={{
      duration: 0.5,
      delay,
      ease: FLOAT_EASING,
    }}
    className={className}
  >
    {children}
  </motion.div>
);
export const FloatInStat = RevealStat;

/**
 * FloatAmbient: Continuous floating levitation physics (ideal for floating badges,
 * equipment highlights, WhatsApp button, or hero graphics)
 */
export const FloatAmbient: React.FC<{
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
}> = ({ children, className = '', distance = 6, duration = 4, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -distance, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/**
 * ScrollZoomImage: Float reveal with subtle zoom and parallax drift as user scrolls
 */
interface ScrollZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const ScrollZoomImage: React.FC<ScrollZoomImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.65, ease: FLOAT_EASING }}
      ref={containerRef}
      className={`overflow-hidden relative ${containerClassName}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ scale, y }}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${className}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
};

/**
 * ScrollParallax: Subtle floating parallax displacement for background or accent sections
 */
interface ScrollParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ScrollParallax: React.FC<ScrollParallaxProps> = ({
  children,
  offset = 20,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};
