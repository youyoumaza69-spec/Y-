import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle, Sparkles, X } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: "À l'instant",
      comment: newComment,
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setModalOpen(false);
    setNewAuthor('');
    setNewComment('');
  };

  return (
    <section id="reviews" className="py-16 bg-stone-900 text-stone-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-black text-amber-500 uppercase tracking-widest">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span>Note Globale 4.8 / 5.0 sur Google</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Avis & Témoignages <span className="text-amber-500">Gourmands</span>
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4 text-stone-950" />
            <span>Déposer un Avis</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-950 border border-stone-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-current text-amber-400' : 'text-stone-700'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500">{rev.date}</span>
                </div>

                <p className="text-xs text-stone-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <span className="font-bold text-white">{rev.author}</span>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3" />
                    <span>Client Vérifié</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal to Submit Review */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-stone-900 border border-amber-500/30 rounded-3xl w-full max-w-md p-6 text-stone-100 shadow-2xl relative space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="text-lg font-black text-white">Donnez votre avis sur Le Passager</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-full bg-stone-800 text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-400 block mb-1">Votre Prénom / Nom</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Thomas M."
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-400 block mb-1">Votre Note</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`p-2 rounded-xl border text-amber-400 ${
                          newRating >= star ? 'bg-amber-500/20 border-amber-500' : 'bg-stone-950 border-stone-800 text-stone-600'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${newRating >= star ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-400 block mb-1">Votre Commentaire</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Qu'avez-vous pensé de votre tacos, roulé ou burger ?"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-sm shadow-lg transition-all"
                >
                  Publier l'Avis
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
