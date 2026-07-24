import React, { useState } from 'react';
import { Sparkles, Check, Flame, Plus, Minus, ShieldCheck, ShoppingBag } from 'lucide-react';
import { MenuItem, SelectedItemOption } from '../types';
import { AVAILABLE_MEATS, AVAILABLE_SAUCES, GRATINAGE_OPTIONS } from '../data/restaurantData';

interface CustomBuilderProps {
  onAddToCart: (item: MenuItem, option: SelectedItemOption, unitPrice: number, quantity: number) => void;
}

interface FormatOption {
  id: string;
  name: string;
  basePrice: number;
  meatsCount: number;
  category: 'tacos' | 'roules' | 'burgers' | 'assiettes';
  description: string;
  image: string;
}

const BUILDER_FORMATS: FormatOption[] = [
  {
    id: 'b-tacos-1',
    name: 'Tacos Classique',
    basePrice: 7.0,
    meatsCount: 1,
    category: 'tacos',
    description: 'Galette, viande et sauce au choix, sauce gruyère, frites, crudités.',
    image: '/src/assets/images/french_tacos_classic_1784775203858.jpg'
  },
  {
    id: 'b-tacos-royal',
    name: 'Tacos Royal',
    basePrice: 9.0,
    meatsCount: 1,
    category: 'tacos',
    description: 'Galette, viande et sauce au choix, sauce gruyère, frites, crudités + Supplément Cheddar & Œuf.',
    image: '/src/assets/images/french_tacos_royal_1784775217008.jpg'
  },
  {
    id: 'b-tacos-mustang',
    name: 'Tacos Mustang (Le Géant)',
    basePrice: 13.0,
    meatsCount: 2,
    category: 'tacos',
    description: 'Double galette et double viande, sauces, maxi frites, crudités & sauce gruyère faite maison.',
    image: '/src/assets/images/french_tacos_mustang_1784775231459.jpg'
  },
  {
    id: 'b-roule-maison',
    name: 'Roulé Maison',
    basePrice: 9.0,
    meatsCount: 1,
    category: 'roules',
    description: 'Pâte à pizza, 1 viande au choix, sauce, crudités, frites, sauce gruyère faite maison.',
    image: '/src/assets/images/roule_maison_photo_1784775731078.jpg'
  },
  {
    id: 'b-roule-royal',
    name: 'Roulé Royal',
    basePrice: 11.0,
    meatsCount: 1,
    category: 'roules',
    description: 'Pâte à pizza, 1 viande au choix, sauce, crudités, frites, sauce gruyère faite maison, supplément cheddar & œuf.',
    image: '/src/assets/images/roule_royal_photo_1784775744532.jpg'
  },
  {
    id: 'b-roule-maxi-royal',
    name: 'Roulé Maxi Royal',
    basePrice: 13.0,
    meatsCount: 2,
    category: 'roules',
    description: 'Pâte à pizza, 2 viandes au choix, sauce, crudités, frites, sauce gruyère faite maison, supplément cheddar & œuf.',
    image: '/src/assets/images/roule_maxi_photo_1784775755095.jpg'
  },
  {
    id: 'b-assiette-une-viande',
    name: 'Assiette Une Viande',
    basePrice: 11.0,
    meatsCount: 1,
    category: 'assiettes',
    description: 'Une viande au choix, crudités, sauce salade, frites, sauce, pain.',
    image: '/src/assets/images/assiette_une_viande_1784776235382.jpg'
  },
  {
    id: 'b-assiette-double-viande',
    name: 'Assiette Double Viande',
    basePrice: 14.0,
    meatsCount: 2,
    category: 'assiettes',
    description: 'Deux viandes au choix, crudités, sauce salade, frites, sauce, pain.',
    image: '/src/assets/images/assiette_double_viande_1784776249609.jpg'
  },
  {
    id: 'b-burger-cheese',
    name: 'Le Cheese',
    basePrice: 3.5,
    meatsCount: 1,
    category: 'burgers',
    description: 'Steak, cheddar.',
    image: '/src/assets/images/burger_cheese_photo_1784812984852.jpg'
  },
  {
    id: 'b-burger-double-cheese',
    name: 'Le Double Cheese',
    basePrice: 5.5,
    meatsCount: 2,
    category: 'burgers',
    description: 'Double viande, cheddar.',
    image: '/src/assets/images/burger_double_cheese_photo_1784812997191.jpg'
  },
  {
    id: 'b-burger-algerien',
    name: "L'Algérien",
    basePrice: 7.5,
    meatsCount: 1,
    category: 'burgers',
    description: 'Pain suédois, steak géant.',
    image: '/src/assets/images/burger_algerien_photo_1784813008885.jpg'
  },
  {
    id: 'b-burger-big-bang',
    name: 'Le Big Bang',
    basePrice: 7.5,
    meatsCount: 1,
    category: 'burgers',
    description: 'Spécial maxi pain, steak géant + cheddar.',
    image: '/src/assets/images/burger_big_bang_photo_1784813020343.jpg'
  }
];

