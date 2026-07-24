import React, { useState } from 'react';
import { Sparkles, Flame, Plus, Minus, CheckCircle, Tag } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface PromosFormulesProps {
  onSelectItem: (item: MenuItem, initialQty?: number) => void;
}

export const PromosFormules: React.FC<PromosFormulesProps> = ({ onSelectItem }) => {
  const promoItems = MENU_ITEMS.filter(item => item.category === 'pizzas_promos');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQty = (id: string) => quantities[id] || 1;

  const setQty = (id: string, qty: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, qty)
    }));
  };

  return (
    <section id="promos" className="py-16 bg-stone-900 text-stone-100 border-b border-amber-500/20 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-black uppercase tracking-widest">
            <Tag className="w-3.5 h-3.5 text-orange-500" />
            <span>Offres Spéciales Duo & Groupe</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Les Promos & <span className="text-amber-500">Formules Pizza & Tacos</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Partagez un bon repas entre amis ou en famille avec nos packs géants et nos bouteilles de boisson offertes !
          </p>
        </div>

        {/* Promos Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promoItems.map((promo) => (
            <div
              key={promo.id}
              className="bg-stone-950 border border-amber-500/30 hover:border-amber-500 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900">
                  <img
                    src={promo.image}
                    alt={promo.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>Offre Spéciale</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">{promo.name}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">{promo.description}</p>
                </div>

                <div className="space-y-1 pt-1">
                  {promo.tags?.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Prix du Pack</span>
                    <span className="text-2xl font-black text-amber-400">{(promo.priceSeul * getQty(promo.id)).toFixed(2)}€</span>
                  </div>

                  {/* Inline Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-stone-900 p-1.5 rounded-xl border border-stone-800">
                    <button
                      type="button"
                      onClick={() => setQty(promo.id, getQty(promo.id) - 1)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                      title="Réduire quantité"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black text-white px-1.5 min-w-[20px] text-center">
                      {getQty(promo.id)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(promo.id, getQty(promo.id) + 1)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                      title="Augmenter quantité"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onSelectItem(promo, getQty(promo.id))}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4 text-stone-950 fill-current" />
                  <span>Commander {getQty(promo.id) > 1 ? `(${getQty(promo.id)}x)` : ''}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
