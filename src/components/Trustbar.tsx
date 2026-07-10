import React from 'react';
import { Truck, RefreshCw, ShieldCheck, Leaf } from 'lucide-react';
import { Language } from '../types';

interface TrustbarProps {
  language: Language;
  t: (key: string) => string;
}

export default function Trustbar({ language, t }: TrustbarProps) {
  return (
    <div className="w-full bg-[#121212] text-[#E5E5E5] py-8 px-6 md:px-12 border-b border-white/5 z-10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
        
        {/* Pillar 1: Free Shipping */}
        <div className="flex items-center gap-4 lg:px-6 lg:border-r border-white/10 last:border-r-0">
          <Truck className="w-5 h-5 text-[#D4AF37] shrink-0 stroke-[1.5]" />
          <div>
            <h4 className="font-mono text-[10px] tracking-widest font-semibold uppercase text-white leading-tight">
              {t('KOSTENLOSER VERSAND')}
            </h4>
            <p className="text-[10px] text-neutral-400 font-light mt-0.5">
              {t('Ab 100 € Bestellwert')}
            </p>
          </div>
        </div>

        {/* Pillar 2: 30-Day Returns */}
        <div className="flex items-center gap-4 lg:px-6 lg:border-r border-white/10 last:border-r-0">
          <RefreshCw className="w-5 h-5 text-[#D4AF37] shrink-0 stroke-[1.5]" />
          <div>
            <h4 className="font-mono text-[10px] tracking-widest font-semibold uppercase text-white leading-tight">
              {t('30 TAGE RÜCKGABERECHT')}
            </h4>
            <p className="text-[10px] text-neutral-400 font-light mt-0.5">
              {t('Einfach & unkompliziert')}
            </p>
          </div>
        </div>

        {/* Pillar 3: Secure Checkout */}
        <div className="flex items-center gap-4 lg:px-6 lg:border-r border-white/10 last:border-r-0">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 stroke-[1.5]" />
          <div>
            <h4 className="font-mono text-[10px] tracking-widest font-semibold uppercase text-white leading-tight">
              {t('SICHERE ZAHLUNG')}
            </h4>
            <p className="text-[10px] text-neutral-400 font-light mt-0.5">
              {t('SSL-Verschlüsselt')}
            </p>
          </div>
        </div>

        {/* Pillar 4: Sustainable Production */}
        <div className="flex items-center gap-4 lg:px-6">
          <Leaf className="w-5 h-5 text-[#D4AF37] shrink-0 stroke-[1.5]" />
          <div>
            <h4 className="font-mono text-[10px] tracking-widest font-semibold uppercase text-white leading-tight">
              {t('NACHHALTIGE PRODUKTION')}
            </h4>
            <p className="text-[10px] text-neutral-400 font-light mt-0.5">
              {t('Verantwortung für morgen')}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
