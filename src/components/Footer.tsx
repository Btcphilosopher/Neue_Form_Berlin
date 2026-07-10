import React, { useState } from 'react';
import { Instagram, Linkedin, Globe, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  t: (key: string) => string;
}

export default function Footer({ language, t }: FooterProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');

    // Validations
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(t('Geben Sie eine gültige E-Mail-Adresse ein.'));
      return;
    }

    if (!consent) {
      setStatus('error');
      setMessage(t('Bitte akzeptieren Sie die Datenschutzerklärung.'));
      return;
    }

    // Success state
    setStatus('success');
    setMessage(t('Erfolgreich abonniert!'));
    setEmail('');
    setConsent(false);
  };

  return (
    <footer className="w-full bg-[#0E0E0E] text-[#E5E5E5] pt-16 border-t border-white/5" id="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
        
        {/* Logo and Description (Col span 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex flex-col select-none group">
            <span className="font-display font-medium text-[18px] md:text-[20px] tracking-[0.4em] leading-none text-white group-hover:text-[#D4AF37] transition-colors duration-300">
              NEUE FORM
            </span>
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.6em] uppercase text-[#D4AF37]/80 mt-1 pl-0.5 group-hover:text-white transition-colors duration-300">
              BERLIN
            </span>
          </div>

          <p className="text-xs text-neutral-400 font-light max-w-xs leading-relaxed">
            {t('Wir gestalten Produkte, die Funktion, Ästhetik und Verantwortung vereinen.')}
          </p>

          <div className="space-y-3">
            <h5 className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase font-semibold">
              {t('FOLGE UNS')}
            </h5>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-neutral-400 transition-all border border-white/10 rounded-sm">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-neutral-400 transition-all border border-white/10 rounded-sm">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-neutral-400 transition-all border border-white/10 rounded-sm">
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Directory Column 1: Shop (Col span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-[#D4AF37] border-b border-white/10 pb-2">
            {t('SHOP')}
          </h4>
          <ul className="space-y-2 text-xs text-neutral-400 font-light">
            <li><a href="#products" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Alle Produkte')}</a></li>
            <li><a href="#products" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Neuheiten')}</a></li>
            <li><a href="#products" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Bestseller')}</a></li>
            <li><a href="#products" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Geschenkideen')}</a></li>
            <li><a href="#products" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Sale')}</a></li>
          </ul>
        </div>

        {/* Directory Column 2: Service (Col span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-[#D4AF37] border-b border-white/10 pb-2">
            {t('SERVICE')}
          </h4>
          <ul className="space-y-2 text-xs text-neutral-400 font-light">
            <li><a href="#footer" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Versand & Lieferung')}</a></li>
            <li><a href="#footer" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Rückgabe')}</a></li>
            <li><a href="#footer" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Zahlungsmöglichkeiten')}</a></li>
            <li><a href="#footer" className="hover:text-[#D4AF37] hover:underline transition-all">{t('FAQ')}</a></li>
            <li><a href="#footer" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Kontakt')}</a></li>
          </ul>
        </div>

        {/* Directory Column 3: Unternehmen (Col span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-[#D4AF37] border-b border-white/10 pb-2">
            {t('UNTERNEHMEN')}
          </h4>
          <ul className="space-y-2 text-xs text-neutral-400 font-light">
            <li><a href="#footer" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Über Uns')}</a></li>
            <li><a href="#philosophie" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Designphilosophie')}</a></li>
            <li><a href="#footer" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Nachhaltigkeit')}</a></li>
            <li><a href="#footer" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Karriere')}</a></li>
            <li><a href="#footer" className="hover:text-[#D4AF37] hover:underline transition-all">{t('Presse')}</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter Form (Col span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-[#D4AF37] border-b border-white/10 pb-2">
            {t('NEWSLETTER')}
          </h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            {t('Bleiben Sie inspiriert.')}
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="relative flex items-center border border-white/10 bg-white/5 hover:border-[#D4AF37] focus-within:border-[#D4AF37] transition-colors rounded-sm overflow-hidden">
              <input
                type="email"
                placeholder={t('E-Mail Adresse')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-xs bg-transparent border-none text-white placeholder-neutral-600 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="absolute right-1 p-1.5 text-neutral-400 hover:text-[#D4AF37] transition-colors"
                aria-label="Newsletter abonnieren"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Checkbox Consent */}
            <label className="flex items-start gap-2 text-[10px] text-neutral-400 leading-normal cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#D4AF37] rounded-xs"
              />
              <span>{t('Ich stimme der Datenschutzerklärung zu.')}</span>
            </label>

            {/* Notification messages */}
            {status === 'success' && (
              <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-mono leading-none pt-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>{message}</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-mono leading-tight pt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Copyright and Legal Terms bar */}
      <div className="w-full bg-[#0A0A0A] text-neutral-500 text-[10px] font-mono uppercase tracking-widest py-6 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5">
        <div>
          {t('© 2026 NEUE FORM BERLIN')}
        </div>
        <div className="flex items-center gap-6 font-light">
          <a href="#footer" className="hover:text-[#D4AF37] transition-colors">{t('Impressum')}</a>
          <a href="#footer" className="hover:text-[#D4AF37] transition-colors">{t('Datenschutz')}</a>
          <a href="#footer" className="hover:text-[#D4AF37] transition-colors">{t('AGB')}</a>
        </div>
      </div>
    </footer>
  );
}
