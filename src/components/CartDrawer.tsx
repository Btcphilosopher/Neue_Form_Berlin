import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, Shield, Truck, CheckCircle2, RefreshCcw } from 'lucide-react';
import { CartItem, Product, Language, Currency } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  language: Language;
  currency: Currency;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  language,
  currency,
  t,
  formatPrice
}: CartDrawerProps) {
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.priceEUR * item.quantity), 0);
  const freeShippingThreshold = 100;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const neededForFreeShipping = freeShippingThreshold - subtotal;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutStatus('processing');
    
    // Simulate premium checkout delay
    setTimeout(() => {
      setCheckoutStatus('success');
      const generatedId = `NFB-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
    }, 2500);
  };

  const handleCompleteCheckout = () => {
    onClearCart();
    setCheckoutStatus('idle');
    onClose();
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={checkoutStatus !== 'processing' ? onClose : undefined}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            id="cart-backdrop"
          />

          {/* Slider Container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
              className="w-screen max-w-md bg-[#121212] text-[#E5E5E5] flex flex-col shadow-2xl h-full border-l border-white/10"
              id="cart-drawer-panel"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#121212]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <h2 className="font-display font-light tracking-widest text-sm uppercase text-white">
                    {t('WARENKORB')} ({totalItemCount})
                  </h2>
                </div>
                {checkoutStatus !== 'processing' && (
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white/5 text-neutral-400 hover:text-white transition-all rounded cursor-pointer"
                    aria-label="Warenkorb schließen"
                    id="close-cart-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Checkout Success Screen */}
              {checkoutStatus === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#121212]" id="checkout-success-view">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-16 h-16 bg-[#D4AF37]/25 rounded-full flex items-center justify-center text-[#D4AF37] mb-6"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-display text-xl font-light tracking-wide text-white mb-2">
                    {language === 'DE' ? 'Vielen Dank für Ihre Bestellung!' : 'Thank you for your order!'}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs mb-6 font-light leading-relaxed">
                    {language === 'DE' 
                      ? 'Ihre Zahlung wurde erfolgreich verarbeitet. Wir bereiten Ihre Designprodukte sorgfältig für den Versand vor.' 
                      : 'Your payment was successfully processed. We are carefully preparing your designer pieces for shipment.'}
                  </p>
                  
                  <div className="bg-white/5 p-4 w-full border border-white/5 mb-8 rounded">
                    <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-1">
                      {language === 'DE' ? 'BESTELLNUMMER' : 'ORDER NUMBER'}
                    </div>
                    <div className="font-mono text-sm font-semibold tracking-wider text-white">
                      {orderId}
                    </div>
                    <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mt-4 mb-1">
                      {language === 'DE' ? 'LIEFERZEIT' : 'ESTIMATED DELIVERY'}
                    </div>
                    <div className="text-xs text-neutral-300 font-medium">
                      {language === 'DE' ? '2–4 Werktage (Kostenlos)' : '2–4 Business Days (Free)'}
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteCheckout}
                    className="w-full bg-[#D4AF37] text-black py-4 px-6 font-mono text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors cursor-pointer"
                    id="finish-checkout-btn"
                  >
                    {language === 'DE' ? 'EINKAUF FORTSETZEN' : 'CONTINUE SHOPPING'}
                  </button>
                </div>
              ) : checkoutStatus === 'processing' ? (
                /* Checkout Processing Screen */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#121212]" id="checkout-processing-view">
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-t-[#D4AF37] animate-spin"></div>
                  </div>
                  <h3 className="font-display text-lg font-light tracking-wide text-white mb-2">
                    {language === 'DE' ? 'Zahlung wird verarbeitet...' : 'Processing payment...'}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs font-light leading-relaxed">
                    {language === 'DE' 
                      ? 'Ihre verschlüsselte SSL-Verbindung ist aktiv. Bitte schließen Sie dieses Fenster nicht.' 
                      : 'Your secure SSL connection is active. Please do not close this window.'}
                  </p>
                </div>
              ) : (
                /* Standard Cart Drawer Content */
                <>
                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-[#121212]">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-12" id="empty-cart-view">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#D4AF37]/55 mb-4 border border-white/5">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                          {t('Warenkorb leer')}
                        </p>
                        <p className="text-xs text-neutral-500 font-light max-w-[200px]">
                          {language === 'DE' 
                            ? 'Fügen Sie ausgewählte Bestseller hinzu, um Ihre Kollektion zu starten.' 
                            : 'Add selected bestsellers to begin your collection.'}
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Free Shipping Progress Meter */}
                        <div className="bg-white/5 p-4 border border-white/5 rounded-xs" id="shipping-progress">
                          <div className="flex items-center gap-2 mb-2 text-xs text-neutral-300">
                            <Truck className="w-4 h-4 text-[#D4AF37]" />
                            <span className="font-light">
                              {isFreeShipping ? (
                                <span className="font-medium text-white">
                                  {language === 'DE' 
                                    ? 'Ihre Bestellung qualifiziert sich für kostenlosen Versand!' 
                                    : 'Your order qualifies for free shipping!'}
                                </span>
                              ) : (
                                <span>
                                  {language === 'DE' 
                                    ? `Noch ${formatPrice(neededForFreeShipping)} bis zum kostenlosen Versand!` 
                                    : `Only ${formatPrice(neededForFreeShipping)} away from free shipping!`}
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                              transition={{ duration: 0.5 }}
                              className="bg-[#D4AF37] h-full"
                            />
                          </div>
                        </div>

                        {/* Cart Items List */}
                        <div className="space-y-4" id="cart-items-list">
                          {cartItems.map((item) => (
                            <motion.div
                              key={item.product.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="flex gap-4 pb-4 border-b border-white/5"
                            >
                              <div className="w-20 h-20 bg-[#0A0A0A] border border-white/5 flex-shrink-0 flex items-center justify-center p-2 rounded-xs">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  referrerPolicy="no-referrer"
                                  className="max-h-full max-w-full object-contain brightness-95"
                                />
                              </div>

                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <div className="flex justify-between items-start">
                                    <h4 className="text-xs font-display font-light text-white tracking-wide leading-tight uppercase">
                                      {language === 'DE' ? item.product.name : t(item.product.name)}
                                    </h4>
                                    <button
                                      onClick={() => onRemoveItem(item.product.id)}
                                      className="text-neutral-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                                      aria-label="Artikel entfernen"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <p className="text-[10px] font-mono tracking-widest text-[#D4AF37]/85 mt-1 uppercase">
                                    {t(item.product.category)}
                                  </p>
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                  {/* Quantity Selector */}
                                  <div className="flex items-center border border-white/10 text-xs rounded-xs bg-[#0A0A0A]">
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                                      className="p-1 px-2 text-neutral-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="w-2.5 h-2.5" />
                                    </button>
                                    <span className="px-2 font-mono text-[11px] text-white">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                                      className="p-1 px-2 text-neutral-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                                    >
                                      <Plus className="w-2.5 h-2.5" />
                                    </button>
                                  </div>

                                  {/* Price */}
                                  <span className="font-mono text-xs font-medium text-neutral-300">
                                    {formatPrice(item.product.priceEUR * item.quantity)}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Summary Footer */}
                  {cartItems.length > 0 && (
                    <div className="border-t border-white/10 p-6 bg-[#1A1A1A] space-y-4">
                      {/* Price Rows */}
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-neutral-400">
                          <span>{t('Zwischensumme')}</span>
                          <span className="font-mono font-medium text-white">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>{language === 'DE' ? 'Versand' : 'Shipping'}</span>
                          <span className="font-mono text-white">
                            {isFreeShipping 
                              ? (language === 'DE' ? 'KOSTENLOS' : 'FREE') 
                              : formatPrice(12.50)}
                          </span>
                        </div>
                        <div className="flex justify-between text-neutral-500 text-[10px] border-t border-white/5 pt-2">
                          <span>{t('MwSt. inkl.')} (19%)</span>
                          <span className="font-mono">{formatPrice(subtotal * 0.19)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold border-t border-white/5 pt-3">
                          <span className="text-white">Total</span>
                          <span className="font-mono text-base text-[#D4AF37]">
                            {formatPrice(subtotal + (isFreeShipping ? 0 : 12.50))}
                          </span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-[#D4AF37] text-black py-4 px-6 font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 hover:bg-white hover:text-black transition-colors active:scale-[0.99] duration-100 mt-2 cursor-pointer"
                        id="checkout-trigger-btn"
                      >
                        <CreditCard className="w-4 h-4" />
                        {t('Zur Kasse')}
                      </button>

                      {/* Security details */}
                      <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 font-light text-center pt-2">
                        <Shield className="w-3.5 h-3.5 text-[#D4AF37]/80" />
                        <span>{language === 'DE' ? 'Sichere 256-Bit SSL Verschlüsselung' : 'Secure 256-Bit SSL Encryption'}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
