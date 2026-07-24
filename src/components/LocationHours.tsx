import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Copy, Check, CreditCard, ShoppingBag, Accessibility, Flame, Bus } from 'lucide-react';
import { RESTAURANT_INFO, OPENING_HOURS } from '../data/restaurantData';
import { getRestaurantOpenStatus } from '../utils/timeUtils';
import { makePhoneCall } from '../utils/phoneUtils';

export const LocationHours: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const openStatus = getRestaurantOpenStatus();
  const currentDayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-16 bg-stone-950 text-stone-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-black uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Emplacement & Horaires • Villeurbanne</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Où nous <span className="text-amber-500">Trouver & Horaires</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Situé au <strong className="text-stone-200">70 Rue Léon Blum à Villeurbanne</strong>, à deux pas du parc Vaillant-Couturier et de la station de métro Cusset.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Contact, Hours, Transport (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address & Quick Actions Card */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Adresse du Snack</span>
                    <h3 className="text-xl font-black text-white">{RESTAURANT_INFO.fullAddress}</h3>
                    <p className="text-xs text-stone-400 mt-1">Métro A Cusset • Parc Vaillant-Couturier</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-stone-400" />}
                  <span>{copied ? 'Copié !' : 'Copier'}</span>
                </button>
              </div>

              {/* GPS Links */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Ouvrir Google Maps</span>
                </a>

                <a
                  href={RESTAURANT_INFO.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-400 border border-amber-500/30 font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Navigation className="w-4 h-4 text-amber-500" />
                  <span>Itinéraire Waze</span>
                </a>
              </div>

              {/* Phone Numbers */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">Commandes par Téléphone</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={`tel:${RESTAURANT_INFO.phonePrimary.replace(/\s/g, '')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      makePhoneCall(RESTAURANT_INFO.phonePrimary);
                    }}
                    className="p-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 border border-amber-500/20 font-black text-sm flex items-center justify-center gap-2 cursor-pointer"
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
                    className="p-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 border border-amber-500/20 font-black text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-amber-500" />
                    <span>{RESTAURANT_INFO.phoneSecondary}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Transport Info Card */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Bus className="w-4 h-4 text-amber-500" />
                <span>Accès & Transports en Commun</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                  <span className="font-extrabold text-white block">Station Métro Cusset</span>
                  <span className="text-stone-400">Ligne Métro A (à 2 min à pied)</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                  <span className="font-extrabold text-white block">Arrêt Bus Vaillant Couturier</span>
                  <span className="text-stone-400">Lignes C3 & C11</span>
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">CB Acceptée</span>
                  <span className="text-[11px] text-stone-400">Paiement sans contact</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Sur Place / Emporter</span>
                  <span className="text-[11px] text-stone-400">Service rapide</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Opening Hours Schedule (6 Cols) */}
          <div className="lg:col-span-6 bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Horaires d'Ouverture</h3>
                  <p className="text-xs text-stone-400">Ouvert 7j/7 avec service continu</p>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                openStatus.isOpen ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {openStatus.isOpen ? 'Ouvert' : 'Fermé'}
              </div>
            </div>

            {/* Hours Table */}
            <div className="space-y-2">
              {OPENING_HOURS.map((schedule) => {
                const isToday = schedule.dayIndex === currentDayIndex;
                return (
                  <div
                    key={schedule.dayName}
                    className={`p-3.5 rounded-2xl flex items-center justify-between text-xs transition-all ${
                      isToday
                        ? 'bg-amber-500/15 border border-amber-500/40 text-white font-extrabold shadow-sm'
                        : 'bg-stone-950/60 text-stone-300 border border-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>{schedule.dayName}</span>
                      {isToday && (
                        <span className="ml-2 px-2 py-0.5 text-[9px] font-black uppercase bg-amber-500 text-stone-950 rounded">
                          Aujourd'hui
                        </span>
                      )}
                    </div>

                    <span className="font-mono font-extrabold text-amber-400">
                      {schedule.openTime} - {schedule.closeTime}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-stone-500 text-center italic pt-2">
              * Arrêt de la prise des commandes à 22h30.
            </p>

            {/* Embedded Interactive Map */}
            <div className="pt-2">
              <div className="relative rounded-2xl overflow-hidden border border-stone-800 aspect-video w-full">
                <iframe
                  title="Le Passager Map Location 70 Rue Léon Blum Villeurbanne"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.3364239857973!2d4.895521!3d45.76562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c02f3ddb10db%3A0x8673f443e01d670!2s70%20Rue%20L%C3%A9on%20Blum%2C%2069100%20Villeurbanne!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
