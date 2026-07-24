import React, { useState } from 'react';
import { X, Phone, Clock, MapPin, Sparkles, Copy, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getRestaurantOpenStatus } from '../utils/timeUtils';
import { makePhoneCall, copyToClipboard } from '../utils/phoneUtils';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  if (!isOpen) return null;
  const openStatus = getRestaurantOpenStatus();

  const handleCall = (num: string) => {
    makePhoneCall(num);
  };

  const handleCopy = async (e: React.MouseEvent, num: string) => {
    e.stopPropagation();
    const ok = await copyToClipboard(num);
    if (ok) {
      setCopiedNumber(num);
      setTimeout(() => setCopiedNumber(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-stone-900 border border-amber-500/30 rounded-3xl w-full max-w-md p-6 text-stone-100 shadow-2xl relative space-y-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Phone className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Commander par Téléphone</h3>
              <p className="text-xs text-stone-400">Le Passager Villeurbanne</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status */}
        <div className={`p-3 rounded-2xl flex items-center justify-between text-xs font-bold ${
          openStatus.isOpen ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
        }`}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{openStatus.isOpen ? 'Snack Ouvert - Prise de commande' : 'Snack Fermé actuellement'}</span>
          </div>
          <span className="uppercase text-[10px] bg-stone-950 px-2 py-0.5 rounded">
            {openStatus.isOpen ? 'Ouvert' : 'Fermé'}
          </span>
        </div>

        {/* Phone Options */}
        <div className="space-y-3">
          {/* Primary Phone Button */}
          <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-base flex items-center justify-between shadow-xl shadow-amber-500/20 transition-all cursor-pointer group"
               onClick={() => handleCall(RESTAURANT_INFO.phonePrimary)}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-stone-950/20 text-stone-950">
                <Phone className="w-6 h-6 fill-current animate-bounce" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider block opacity-80 font-bold">Ligne Principale</span>
                <span className="text-lg font-black tracking-tight">{RESTAURANT_INFO.phonePrimary}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleCopy(e, RESTAURANT_INFO.phonePrimary)}
                className="px-2.5 py-1.5 rounded-lg bg-stone-950/20 hover:bg-stone-950/40 text-stone-950 text-xs font-bold flex items-center gap-1"
                title="Copier le numéro"
              >
                {copiedNumber === RESTAURANT_INFO.phonePrimary ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Secondary Phone Button */}
          <div className="w-full p-4 rounded-2xl bg-stone-800 hover:bg-stone-750 text-amber-400 border border-amber-500/30 font-black text-base flex items-center justify-between transition-all cursor-pointer"
               onClick={() => handleCall(RESTAURANT_INFO.phoneSecondary)}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider block text-stone-400 font-bold">Ligne Secondaire</span>
                <span className="text-base font-extrabold">{RESTAURANT_INFO.phoneSecondary}</span>
              </div>
            </div>

            <button
              onClick={(e) => handleCopy(e, RESTAURANT_INFO.phoneSecondary)}
              className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-950 text-stone-300 text-xs font-bold flex items-center gap-1 border border-stone-700"
              title="Copier le numéro"
            >
              {copiedNumber === RESTAURANT_INFO.phoneSecondary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Direct Link */}
        <a
          href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s/g, '')}`}
          className="w-full py-3 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-400 border border-amber-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-colors text-center"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Appuyer ici si le clic direct ne se lance pas</span>
        </a>

        <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Retrait au 70 Rue Léon Blum, Villeurbanne (Métro Cusset)</span>
        </div>

      </div>
    </div>
  );
};
