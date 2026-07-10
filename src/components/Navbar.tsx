import React, { useState } from 'react';
import { Search, Menu, X, ShoppingBag, User, Check, Globe, ChevronDown } from 'lucide-react';
import { Language, Currency } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  language: Language;
  currency: Currency;
  onSwitchLanguage: (lang: Language) => void;
  onSwitchCurrency: (curr: Currency) => void;
  t: (key: string) => string;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenSearch,
  language,
  currency,
  onSwitchLanguage,
  onSwitchCurrency,
  t
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleLanguageSelect = (lang: Language, curr: Currency) => {
    onSwitchLanguage(lang);
    onSwitchCurrency(curr);
    setLangDropdownOpen(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.includes('@')) {
      setLoginMessage(language === 'DE' ? 'Ungültige E-Mail.' : 'Invalid email.');
      return;
    }
    setIsLoggedIn(true);
    setLoginMessage(language === 'DE' ? 'Erfolgreich angemeldet!' : 'Successfully logged in!');
    setTimeout(() => {
      setAccountModalOpen(false);
      setLoginMessage('');
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginEmail('');
    setAccountModalOpen(false);
  };

  return (
    <>
      <header className="w-full bg-[#0A0A0A] text-[#E5E5E5] z-40 relative">
        {/* Top Info Ribbon */}
        <div className="w-full bg-[#121212] text-neutral-400 text-[10px] uppercase font-mono tracking-wider py-2.5 px-6 md:px-12 flex flex-wrap justify-between items-center gap-3 border-b border-white/5">
          <div className="hidden sm:block font-light text-left text-neutral-400">
            {language === 'DE' ? 'Kostenloser Versand ab 100 €' : 'Free shipping over €100'}
          </div>
          <div className="mx-auto sm:mx-0 font-medium text-center tracking-widest text-[#D4AF37]">
            {language === 'DE' ? 'Entworfen in Deutschland — Für die Zukunft' : 'Designed in Germany — For the Future'}
          </div>
          <div className="flex items-center gap-6 font-light shrink-0 ml-auto sm:ml-0">
            {/* Interactive Language / Currency Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="hover:text-white flex items-center gap-1 cursor-pointer select-none transition-colors"
                id="lang-switcher-trigger"
              >
                <span>{language} / {currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£'}</span>
                <ChevronDown className="w-2.5 h-2.5 opacity-60" />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-[#121212] border border-white/10 text-neutral-300 w-32 py-1.5 shadow-xl z-50 text-[10px] uppercase font-mono">
                  <button
                    onClick={() => handleLanguageSelect('DE', 'EUR')}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 hover:text-white flex justify-between items-center"
                  >
                    <span>DE / € (EUR)</span>
                    {language === 'DE' && <Check className="w-3 h-3 text-[#D4AF37]" />}
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('EN', 'USD')}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 hover:text-white flex justify-between items-center"
                  >
                    <span>EN / $ (USD)</span>
                    {language === 'EN' && currency === 'USD' && <Check className="w-3 h-3 text-[#D4AF37]" />}
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('EN', 'GBP')}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 hover:text-white flex justify-between items-center"
                  >
                    <span>EN / £ (GBP)</span>
                    {language === 'EN' && currency === 'GBP' && <Check className="w-3 h-3 text-[#D4AF37]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Account Link */}
            <button
              onClick={() => setAccountModalOpen(true)}
              className="hover:text-white flex items-center gap-1.5 cursor-pointer select-none transition-colors"
              id="account-btn"
            >
              <User className="w-3 h-3" />
              <span>{isLoggedIn ? (language === 'DE' ? 'Konto' : 'Account') : t('KONTO')}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="hover:text-white flex items-center gap-1.5 cursor-pointer select-none font-medium text-white transition-colors"
              id="cart-trigger-ribbon"
            >
              <ShoppingBag className="w-3 h-3 text-[#D4AF37]" />
              <span>{t('WARENKORB')} ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Main Branding & Navigation Row */}
        <div className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-white/5 bg-[#0A0A0A]/95 backdrop-blur-md">
          {/* Logo Brand Title */}
          <a href="#" className="flex flex-col select-none group" id="brand-logo">
            <span className="font-display font-medium text-[20px] md:text-[22px] tracking-[0.45em] leading-none text-white group-hover:text-[#D4AF37] transition-colors duration-300">
              NEUE FORM
            </span>
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.65em] uppercase text-[#D4AF37]/80 mt-1 pl-1 group-hover:text-white transition-colors duration-300">
              BERLIN
            </span>
          </a>

          {/* Center: Main Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            <a href="#products" className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">
              {t('PRODUKTE')}
            </a>
            <a href="#products" className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">
              {t('KATEGORIEN')}
            </a>
            <a href="#philosophie" className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">
              {t('DESIGNPHILOSOPHIE')}
            </a>
            <a href="#journal" className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">
              {t('JOURNAL')}
            </a>
            <a href="#footer" className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">
              {t('ÜBER UNS')}
            </a>
          </nav>

          {/* Right: Search trigger & Mobile Menu button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSearch}
              className="p-2 hover:bg-white/5 transition-colors cursor-pointer text-neutral-300 hover:text-white rounded"
              aria-label="Produktsuche"
              id="search-btn-trigger"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/5 transition-colors cursor-pointer text-neutral-300 hover:text-white rounded"
              aria-label="Menü"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-b border-white/5 bg-[#121212] px-6 py-6 flex flex-col gap-4 text-xs font-mono tracking-widest text-neutral-400 uppercase" id="mobile-nav-panel">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/5 hover:text-white"
            >
              {t('PRODUKTE')}
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/5 hover:text-white"
            >
              {t('KATEGORIEN')}
            </a>
            <a
              href="#philosophie"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/5 hover:text-white"
            >
              {t('DESIGNPHILOSOPHIE')}
            </a>
            <a
              href="#journal"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/5 hover:text-white"
            >
              {t('JOURNAL')}
            </a>
            <a
              href="#footer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 hover:text-white"
            >
              {t('ÜBER UNS')}
            </a>
          </nav>
        )}
      </header>

      {/* Login Account Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setAccountModalOpen(false)} className="absolute inset-0 bg-black/75 backdrop-blur-xs" />
          <div className="relative bg-[#121212] text-[#E5E5E5] p-8 max-w-sm w-full border border-white/10 shadow-2xl z-10 rounded-sm" id="account-modal">
            <button
              onClick={() => setAccountModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {isLoggedIn ? (
              <div className="text-center py-6">
                <User className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
                <h3 className="font-display text-lg font-medium tracking-tight mb-1">
                  {language === 'DE' ? 'Willkommen zurück!' : 'Welcome back!'}
                </h3>
                <p className="font-mono text-xs text-neutral-400 mb-6">{loginEmail || 'tom@ahyx.org'}</p>
                <div className="bg-white/5 border border-white/10 p-4 text-left rounded text-xs space-y-2.5 mb-6 text-neutral-300">
                  <div className="flex justify-between font-light">
                    <span>{language === 'DE' ? 'Status' : 'Status'}</span>
                    <span className="font-semibold text-[#D4AF37] uppercase tracking-wider text-[10px] font-mono">Premium Member</span>
                  </div>
                  <div className="flex justify-between font-light border-t border-white/10 pt-2.5">
                    <span>{language === 'DE' ? 'Konto-Typ' : 'Account Type'}</span>
                    <span>Studio Collector</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#D4AF37] text-black py-3 px-4 font-mono text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                >
                  {language === 'DE' ? 'ABMELDEN' : 'LOG OUT'}
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-display text-xl font-medium tracking-tight mb-2 uppercase text-[#D4AF37]">
                  {language === 'DE' ? 'Mein Konto' : 'My Account'}
                </h3>
                <p className="text-xs text-neutral-400 mb-6 font-light leading-relaxed">
                  {language === 'DE' 
                    ? 'Melden Sie sich an, um Bestellungen zu verfolgen und exklusive Studio-Editionen freizuschalten.' 
                    : 'Log in to track orders and unlock exclusive Studio editions.'}
                </p>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      {language === 'DE' ? 'E-Mail-Adresse' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full border border-white/10 bg-white/5 px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] font-light text-white placeholder-neutral-600"
                    />
                  </div>

                  {loginMessage && (
                    <p className={`text-xs ${loginMessage.includes('Erfolgreich') || loginMessage.includes('Successfully') ? 'text-green-400' : 'text-red-400'}`}>
                      {loginMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] text-black py-3.5 px-4 font-mono text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                  >
                    {language === 'DE' ? 'ANMELDEN' : 'LOG IN'}
                  </button>
                </form>

                <div className="mt-6 border-t border-white/10 pt-4 text-center">
                  <p className="text-[11px] text-neutral-400 font-light">
                    {language === 'DE' ? 'Noch kein Konto?' : 'No account yet?'} <span className="text-white font-medium cursor-pointer underline hover:text-[#D4AF37]">{language === 'DE' ? 'Registrieren' : 'Sign up'}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
