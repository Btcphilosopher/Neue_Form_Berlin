import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Check, ShieldCheck, RefreshCw, Compass } from 'lucide-react';
import { Product, Language, Currency } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  language: Language;
  currency: Currency;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  language,
  currency,
  t,
  formatPrice
}: ProductModalProps) {
  if (!product) return null;

  // Features translation fallback/helpers
  const features = language === 'DE' ? product.features : [
    product.id === 'signal-tischleuchte' ? 'Rotatable shade for direct and indirect lighting' :
    product.id === 'raum-koffer-aluminium' ? 'Silent 360° multiwheel system for effortless gliding' :
    product.id === 'zeitgeist-automatik' ? 'Automatic caliber with 42 hours power reserve' :
    'Hand-thrown in a traditional Saxon pottery studio',
    
    product.id === 'signal-tischleuchte' ? 'Classic toggle switch on the solid base' :
    product.id === 'raum-koffer-aluminium' ? 'Double TSA combination lock for maximum security' :
    product.id === 'zeitgeist-automatik' ? 'Fine-mesh Milanese bracelet with safety clasp' :
    'Unique tactile surface structure',
    
    product.id === 'signal-tischleuchte' ? 'Textile-covered power cable (2.5m) in deep black' :
    product.id === 'raum-koffer-aluminium' ? 'Infinitely adjustable telescopic handle made of tempered aluminum' :
    product.id === 'zeitgeist-automatik' ? 'Scratch-resistant, domed sapphire crystal' :
    'Fully waterproof specialized interior glazing',
    
    product.id === 'signal-tischleuchte' ? 'Certificate of authenticity with engraved serial number' :
    product.id === 'raum-koffer-aluminium' ? 'Thoughtful interior with flexible packing dividers' :
    product.id === 'zeitgeist-automatik' ? 'Waterproof up to 5 ATM' :
    'Embossed studio stamp on the underside'
  ];

  const description = language === 'DE' ? product.description : (
    product.id === 'signal-tischleuchte' ? 'An iconic silhouette representing the high point of mid-century German functionalism. The Signal Table Lamp is designed to serve as an architectural highlight in any work or living area. The adjustable reflector shade allows for precise light placement.' :
    product.id === 'raum-koffer-aluminium' ? 'Developed for modern travelers who value precise engineering and long-lasting craftsmanship. The ribbed aluminum shell of the Raum Suitcase absorbs shocks while developing a beautiful, architectural patina over time that tells the story of your journeys.' :
    product.id === 'zeitgeist-automatik' ? 'A celebration of modern Bauhaus watchmaking. The Zeitgeist Automatic combines a clear, purist dial with a whisper-quiet mechanical automatic movement. A timeless statement on the wrist for the conscious aesthete.' :
    'The Struktur Vase explores the interplay of architectural geometry and organic stoneware. Its deep black, matte surface absorbs ambient light, emphasizing its minimalist silhouette, with or without flowers.'
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            id="modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-5xl bg-[#121212] text-[#E5E5E5] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[85vh] border border-white/10 rounded-sm"
            id="product-modal-card"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Schließen"
              id="close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image Container */}
            <div className="w-full md:w-1/2 bg-[#0A0A0A] relative flex items-center justify-center p-6 min-h-[280px] md:min-h-0 border-r border-white/5">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[350px] md:max-h-[500px]"
                id="modal-product-img"
              />
              <div className="absolute top-4 left-4 bg-[#D4AF37]/90 text-black px-3 py-1 text-[10px] font-mono tracking-widest uppercase font-medium rounded-xs">
                {t(product.category)}
              </div>
            </div>

            {/* Right Column: Information (Scrollable) */}
            <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 overflow-y-auto no-scrollbar flex flex-col justify-between bg-[#121212]">
              <div>
                {/* Brand & Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono tracking-widest text-neutral-500">NEUE FORM BERLIN</span>
                  <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase font-medium">{t(product.category)}</span>
                </div>

                {/* Title */}
                <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-white mb-3" id="modal-product-title">
                  {language === 'DE' ? product.name : t(product.name)}
                </h2>

                {/* Price */}
                <div className="text-xl font-mono text-neutral-300 mb-6" id="modal-product-price">
                  {formatPrice(product.priceEUR)}
                </div>

                {/* Description */}
                <div className="border-t border-white/5 pt-5 mb-6">
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mb-4" id="modal-product-desc">
                    {description}
                  </p>
                </div>

                {/* Specs / Details Grid */}
                <div className="mb-6 bg-white/5 border border-white/5 p-4 text-xs space-y-2.5 rounded-xs">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] mb-2">
                    {t('Details & Spezifikationen')}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-neutral-500 font-light">{t('Designer')}</span>
                    <span className="col-span-2 text-neutral-200 font-medium">{product.designer}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2">
                    <span className="text-neutral-500 font-light">{t('Material')}</span>
                    <span className="col-span-2 text-neutral-200 font-light">{language === 'DE' ? product.material : (product.id === 'signal-tischleuchte' ? 'Powder-coated steel, solid brass' : product.id === 'raum-koffer-aluminium' ? 'High-grade aluminum-magnesium alloy' : product.id === 'zeitgeist-automatik' ? '316L Surgical steel, sapphire crystal' : 'Hand-thrown stoneware, matte glaze')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2">
                    <span className="text-neutral-500 font-light">{t('Abmessungen')}</span>
                    <span className="col-span-2 text-neutral-200 font-mono text-[11px]">{language === 'DE' ? product.dimensions : (product.id === 'signal-tischleuchte' ? 'H: 45 cm, Shade Ø: 30 cm, Base Ø: 18 cm' : product.id === 'raum-koffer-aluminium' ? '55 x 40 x 23 cm (Carry-on size)' : product.id === 'zeitgeist-automatik' ? 'Case Ø: 38 mm, Thickness: 9.8 mm' : 'H: 28 cm, Ø: 14 cm')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2">
                    <span className="text-neutral-500 font-light">{t('Gewicht')}</span>
                    <span className="col-span-2 text-neutral-200 font-mono text-[11px]">{product.weight}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2">
                    <span className="text-neutral-500 font-light">{t('Herkunft')}</span>
                    <span className="col-span-2 text-neutral-200 font-light">{language === 'DE' ? product.origin : (product.id === 'signal-tischleuchte' ? 'Berlin, Germany' : product.id === 'raum-koffer-aluminium' ? 'Cologne, Germany' : product.id === 'zeitgeist-automatik' ? 'Glashütte, Germany' : 'Dresden, Germany')}</span>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="mb-8">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">Highlights</h4>
                  <ul className="space-y-2 text-xs text-neutral-400 font-light">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action: Add to Cart */}
              <div className="border-t border-white/5 pt-6">
                <button
                  onClick={() => {
                    onAddToCart(product);
                  }}
                  className="w-full bg-[#D4AF37] text-black py-4 px-6 font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.99] duration-100 cursor-pointer"
                  id="modal-add-to-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t('In den Warenkorb')}
                </button>

                {/* Certifications Row */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] text-neutral-400 font-light text-center border-t border-white/5 pt-4">
                  <div className="flex flex-col items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-[#D4AF37]/80" />
                    <span>Berlin Classic</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]/80" />
                    <span>{t('SSL Secure')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]/80" />
                    <span>30 Tage</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
