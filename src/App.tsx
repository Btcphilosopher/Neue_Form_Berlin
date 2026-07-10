import React, { useState, useEffect } from 'react';
import { Product, CartItem, Language, Currency } from './types';
import { PRODUCTS, TRANSLATIONS_EN } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trustbar from './components/Trustbar';
import BestsellerGrid from './components/BestsellerGrid';
import JournalSection from './components/JournalSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';

export default function App() {
  // Lang & Currency
  const [language, setLanguage] = useState<Language>('DE');
  const [currency, setCurrency] = useState<Currency>('EUR');

  // Cart & Overlays
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nfb_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  // Save cart changes
  useEffect(() => {
    localStorage.setItem('nfb_cart', JSON.stringify(cart));
  }, [cart]);

  // Translation Helper
  const t = (key: string): string => {
    if (language === 'EN') {
      return TRANSLATIONS_EN[key] || key;
    }
    return key;
  };

  // Price Formatter (converts EUR base to USD or GBP)
  const formatPrice = (priceEUR: number): string => {
    if (currency === 'USD') {
      const converted = (priceEUR * 1.10).toFixed(2);
      return `$${converted}`;
    }
    if (currency === 'GBP') {
      const converted = (priceEUR * 0.85).toFixed(2);
      return `£${converted}`;
    }
    // Default EUR: e.g., 179,00 €
    const formatted = priceEUR.toFixed(2).replace('.', ',');
    return `${formatted} €`;
  };

  // Cart Actions
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open cart drawer on successful add for immediate visual feedback
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Select Product Action (Triggers details modal)
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] flex flex-col justify-between selection:bg-[#D4AF37] selection:text-black" id="root-app-container">
      {/* Navigation Header */}
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        language={language}
        currency={currency}
        onSwitchLanguage={setLanguage}
        onSwitchCurrency={setCurrency}
        t={t}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Landing Hero Section */}
        <Hero language={language} t={t} />

        {/* Minimalist Trust Features ribbon */}
        <Trustbar language={language} t={t} />

        {/* Bestseller Catalog grid */}
        <BestsellerGrid
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          language={language}
          currency={currency}
          t={t}
          formatPrice={formatPrice}
        />

        {/* Editorial Journal feature */}
        <JournalSection language={language} t={t} />
      </main>

      {/* Footer directories & newsletter */}
      <Footer language={language} t={t} />

      {/* Drawer Overlay: Cart Panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        language={language}
        currency={currency}
        t={t}
        formatPrice={formatPrice}
      />

      {/* Modal Overlay: Product Details */}
      <ProductModal
        product={selectedProduct}
        isOpen={productModalOpen}
        onClose={() => {
          setProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        language={language}
        currency={currency}
        t={t}
        formatPrice={formatPrice}
      />

      {/* Modal Overlay: Search Overlay */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        language={language}
        currency={currency}
        t={t}
        formatPrice={formatPrice}
      />
    </div>
  );
}