export const CustomBuilder: React.FC<CustomBuilderProps> = ({ onAddToCart }) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>(BUILDER_FORMATS[0]);
  const [selectedMeats, setSelectedMeats] = useState<string[]>(['Escalope de poulet']);
  const [selectedSauces, setSelectedSauces] = useState<string[]>(['Sauce Gruyère Fait Maison', 'Algérienne']);
  const [selectedGratinage, setSelectedGratinage] = useState<string | undefined>(undefined);
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraEgg, setExtraEgg] = useState(false);
  const [extraMeat, setExtraMeat] = useState(false);
  const [isMenuOption, setIsMenuOption] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Price Calculation
  let unitPrice = selectedFormat.basePrice;
  if (isMenuOption) unitPrice += 4.0;
  if (selectedGratinage) unitPrice += 3.0;
  if (extraCheese) unitPrice += 1.5;
  if (extraEgg) unitPrice += 1.0;
  if (extraMeat) unitPrice += 3.0;

  const calculatedPrice = unitPrice * quantity;

  const handleMeatSelect = (meat: string) => {
    const limit = selectedFormat.meatsCount;
    if (selectedMeats.includes(meat)) {
      if (selectedMeats.length > 1) {
        setSelectedMeats(selectedMeats.filter(m => m !== meat));
      }
    } else {
      if (selectedMeats.length < limit) {
        setSelectedMeats([...selectedMeats, meat]);
      } else {
        setSelectedMeats([...selectedMeats.slice(1), meat]);
      }
    }
  };

  const handleSauceSelect = (sauce: string) => {
    if (selectedSauces.includes(sauce)) {
      if (selectedSauces.length > 1) {
        setSelectedSauces(selectedSauces.filter(s => s !== sauce));
      }
    } else {
      if (selectedSauces.length < 3) {
        setSelectedSauces([...selectedSauces, sauce]);
      }
    }
  };

  const handleAddCustomToCart = () => {
    const customItem: MenuItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedFormat.name}`,
      category: selectedFormat.category,
      description: `Format ${selectedFormat.name} • Viande(s): ${selectedMeats.join(', ')} • Sauce(s): ${selectedSauces.join(', ')}${selectedGratinage ? ` • Gratiné ${selectedGratinage}` : ''}`,
      priceSeul: unitPrice,
      image: selectedFormat.image,
      tags: ['Sur-Mesure', 'Le Passager Studio']
    };

    const option: SelectedItemOption = {
      type: isMenuOption ? 'menu' : 'seul',
      selectedMeats,
      selectedSauces,
      gratinageOption: selectedGratinage,
      extraCheese,
      extraEgg,
      extraMeat
    };

    onAddToCart(customItem, option, unitPrice, quantity);
  };

  return (
    <div className="py-12 bg-stone-950 text-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Studio de Configuration En Ligne</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Composez votre <span className="text-amber-500">Tacos ou Roulé</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Personnalisez votre recette en quelques clics : choisissez votre format, vos viandes marinées, vos sauces favorites et ajoutez un gratinage gourmand au four !
          </p>
        </div>

        {/* Studio Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configurator Steps (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Format */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-black">1</span>
                  <span>Choisissez le Format</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUILDER_FORMATS.map((fmt) => {
                  const isSelected = selectedFormat.id === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      onClick={() => {
                        setSelectedFormat(fmt);
                        if (selectedMeats.length > fmt.meatsCount) {
                          setSelectedMeats(selectedMeats.slice(0, fmt.meatsCount));
                        }
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                          : 'bg-stone-800/40 border-stone-700/60 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-extrabold text-sm">{fmt.name}</span>
                        <span className="text-sm font-black text-amber-400">{fmt.basePrice.toFixed(2)}€</span>
                      </div>
                      <p className="text-xs text-stone-400 line-clamp-2">{fmt.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Viandes */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-black">2</span>
                  <span>Sélection des Viandes ({selectedMeats.length}/{selectedFormat.meatsCount})</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AVAILABLE_MEATS.map((meat) => {
                  const isSelected = selectedMeats.includes(meat);
                  return (
                    <button
                      key={meat}
                      onClick={() => handleMeatSelect(meat)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-black shadow-md'
                          : 'bg-stone-800/50 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <span>{meat}</span>
                      {isSelected && <Check className="w-4 h-4 text-stone-950 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Sauces */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-black">3</span>
                <span>Choix des Sauces (1 à 3 max)</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SAUCES.map((sauce) => {
                  const isSelected = selectedSauces.includes(sauce);
                  return (
                    <button
                      key={sauce}
                      onClick={() => handleSauceSelect(sauce)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-stone-800/40 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <span>{sauce}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Gratinage Option */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-black">4</span>
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Gratinage au Four (+3.00€)</span>
                </h3>
                {selectedGratinage && (
                  <button
                    onClick={() => setSelectedGratinage(undefined)}
                    className="text-xs text-stone-400 hover:text-white underline"
                  >
                    Aucun Gratinage
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GRATINAGE_OPTIONS.map((grat) => {
                  const isSelected = selectedGratinage === grat.name;
                  return (
                    <button
                      key={grat.name}
                      onClick={() => setSelectedGratinage(isSelected ? undefined : grat.name)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-stone-800/50 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-extrabold">{grat.name}</span>
                        <span className="text-xs text-amber-400 font-black">+3.00€</span>
                      </div>
                      <p className="text-[11px] text-stone-400">{grat.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Formule Menu & Extras */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-black">5</span>
                <span>Extras & Formule Menu</span>
              </h3>

              <div className="space-y-3">
                {/* Menu Checkbox */}
                <button
                  onClick={() => setIsMenuOption(!isMenuOption)}
                  className={`w-full p-4 rounded-2xl border flex items-center justify-between text-left transition-all ${
                    isMenuOption
                      ? 'bg-orange-600/20 border-orange-500 text-white font-bold'
                      : 'bg-stone-800/40 border-stone-700 text-stone-300'
                  }`}
                >
                  <div>
                    <span className="text-sm font-extrabold block">Passer en Menu Complet (+4.00€)</span>
                    <span className="text-xs text-stone-400">Inclus 1 portion de frites + 1 boisson fraîche au choix</span>
                  </div>
                  <span className="text-sm font-black text-amber-400">+4.00€</span>
                </button>

                {/* Extras */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  <button
                    onClick={() => setExtraCheese(!extraCheese)}
                    className={`p-3 rounded-xl border text-xs font-bold flex justify-between items-center ${
                      extraCheese ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-stone-800/50 border-stone-700 text-stone-300'
                    }`}
                  >
                    <span>+ Cheddar Fondu</span>
                    <span>+1.50€</span>
                  </button>

                  <button
                    onClick={() => setExtraEgg(!extraEgg)}
                    className={`p-3 rounded-xl border text-xs font-bold flex justify-between items-center ${
                      extraEgg ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-stone-800/50 border-stone-700 text-stone-300'
                    }`}
                  >
                    <span>+ Œuf au Plat</span>
                    <span>+1.00€</span>
                  </button>

                  <button
                    onClick={() => setExtraMeat(!extraMeat)}
                    className={`p-3 rounded-xl border text-xs font-bold flex justify-between items-center ${
                      extraMeat ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-stone-800/50 border-stone-700 text-stone-300'
                    }`}
                  >
                    <span>+ Extra Viande</span>
                    <span>+3.00€</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Real-time Order Summary Card (Right 5 Cols Sticky) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div>
                  <span className="text-xs text-amber-500 font-extrabold uppercase tracking-widest">Aperçu Récapitulatif</span>
                  <h3 className="text-xl font-black text-white">Votre Création Le Passager</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-black text-sm">
                  {calculatedPrice.toFixed(2)}€
                </span>
              </div>

              {/* Visual Card Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-stone-950">
                <img
                  src={selectedFormat.image}
                  alt={selectedFormat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs font-bold">
                  <span className="bg-amber-500 text-stone-950 px-2.5 py-1 rounded-lg">
                    {selectedFormat.name}
                  </span>
                  {selectedGratinage && (
                    <span className="bg-orange-600 text-white px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>{selectedGratinage}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Composition Breakdown List */}
              <div className="space-y-3 text-xs text-stone-300 font-medium bg-stone-950/60 rounded-2xl p-4 border border-stone-800">
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Format de base :</span>
                  <span className="font-bold text-white">{selectedFormat.name} ({selectedFormat.basePrice.toFixed(2)}€)</span>
                </div>

                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Viande(s) :</span>
                  <span className="font-bold text-amber-400">{selectedMeats.join(', ') || 'Aucune'}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Sauce(s) :</span>
                  <span className="font-bold text-stone-200">{selectedSauces.join(', ') || 'Aucune'}</span>
                </div>

                {selectedGratinage && (
                  <div className="flex justify-between py-1 border-b border-stone-800/60">
                    <span className="text-stone-400">Gratinage au Four :</span>
                    <span className="font-bold text-orange-400">{selectedGratinage} (+3.00€)</span>
                  </div>
                )}

                {isMenuOption && (
                  <div className="flex justify-between py-1 border-b border-stone-800/60">
                    <span className="text-stone-400">Option Menu :</span>
                    <span className="font-bold text-emerald-400">Frites + Boisson (+4.00€)</span>
                  </div>
                )}

                {(extraCheese || extraEgg || extraMeat) && (
                  <div className="flex justify-between py-1">
                    <span className="text-stone-400">Suppléments :</span>
                    <span className="font-bold text-amber-400">
                      {[
                        extraCheese && 'Cheddar',
                        extraEgg && 'Œuf',
                        extraMeat && 'Extra Viande'
                      ].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between gap-3 bg-stone-950 p-3 rounded-2xl border border-stone-800">
                <span className="text-xs font-black uppercase text-amber-400">Quantité :</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-black text-white w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddCustomToCart}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 transition-all active:scale-98"
              >
                <ShoppingBag className="w-5 h-5 text-stone-950" />
                <span>Ajouter à la Commande ({quantity}x) • {calculatedPrice.toFixed(2)}€</span>
              </button>

              <p className="text-[11px] text-center text-stone-500">
                ✓ Préparé minute avec amour au 70 Rue Léon Blum, Villeurbanne
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
