import React from 'react';
import { MapPin, Phone, Clock, Heart, ShieldCheck, CreditCard } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { makePhoneCall } from '../utils/phoneUtils';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs border-t border-amber-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5">
                <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                  <span className="text-sm font-black text-amber-500">LP</span>
                </div>
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider">
                LE <span className="text-amber-500">PASSAGER</span>
              </h3>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Fast-food gourmet à Villeurbanne. Tacos gratinés, Roulés maison, Burgers, Assiettes et Pizzas cuits sur place.
            </p>
            <div className="flex items-center gap-2 text-stone-300 font-medium">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Cartes bancaires & Sans contact acceptés</span>
            </div>
          </div>

          {/* Location Col */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Adresse & Accès</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.fullAddress}</span>
              </div>
              <p className="text-stone-500 pl-6">
                Métro Line A • Station Cusset<br />
                Near Parc Vaillant-Couturier
              </p>
            </div>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Commandes Directes</h4>
            <div className="space-y-2">
              <a
                href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s/g, '')}`}
                onClick={(e) => {
                  e.preventDefault();
                  makePhoneCall(RESTAURANT_INFO.phonePrimary);
                }}
                className="flex items-center gap-2 hover:text-amber-400 font-bold cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{RESTAURANT_INFO.phonePrimary}</span>
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.phoneSecondary.replace(/\s/g, '')}`}
                onClick={(e) => {
                  e.preventDefault();
                  makePhoneCall(RESTAURANT_INFO.phoneSecondary);
                }}
                className="flex items-center gap-2 hover:text-amber-400 font-bold cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{RESTAURANT_INFO.phoneSecondary}</span>
              </a>
            </div>
          </div>

          {/* Hours Col */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Horaires d'Ouverture</h4>
            <div className="space-y-1 text-stone-400">
              <p>Lundi - Jeudi : 11:30 - 22:30</p>
              <p className="text-amber-400 font-semibold">Vendredi : 14:00 - 22:30</p>
              <p>Samedi - Dimanche : 11:30 - 22:30</p>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} Le Passager Fast-Food Villeurbanne. Tous droits réservés.</p>
          <div className="flex items-center gap-1">
            <span>Fait avec passion pour la gastronomie fast-food</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
};
