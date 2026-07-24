import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, MapPin, Clock, UtensilsCrossed, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getRestaurantOpenStatus } from '../utils/timeUtils';
import { makePhoneCall } from '../utils/phoneUtils';

interface HeaderProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCallClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  activeTab,
  setActiveTab,
  onCallClick
}) => {
  const [openStatus, setOpenStatus] = useState(getRestaurantOpenStatus());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setOpenStatus(getRestaurantOpenStatus());
    }, 30000);

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'menu', label: 'La Carte & Menu', icon: UtensilsCrossed },
    { id: 'builder', label: 'Studio Custom', icon: Sparkles, badge: 'Nouveau' },
    { id: 'promos', label: 'Formules & Promos', icon: ShoppingBag },
    { id: 'location', label: 'Accès & Horaires', icon: MapPin },
    { id: 'reviews', label: 'Avis Clients', icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/95 backdrop-blur-md border-b border-amber-500/20 text-stone-100 shadow-xl transition-all">
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-stone-950 text-xs font-semibold py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.fullAddress} (Métro Cusset)</span>
            </span>
            <span className="hidden md:inline text-amber-950">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{openStatus.nextChangeMessage}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s/g, '')}`}
              onClick={(e) => {
                e.preventDefault();
                makePhoneCall(RESTAURANT_INFO.phonePrimary);
              }}
              className="flex items-center gap-1 hover:underline font-bold cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.phonePrimary}</span>
            </a>
            <span className="text-amber-950">/</span>
            <a 
              href={`tel:${RESTAURANT_INFO.phoneSecondary.replace(/\s/g, '')}`}
              onClick={(e) => {
                e.preventDefault();
                makePhoneCall(RESTAURANT_INFO.phoneSecondary);
              }}
              className="hover:underline font-bold cursor-pointer"
            >
              {RESTAURANT_INFO.phoneSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('menu')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
              <span className="text-2xl font-black text-amber-500 tracking-tighter group-hover:rotate-6 transition-transform">
                LP
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-wider text-stone-100 uppercase font-sans">
                LE <span className="text-amber-500">PASSAGER</span>
              </h1>
              {/* Live Status Badge */}
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                openStatus.isOpen 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  openStatus.isOpen ? 'bg-emerald-400' : 'bg-rose-400'
                }`} />
                <span className="hidden xs:inline">{openStatus.isOpen ? 'OUVERT' : 'FERMÉ'}</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              Villeurbanne • Tacos, Burgers, Roulés & Pizzas
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-orange-600 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Direct Phone Call Button */}
          <button
            onClick={onCallClick}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all shadow-sm"
          >
            <Phone className="w-4 h-4 text-amber-500" />
            <span>Appeler</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
          >
            <ShoppingBag className="w-5 h-5 text-stone-950" />
            <span className="hidden sm:inline">Panier</span>
            {cartItemCount > 0 && (
              <span className="flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full bg-stone-950 text-amber-400 text-xs font-black">
                {cartItemCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden md:inline pl-1 border-l border-stone-900/40 text-stone-950 font-black">
                {cartTotal.toFixed(2)}€
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-white border border-stone-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl text-left font-medium text-sm flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-300 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-stone-950' : 'text-amber-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-orange-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCallClick();
              }}
              className="w-full py-3 rounded-xl bg-stone-900 text-amber-400 border border-amber-500/30 font-bold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Commander par Téléphone ({RESTAURANT_INFO.phonePrimary})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
