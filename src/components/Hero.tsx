import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { Language, Currency } from '../types';

interface HeroProps {
  language: Language;
  t: (key: string) => string;
}

export default function Hero({ language, t }: HeroProps) {
  return (
    <section className="w-full bg-[#0A0A0A] relative border-b border-white/5 overflow-hidden" id="philosophie">
      <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
        
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 py-12 md:py-20 lg:py-24 flex flex-col justify-between relative z-10">
          
          {/* Top tagline with decorative line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase mb-8 lg:mb-0"
          >
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-neutral-300">{t('Deutsches Design. Zeitlose Qualität.')}</span>
          </motion.div>
 
          {/* Middle Headings & Circular Stamp */}
          <div className="my-auto py-6 relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase leading-[1.05] mb-6"
              id="hero-heading"
            >
              {language === 'DE' ? (
                <>
                  FUNKTION.<br />
                  KLARHEIT.<br />
                  <span className="font-serif italic text-[#D4AF37] lowercase">und</span> ZUKUNFT.
                </>
              ) : (
                <>
                  FUNCTION.<br />
                  CLARITY.<br />
                  <span className="font-serif italic text-[#D4AF37] lowercase">and</span> FUTURE.
                </>
              )}
            </motion.h1>
 
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs md:text-sm text-neutral-400 font-light max-w-xs leading-relaxed mb-8"
              id="hero-subheading"
            >
              {t('Minimalistische Produkte für einen bewussten Lebensstil.')}
            </motion.p>
 
            {/* Circular Stamp & Call to Action (Flex row on desktop) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-12">
              
              {/* Explore Button */}
              <motion.a
                href="#products"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-4 bg-[#D4AF37] text-black px-6 py-4 font-mono text-[11px] tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 group select-none cursor-pointer border border-[#D4AF37] shadow-sm"
                id="hero-cta-btn"
              >
                <span>{t('PRODUKTE ENTDECKEN')}</span>
                <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </motion.a>
 
              {/* SVG Circular Spinning Stamp */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-24 h-24 select-none shrink-0"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                  className="w-full h-full"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      fill="transparent"
                    />
                    <text font-family="monospace" font-size="6.1" fill="#D4AF37" letter-spacing="0.9" className="opacity-80">
                      <textPath href="#circlePath">
                        {language === 'DE' 
                          ? 'ENTWORFEN IN DEUTSCHLAND • FÜR DIE ZUKUNFT • ' 
                          : 'DESIGNED IN GERMANY • FOR THE FUTURE • '}
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37] font-light text-base select-none">
                  +
                </div>
              </motion.div>
 
            </div>
          </div>
 
          {/* Dummy bottom element to align spacing with right-hand layout */}
          <div className="h-4 hidden lg:block" />
        </div>
 
        {/* Right Column: Hero Image Container */}
        <div className="w-full lg:w-1/2 bg-[#121212] relative min-h-[350px] sm:min-h-[450px] lg:min-h-0 overflow-hidden">
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src="/src/assets/images/hero_chair_1783688662566.jpg"
            alt="Minimalist Bauhaus Lounge Chair"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center absolute inset-0 brightness-90 grayscale-[15%]"
            id="hero-chair-img"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent pointer-events-none hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none lg:hidden" />
        </div>
 
        {/* Far Right Sidebar: Slider Control Indicators & Scroll Arrow (Desktop only) */}
        <div className="hidden xl:flex w-24 bg-[#121212]/40 border-l border-white/5 flex-col justify-between items-center py-12 text-[#E5E5E5] select-none z-20 shrink-0">
          
          {/* Numbers / Pagination */}
          <div className="flex flex-col items-center gap-6">
            <span className="font-mono text-[11px] font-medium tracking-widest text-[#D4AF37]">01</span>
            <div className="w-[1px] h-20 bg-white/10 relative">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '33%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full bg-[#D4AF37] absolute top-0 left-0"
              />
            </div>
            <span className="font-mono text-[11px] font-light tracking-widest text-neutral-500">03</span>
          </div>
 
          {/* Scroll Down Hint */}
          <a
            href="#products"
            className="flex flex-col items-center gap-3 group text-neutral-400 hover:text-[#D4AF37] transition-colors"
          >
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase vertical-text">
              {t('SCROLLEN')}
            </span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-[#D4AF37]" />
          </a>

        </div>

      </div>

      {/* Vertical Text Styles Injection */}
      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
}
