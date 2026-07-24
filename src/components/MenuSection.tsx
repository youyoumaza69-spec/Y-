import React, { useState } from 'react';
import { Search, Flame, Sparkles, Plus, Minus, Star, Filter, Info } from 'lucide-react';
import { CategoryId, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem, initialQty?: number) => void;
}

const CATEGORIES: { id: CategoryId; label: string; icon: string }[] = [
  { id: 'all', label: 'Toute la Carte', icon: '🍽️' },
  { id: 'pizzas', label: 'Nos Pizzas', icon: '🍕' },
  { id: 'tacos', label: 'Nos Tacos', icon: '🌮' },
  { id: 'roules', label: 'Nos Roulés', icon: '🌯' },
  { id: 'burgers', label: 'Nos Burgers', icon: '🍔' },
  { id: 'assiettes', label: 'Nos Assiettes', icon: '🥗' },
  { id: 'gratinages', label: 'Nos Gratinages', icon: '🧀' },
  { id: 'texmex', label: 'Tex-Mex', icon: '🍗' },
  { id: 'pizzas_promos', label: 'Formules & Promos', icon: '🏷️' },
  { id: 'enfants', label: 'Menu Enfant', icon: '🧸' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQty = (id: string) => quantities[id] || 1;

  const setQty = (id: string, qty: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, qty)
    }));
  };

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category match
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // Popular match
    if (onlyPopular && !item.isPopular) {
      return false;
    }
    // Search match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTags = item.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  return (
    <section id="menu" className="py-12 bg-stone-950 text-stone-100 min-h-screen border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-black text-amber-500 uppercase tracking-widest">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>La Carte Officielle • Le Passager Villeurbanne</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Nos Spécialités <span className="text-amber-500">& Gourmandises</span>
            </h2>
          </div>

          {/* Search & Quick Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un plat, une viande, une sauce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <button
              onClick={() => setOnlyPopular(!onlyPopular)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                onlyPopular
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-black'
                  : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Best-Sellers Uniquement</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-stone-900/50 rounded-3xl border border-stone-800 max-w-md mx-auto">
            <Info className="w-10 h-10 text-stone-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">Aucun produit ne correspond à votre recherche</h3>
            <p className="text-xs text-stone-400">Essayez de changer les filtres ou le mot-clé tapé dans la barre de recherche.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyPopular(false);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/10 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {item.isPopular && (
                          <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-amber-500 text-stone-950 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            <span>Popular</span>
                          </span>
                        )}
                        {item.isNew && (
                          <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-orange-600 text-white">
                            Nouveau
                          </span>
                        )}
                      </div>

                      {item.priceMenu && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-stone-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                          Seul / Menu
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-base text-white group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tags List */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-stone-800 text-stone-300 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer & Action */}
                <div className="p-5 pt-0 border-t border-stone-800/60 mt-3 pt-3 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">
                        {item.options?.pizzaSizes ? 'Prix Senior (33cm)' : 'Prix'}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-amber-400">
                          {(item.priceSeul * getQty(item.id)).toFixed(2)}€
                        </span>
                        {item.priceMenu && (
                          <span className="text-xs text-stone-400 font-medium">
                            / {item.priceMenu.toFixed(2)}€ menu
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Inline Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-stone-950 p-1.5 rounded-xl border border-stone-800">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQty(item.id, getQty(item.id) - 1);
                        }}
                        className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                        title="Réduire quantité"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-white px-1.5 min-w-[20px] text-center">
                        {getQty(item.id)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQty(item.id, getQty(item.id) + 1);
                        }}
                        className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                        title="Augmenter quantité"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectItem(item, getQty(item.id))}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all transform active:scale-95"
                  >
                    <Plus className="w-4 h-4 text-stone-950 fill-current" />
                    <span>Ajouter {getQty(item.id) > 1 ? `(${getQty(item.id)}x)` : ''}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
