import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Phone, ShoppingBag, Send, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { makePhoneCall } from '../utils/phoneUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  cartTotal: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  cartTotal
}) => {
  const [orderType, setOrderType] = useState<'emporter' | 'surplace'>('emporter');
  const [customerName, setCustomerName] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  // Format order summary string for SMS / Phone Call
  const generateOrderSummary = () => {
    let summary = `Commande Le Passager (${orderType === 'emporter' ? 'À Emporter' : 'Sur Place'})\n`;
    if (customerName) summary += `Client: ${customerName}\n`;
    summary += `------------------------\n`;

    cartItems.forEach((c) => {
      summary += `${c.quantity}x ${c.item.name}`;
      if (c.option.selectedPizzaSize) {
        summary += ` [${c.option.selectedPizzaSize.name} - ${c.option.selectedPizzaSize.size}]`;
      } else {
        summary += ` (${c.option.type.toUpperCase()})`;
      }
      summary += `\n`;
      if (c.option.selectedMeats.length > 0) summary += `   - Viande(s): ${c.option.selectedMeats.join(', ')}\n`;
      if (c.option.selectedSauces.length > 0) summary += `   - Sauce(s): ${c.option.selectedSauces.join(', ')}\n`;
      if (c.option.gratinageOption) summary += `   - Gratiné: ${c.option.gratinageOption}\n`;
      if (c.option.extraCheese) summary += `   - + Cheddar\n`;
      if (c.option.extraEgg) summary += `   - + Œuf\n`;
      summary += `   Prix: ${(c.unitPrice * c.quantity).toFixed(2)}€\n\n`;
    });

    if (orderNote) summary += `Note: ${orderNote}\n`;
    summary += `------------------------\nTOTAL: ${cartTotal.toFixed(2)}€`;
    return summary;
  };

  const handleCallOrder = () => {
    setOrderSent(true);
    makePhoneCall(RESTAURANT_INFO.phonePrimary);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-stone-900 border-l border-amber-500/30 w-full max-w-md h-full flex flex-col justify-between text-stone-100 shadow-2xl relative">
        
        {/* Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Votre Panier</h3>
              <p className="text-xs text-stone-400">{cartItems.length} article(s)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Order Mode Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-stone-950 border border-stone-800">
            <button
              onClick={() => setOrderType('emporter')}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                orderType === 'emporter' ? 'bg-amber-500 text-stone-950 shadow-md font-black' : 'text-stone-400 hover:text-white'
              }`}
            >
              À Emporter
            </button>
            <button
              onClick={() => setOrderType('surplace')}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                orderType === 'surplace' ? 'bg-amber-500 text-stone-950 shadow-md font-black' : 'text-stone-400 hover:text-white'
              }`}
            >
              Sur Place
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
              <p className="text-sm font-bold text-stone-300">Votre panier est vide</p>
              <p className="text-xs text-stone-500">Ajoutez des tacos, burgers ou assiettes depuis le menu pour commander.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.cartId}
                  className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                        {cartItem.option.type}
                      </span>
                      <h4 className="font-extrabold text-sm text-white mt-1">{cartItem.item.name}</h4>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.cartId)}
                      className="text-stone-500 hover:text-rose-400 p-1"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options details */}
                  <div className="text-[11px] text-stone-400 space-y-0.5 pl-2 border-l-2 border-amber-500/40">
                    {cartItem.option.selectedPizzaSize && (
                      <p>Taille: <strong className="text-amber-400 font-bold">{cartItem.option.selectedPizzaSize.name} ({cartItem.option.selectedPizzaSize.size})</strong></p>
                    )}
                    {cartItem.option.selectedMeats.length > 0 && (
                      <p>Viandes: <strong className="text-stone-200">{cartItem.option.selectedMeats.join(', ')}</strong></p>
                    )}
                    {cartItem.option.selectedSauces.length > 0 && (
                      <p>Sauces: <strong className="text-stone-200">{cartItem.option.selectedSauces.join(', ')}</strong></p>
                    )}
                    {cartItem.option.gratinageOption && (
                      <p className="text-orange-400 font-bold">Gratiné: {cartItem.option.gratinageOption}</p>
                    )}
                    {cartItem.option.extraCheese && <p className="text-amber-400">+ Cheddar</p>}
                    {cartItem.option.extraEgg && <p className="text-amber-400">+ Œuf</p>}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                        className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-white w-5 text-center">{cartItem.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                        className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-extrabold text-sm text-amber-400">
                      {(cartItem.unitPrice * cartItem.quantity).toFixed(2)}€
                    </span>
                  </div>

                </div>
              ))}

              {/* Customer Name & Notes */}
              <div className="space-y-2 pt-2">
                <input
                  type="text"
                  placeholder="Votre nom (pour la commande)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Note / Heure de retrait souhaitée..."
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>
          )}

        </div>

        {/* Footer & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-stone-950 border-t border-stone-800 space-y-4">
            <div className="space-y-1.5 text-xs text-stone-300">
              <div className="flex justify-between font-extrabold text-base text-white">
                <span>Total à régler</span>
                <span className="text-amber-400">{cartTotal.toFixed(2)}€</span>
              </div>
            </div>

            <button
              onClick={handleCallOrder}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-5 h-5 text-stone-950" />
              <span>Commander par Téléphone ({RESTAURANT_INFO.phonePrimary})</span>
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-center text-xs text-stone-500 hover:text-stone-300"
            >
              Vider le panier
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
