import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Clock, Calendar, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { JOURNAL_POST, JOURNAL_POST_EN } from '../data';

interface JournalSectionProps {
  language: Language;
  t: (key: string) => string;
}

export default function JournalSection({ language, t }: JournalSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const title = language === 'DE' ? JOURNAL_POST.title : JOURNAL_POST_EN.title;
  const readTime = language === 'DE' ? JOURNAL_POST.readTime : JOURNAL_POST_EN.readTime;
  const date = language === 'DE' ? JOURNAL_POST.date : JOURNAL_POST_EN.date;
  const content = language === 'DE' ? JOURNAL_POST.content : JOURNAL_POST_EN.content;

  return (
    <>
      <section className="w-full bg-[#0A0A0A] text-[#E5E5E5] relative overflow-hidden" id="journal">
        <div className="w-full flex flex-col lg:flex-row min-h-[500px]">
          
          {/* Left Column: Text Teaser */}
          <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-20 xl:p-24 flex flex-col justify-between relative z-10 bg-[#121212] border-r border-white/5">
            
            {/* Category tag */}
            <div className="flex items-center gap-4 text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase mb-8 lg:mb-0">
              <span className="w-5 h-[1px] bg-[#D4AF37]" />
              <span className="text-neutral-300">{t('JOURNAL')}</span>
            </div>

            {/* Editorial Content */}
            <div className="my-auto py-8">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white leading-[1.1] uppercase mb-5" id="journal-teaser-title">
                {title}
              </h2>
              <p className="text-xs md:text-sm text-neutral-400 font-light max-w-sm leading-relaxed mb-8">
                {t('Ein Journal über Ideen, Materialien und die Zukunft des Designs.')}
              </p>

              {/* Action: Open Reader Modal */}
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-3 text-[#D4AF37] border-b border-[#D4AF37] pb-1.5 font-mono text-[10px] md:text-[11px] tracking-widest uppercase hover:text-white hover:border-white transition-all select-none cursor-pointer"
                id="open-journal-btn"
              >
                <span>{t('ARTIKEL LESEN')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Empty block to align layout on big screens */}
            <div className="h-4 hidden lg:block" />
          </div>

          {/* Right Column: Architectural Photography */}
          <div className="w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-0 bg-[#0A0A0A] relative overflow-hidden">
            <img
              src={JOURNAL_POST.image}
              alt="Concrete Architecture Interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover absolute inset-0 opacity-70 group-hover:opacity-90 transition-opacity duration-700 brightness-90 grayscale-[10%]"
              id="journal-architecture-img"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent pointer-events-none lg:bg-gradient-to-r lg:from-[#121212] lg:via-transparent lg:to-transparent" />
          </div>

        </div>
      </section>

      {/* Editorial Reader Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xs"
            />

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-3xl bg-[#121212] text-[#E5E5E5] shadow-2xl flex flex-col overflow-hidden max-h-[85vh] border border-white/10 rounded-sm"
              id="journal-reader-card"
            >
              {/* Header bar */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#121212] shrink-0">
                <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-neutral-300">Neue Form Berlin — Journal</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Reader Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 no-scrollbar">
                
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]/80 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    {date}
                  </span>
                  <span className="w-1 h-1 bg-white/10 rounded-full" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    {readTime}
                  </span>
                </div>

                {/* Main Heading */}
                <h3 className="font-display text-2xl md:text-3xl font-light tracking-wide text-white mb-6 uppercase leading-tight">
                  {title}
                </h3>

                {/* Cover Image inside modal */}
                <div className="w-full aspect-[16/8] bg-black/30 rounded-xs overflow-hidden mb-8 shadow-inner border border-white/5">
                  <img
                    src={JOURNAL_POST.image}
                    alt="Cover Architecture"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-90 grayscale-[10%]"
                  />
                </div>

                {/* Text Body */}
                <div className="text-xs md:text-sm text-neutral-300 leading-relaxed font-light space-y-6 max-w-2xl mx-auto whitespace-pre-line font-sans pt-2">
                  {content}
                </div>

              </div>

              {/* Footer bar */}
              <div className="p-6 border-t border-white/5 bg-[#1a1a1a] text-center shrink-0 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                <span>© 2026 Neue Form Berlin</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#D4AF37] font-semibold hover:text-white hover:underline transition-colors"
                >
                  {language === 'DE' ? 'Schließen' : 'Close'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
