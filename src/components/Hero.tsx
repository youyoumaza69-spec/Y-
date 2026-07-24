import React from 'react';
import { UtensilsCrossed, Sparkles, Phone, MapPin, ChevronRight, Flame, ShieldCheck, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getRestaurantOpenStatus } from '../utils/timeUtils';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenBuilder: () => void;
  onCallClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenBuilder,
  onCallClick
}) => {
  const openStatus = getRestaurantOpenStatus();

  return (
    <div className="relative overflow-hidden bg-stone-950 text-stone-100 py-12 lg:py-20 border-b border-amber-500/20">
      {/* Background Decorative Blur & Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Eyebrow Pills */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Villeurbanne • 70 Rue Léon Blum</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-stone-900 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>Sauce Gruyère Fait Maison</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-100 uppercase tracking-tight leading-none font-sans">
              L'expérience Fast-Food <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Ultime & Gourmande
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Tacos généreux gratinés au four, Roulés cuits en pâte à pizza, Burgers gourmets, Assiettes garnies et Pizzas artisanales. À déguster <span className="text-amber-400 font-semibold">sur place ou à emporter</span> à Villeurbanne.
            </p>

            {/* Live Opening Status Box */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-sm max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${openStatus.isOpen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Statut du Snack</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      openStatus.isOpen ? 'bg-emerald-500 text-stone-950' : 'bg-rose-500 text-white'
                    }`}>
                      {openStatus.isOpen ? 'Ouvert' : 'Fermé'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-stone-200">{openStatus.nextChangeMessage}</p>
                </div>
              </div>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0 underline"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Station Métro Cusset</span>
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <UtensilsCrossed className="w-5 h-5 text-stone-950" />
                <span>Consulter la Carte</span>
                <ChevronRight className="w-5 h-5 text-stone-950" />
              </button>

              <button
                onClick={onOpenBuilder}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-400 border border-amber-500/30 font-bold text-base flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>Composer mon Tacos</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-400 font-medium max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Viandes Halal</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Carte bancaire acceptée</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Accès Handicapés</span>
              </div>
            </div>

          </div>

          {/* Right Column - Generated Hero Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glowing Border Card */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/40 via-orange-500/20 to-transparent shadow-2xl shadow-amber-500/20">
                <div className="relative rounded-[22px] overflow-hidden bg-stone-900 aspect-[4/3] lg:aspect-square">
                  <img
                    src="/images/le_passager_hero_1784773713477.jpg"
                    alt="Spécialités Le Passager Fast Food Villeurbanne"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80" />

                  {/* Floating Highlight Badges */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/90 border border-stone-800 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black uppercase text-amber-500 tracking-wider">
                        ★ Le Spécial Roulé Maison
                      </span>
                      <p className="text-sm font-extrabold text-white">
                        Cuisson unique en Pâte à Pizza
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400">À partir de</span>
                      <p className="text-lg font-black text-amber-400">9.00€</p>
                    </div>
                  </div>

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 right-4 bg-orange-600 text-white font-black text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>7/7 à Villeurbanne</span>
                  </div>

                </div>
              </div>

              {/* Decorative Secondary Mini Card */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex p-3 rounded-2xl bg-stone-900/95 border border-amber-500/30 shadow-2xl backdrop-blur-md items-center gap-3">
                <img
                  src="/images/le_passager_tacos_1784773732447.jpg"
                  alt="Tacos Gratiné"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="pr-2">
                  <p className="text-xs font-bold text-stone-200">Option Gratinage</p>
                  <p className="text-xs text-amber-400 font-extrabold">Chèvre Miel, Mozza, Raclette +3€</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
