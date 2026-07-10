import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Eye, Check } from 'lucide-react';
import { Product, Language, Currency } from '../types';
import { PRODUCTS } from '../data';

interface BestsellerGridProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  language: Language;
  currency: Currency;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
}

export default function BestsellerGrid({
  onSelectProduct,
  onAddToCart,
  language,
  currency,
  t,
  formatPrice
}: BestsellerGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = ['ALL', 'BELEUCHTUNG', 'REISE', 'ACCESSOIRES', 'WOHNEN'];

  const filteredProducts = activeCategory === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Avoid opening the detail modal
    onAddToCart(product);
    setAddedProductId(product.id);
    
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section className="w-full bg-[#0A0A0A] py-16 md:py-24 px-6 md:px-12 border-b border-white/5" id="products">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase">
              <span className="w-5 h-[1px] bg-[#D4AF37]" />
              <span className="text-neutral-400">{t('AUSGEWÄHLT')}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-wider text-white uppercase">
              {t('BESTSELLER')}
            </h2>
          </div>

          {/* Interactive Categories Filters / View All Selector */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 font-mono text-[10px] md:text-[11px] tracking-widest uppercase">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'text-[#D4AF37] border-b border-[#D4AF37] font-semibold'
                    : 'text-neutral-500 hover:text-white border-b border-transparent'
                }`}
              >
                {cat === 'ALL' ? (language === 'DE' ? 'ALLE' : 'ALL') : t(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12" id="bestseller-product-grid">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onSelectProduct(product)}
              className="flex flex-col group cursor-pointer"
              id={`product-card-${product.id}`}
            >
              {/* Product Card Image Wrapper */}
              <div className="w-full aspect-square bg-[#121212] border border-white/5 relative overflow-hidden flex items-center justify-center p-8 mb-4 rounded-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[220px] group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Overlay Quick-view Trigger on hover */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-[#121212] text-[#E5E5E5] px-4 py-2.5 font-mono text-[9px] tracking-widest uppercase flex items-center gap-2 border border-[#D4AF37]/40 shadow-xl">
                    <Eye className="w-3 h-3 text-[#D4AF37]" />
                    <span>{t('Schnelle Ansicht')}</span>
                  </div>
                </div>

                {/* Left corner Category Tag */}
                <span className="absolute top-4 left-4 bg-[#D4AF37]/90 text-black px-2.5 py-1 text-[9px] font-mono tracking-wider font-medium uppercase rounded-xs">
                  {t(product.category)}
                </span>
              </div>

              {/* Product Metadata & Quick-Add Button */}
              <div className="flex justify-between items-start mt-1 pr-1">
                <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                  <span className="block text-[9px] font-mono tracking-widest text-[#D4AF37]/80 uppercase">
                    {t(product.category)}
                  </span>
                  <h3 className="font-display text-xs font-medium text-[#E5E5E5] group-hover:text-[#D4AF37] transition-colors tracking-tight uppercase truncate">
                    {language === 'DE' ? product.name : t(product.name)}
                  </h3>
                  <span className="block font-mono text-xs text-neutral-400">
                    {formatPrice(product.priceEUR)}
                  </span>
                </div>

                {/* Interactive Add to Cart button */}
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className={`p-2.5 rounded-full border transition-all duration-300 relative overflow-hidden ${
                    addedProductId === product.id
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-black scale-105'
                      : 'bg-[#121212] border-white/10 text-neutral-400 hover:text-[#D4AF37] hover:border-[#D4AF37] active:scale-95'
                  }`}
                  aria-label={t('In den Warenkorb')}
                  title={t('In den Warenkorb')}
                  id={`quick-add-${product.id}`}
                >
                  {addedProductId === product.id ? (
                    <Check className="w-3.5 h-3.5 animate-pulse" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2]" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
