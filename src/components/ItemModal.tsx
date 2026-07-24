import React, { useState } from 'react';
import { X, Check, Plus, Minus, Flame, Sparkles } from 'lucide-react';
import { MenuItem, SelectedItemOption, PizzaSizeOption } from '../types';
import { AVAILABLE_MEATS, AVAILABLE_SAUCES, GRATINAGE_OPTIONS } from '../data/restaurantData';

interface ItemModalProps {
  item: MenuItem;
  initialQuantity?: number;
  onClose: () => void;
  onAddToCart: (item: MenuItem, option: SelectedItemOption, unitPrice: number, quantity: number) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, initialQuantity = 1, onClose, onAddToCart }) => {
  const [optionType, setOptionType] = useState<'seul' | 'menu'>(
    item.priceMenu ? 'seul' : 'seul'
  );
  
  const [selectedPizzaSize, setSelectedPizzaSize] = useState<PizzaSizeOption | undefined>(
    item.options?.pizzaSizes ? item.options.pizzaSizes[0] : undefined
  );

  const meatsNeeded = item.options?.meatsCount || 0;
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>(
    ['Sauce Gruyère Fait Maison']
  );
  const [selectedGratinage, setSelectedGratinage] = useState<string | undefined>(undefined);
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraEgg, setExtraEgg] = useState(false);
  const [extraMeat, setExtraMeat] = useState(false);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate price
  let basePrice = item.priceSeul;
  if (selectedPizzaSize) {
    basePrice = selectedPizzaSize.price;
  } else if (optionType === 'menu' && item.priceMenu) {
    basePrice = item.priceMenu;
  }

  if (selectedGratinage) basePrice += 3.0;
  if (extraCheese) basePrice += 1.5;
  if (extraEgg) basePrice += 1.0;
  if (extraMeat) basePrice += 3.0;

  const totalPrice = basePrice * quantity;

  const handleMeatToggle = (meat: string) => {
    if (meatsNeeded === 0) return;
    if (selectedMeats.includes(meat)) {
      setSelectedMeats(selectedMeats.filter(m => m !== meat));
    } else {
      if (selectedMeats.length < meatsNeeded) {
        setSelectedMeats([...selectedMeats, meat]);
      } else {
        // Replace last chosen meat
        setSelectedMeats([...selectedMeats.slice(1), meat]);
      }
    }
  };

  const handleSauceToggle = (sauce: string) => {
    if (selectedSauces.includes(sauce)) {
      setSelectedSauces(selectedSauces.filter(s => s !== sauce));
    } else {
      if (selectedSauces.length < 3) {
        setSelectedSauces([...selectedSauces, sauce]);
      }
    }
  };

  const handleAdd = () => {
    const selectedOption: SelectedItemOption = {
      type: optionType,
      selectedPizzaSize,
      selectedMeats,
      selectedSauces,
      gratinageOption: selectedGratinage,
      extraCheese,
      extraEgg,
      extraMeat,
      specialInstructions
    };

    onAddToCart(item, selectedOption, basePrice, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-stone-900 border border-amber-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-stone-100 shadow-2xl relative flex flex-col">
        
        {/* Modal Header */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const fallbackMap: Record<string, string> = {
                tacos: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
                burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
                roules: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
                assiettes: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
                texmex: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
                desserts: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
                boissons: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
              };
              e.currentTarget.src = fallbackMap[item.category] || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
            }}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/80 hover:bg-stone-950 text-stone-200 border border-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-1">
              {item.tags?.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-amber-500 text-stone-950">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{item.name}</h2>
            <p className="text-xs text-stone-300 line-clamp-2">{item.description}</p>
          </div>
        </div>

        {/* Modal Body / Options */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Pizza Size Selection */}
          {item.options?.pizzaSizes && (
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400">
                1. Choisissez la Taille de la Pizza
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {item.options.pizzaSizes.map((pz) => {
                  const isSelected = selectedPizzaSize?.id === pz.id;
                  return (
                    <button
                      key={pz.id}
                      type="button"
                      onClick={() => setSelectedPizzaSize(pz)}
                      className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500 text-amber-300 font-bold shadow-lg shadow-amber-500/10 scale-102'
                          : 'bg-stone-800/50 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <span className="text-xs font-extrabold text-white">{pz.name}</span>
                      <span className="text-[10px] text-stone-400 mt-0.5">{pz.size}</span>
                      <span className="text-sm font-black text-amber-400 mt-2">{pz.price.toFixed(2)}€</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Format Option (Seul vs Menu) */}
          {item.priceMenu && (
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400">
                1. Choisissez la Formule
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOptionType('seul')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    optionType === 'seul'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                      : 'bg-stone-800/50 border-stone-700 text-stone-300 hover:border-stone-600'
                  }`}
                >
                  <span className="text-sm font-extrabold">Seul</span>
                  <span className="text-lg font-black text-white mt-1">{item.priceSeul.toFixed(2)}€</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOptionType('menu')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    optionType === 'menu'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                      : 'bg-stone-800/50 border-stone-700 text-stone-300 hover:border-stone-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-extrabold">Menu Complet</span>
                    <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded font-black">
                      +Frites & Boisson
                    </span>
                  </div>
                  <span className="text-lg font-black text-white mt-1">{item.priceMenu.toFixed(2)}€</span>
                </button>
              </div>
            </div>
          )}

          {/* Choose Meats if applicable */}
          {meatsNeeded > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-amber-400">
                  {meatsNeeded === 1 ? 'Choix de la Viande (1 au choix)' : `Choix des Viandes (${selectedMeats.length}/${meatsNeeded})`}
                </label>
                {selectedMeats.length < meatsNeeded && (
                  <span className="text-xs text-orange-400 font-semibold animate-pulse">
                    Sélectionnez {meatsNeeded - selectedMeats.length} viande(s)
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AVAILABLE_MEATS.map((meat) => {
                  const isSelected = selectedMeats.includes(meat);
                  return (
                    <button
                      key={meat}
                      type="button"
                      onClick={() => handleMeatToggle(meat)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-black'
                          : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <span>{meat}</span>
                      {isSelected && <Check className="w-4 h-4 text-stone-950 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Choose Sauces */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-amber-400">
              Choix des Sauces (max 3)
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SAUCES.map((sauce) => {
                const isSelected = selectedSauces.includes(sauce);
                return (
                  <button
                    key={sauce}
                    type="button"
                    onClick={() => handleSauceToggle(sauce)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
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

          {/* Gratinage Options */}
          {item.options?.allowGratinage && (
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Option Gratinage au Four (+3.00€)</span>
                </label>
                {selectedGratinage && (
                  <button
                    onClick={() => setSelectedGratinage(undefined)}
                    className="text-xs text-stone-400 hover:text-white underline"
                  >
                    Retirer
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {GRATINAGE_OPTIONS.map((grat) => {
                  const isSelected = selectedGratinage === grat.name;
                  return (
                    <button
                      key={grat.name}
                      type="button"
                      onClick={() => setSelectedGratinage(isSelected ? undefined : grat.name)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
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
          )}

          {/* Extra Supplements */}
          <div className="space-y-3 pt-2 border-t border-stone-800">
            <label className="text-xs font-black uppercase tracking-wider text-amber-400">
              Suppléments & Extras
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setExtraCheese(!extraCheese)}
                className={`p-3 rounded-xl border text-xs font-bold flex justify-between items-center ${
                  extraCheese ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-stone-800/50 border-stone-700 text-stone-300'
                }`}
              >
                <span>+ Cheddar Fondu</span>
                <span>+1.50€</span>
              </button>

              <button
                type="button"
                onClick={() => setExtraEgg(!extraEgg)}
                className={`p-3 rounded-xl border text-xs font-bold flex justify-between items-center ${
                  extraEgg ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-stone-800/50 border-stone-700 text-stone-300'
                }`}
              >
                <span>+ Œuf au Plat</span>
                <span>+1.00€</span>
              </button>

              <button
                type="button"
                onClick={() => setExtraMeat(!extraMeat)}
                className={`p-3 rounded-xl border text-xs font-bold flex justify-between items-center ${
                  extraMeat ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-stone-800/50 border-stone-700 text-stone-300'
                }`}
              >
                <span>+ Supplément Viande</span>
                <span>+3.00€</span>
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-400">
              Instructions spéciales ou allergies
            </label>
            <input
              type="text"
              placeholder="Ex: Sans oignon, sauce bien à part..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-col space-y-4 shrink-0">
          
          {/* Quick Quantity Presets */}
          <div className="flex items-center justify-between gap-2 bg-stone-900 p-2.5 rounded-2xl border border-stone-800">
            <span className="text-xs font-black uppercase text-amber-400 pl-2">Quantité :</span>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {[1, 2, 3, 4, 5, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuantity(num)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    quantity === num
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 scale-105'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  x{num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 active:scale-95 transition-transform"
                title="Moins"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-black text-amber-400 w-10 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 active:scale-95 transition-transform"
                title="Plus"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAdd}
              disabled={meatsNeeded > 0 && selectedMeats.length < meatsNeeded}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:pointer-events-none text-stone-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-stone-950 fill-current" />
              <span>Ajouter au Panier ({quantity}x) • {totalPrice.toFixed(2)}€</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
