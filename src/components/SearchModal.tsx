import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Product, Language, Currency } from '../types';
import { PRODUCTS } from '../data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  language: Language;
  currency: Currency;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
  language,
  currency,
  t,
  formatPrice
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const nameStr = (language === 'DE' ? product.name : t(product.name)).toLowerCase();
    const catStr = t(product.category).toLowerCase();
    const searchStr = query.toLowerCase();
    return nameStr.includes(searchStr) || catStr.includes(searchStr);
  });

  const popularKeywords = language === 'DE' 
    ? ['Leuchte', 'Koffer', 'Uhr', 'Vase', 'Aluminium', 'Bauhaus']
    : ['Lamp', 'Suitcase', 'Watch', 'Vase', 'Aluminum', 'Bauhaus'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xs"
            id="search-backdrop"
          />

          {/* Search Container (Sliding down from top) */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative w-full bg-[#121212] border-b border-white/10 shadow-2xl px-6 md:px-12 py-8 md:py-12 z-10"
            id="search-panel"
          >
            <div className="max-w-4xl mx-auto">
              {/* Top row with input and close button */}
              <div className="flex items-center justify-between gap-4 border-b border-[#D4AF37] pb-3">
                <Search className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('Produkte suchen...')}
                  className="flex-1 bg-transparent border-none text-base md:text-lg focus:outline-none placeholder-neutral-500 font-light text-white"
                  id="search-input-field"
                />
                <button
                  onClick={onClose}
                  className="p-1 text-neutral-400 hover:text-white transition-colors rounded cursor-pointer"
                  id="close-search-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic Suggestions & Results */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[150px]">
                {/* Left column: Quick keywords */}
                <div className="md:border-r border-white/5 pr-0 md:pr-8">
                  <h4 className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest mb-4">
                    {language === 'DE' ? 'BELIEBTE BEGRIFFE' : 'POPULAR SEARCHES'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularKeywords.map((kw) => (
                      <button
                        key={kw}
                        onClick={() => setQuery(kw)}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-neutral-300 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all rounded-xs cursor-pointer"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right columns: Live Search Results */}
                <div className="col-span-2">
                  <h4 className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest mb-4">
                    {query ? `${t('Suche')} (${filteredProducts.length})` : (language === 'DE' ? 'UNSERE KOLLEKTION' : 'OUR COLLECTION')}
                  </h4>

                  {filteredProducts.length === 0 ? (
                    <div className="py-6 text-xs text-neutral-400 font-light" id="no-results-msg">
                      {t('Keine Produkte gefunden')} "{query}"
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto no-scrollbar" id="search-results-grid">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                          }}
                          className="flex gap-3 p-2 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer group rounded-xs"
                        >
                          <div className="w-12 h-12 bg-[#0A0A0A] border border-white/5 flex-shrink-0 flex items-center justify-center p-1 rounded">
                            <img
                              src={product.image}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain brightness-95"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-center min-w-0">
                            <h5 className="text-xs font-light tracking-wide text-white truncate uppercase group-hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
                              {language === 'DE' ? product.name : t(product.name)}
                              <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all" />
                            </h5>
                            <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-light">
                              {t(product.category)} — {formatPrice(product.priceEUR)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
