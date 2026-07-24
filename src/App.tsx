import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CustomBuilder } from './components/CustomBuilder';
import { PromosFormules } from './components/PromosFormules';
import { LocationHours } from './components/LocationHours';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { CallModal } from './components/CallModal';
import { CartItem, MenuItem, SelectedItemOption } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('menu');
  const [selectedMenuItem, setSelectedMenuItem] = useState<{ item: MenuItem; qty: number } | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [callModalOpen, setCallModalOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (
    item: MenuItem,
    option: SelectedItemOption,
    unitPrice: number,
    quantity: number
  ) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(c => 
        c.item.id === item.id &&
        c.option.type === option.type &&
        c.option.selectedPizzaSize?.id === option.selectedPizzaSize?.id &&
        JSON.stringify(c.option.selectedMeats) === JSON.stringify(option.selectedMeats) &&
        JSON.stringify(c.option.selectedSauces) === JSON.stringify(option.selectedSauces) &&
        c.option.gratinageOption === option.gratinageOption &&
        c.option.extraCheese === option.extraCheese &&
        c.option.extraEgg === option.extraEgg &&
        c.option.extraMeat === option.extraMeat &&
        c.option.specialInstructions === option.specialInstructions
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        const cartId = `${item.id}-${Date.now()}`;
        return [...prev, { cartId, item, option, quantity, unitPrice }];
      }
    });

    // Show toast
    setToastMessage(`Ajouté au panier (${quantity}x ${item.name})`);
    setTimeout(() => setToastMessage(null), 3000);

    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(cartId);
      return;
    }
    setCartItems(prev =>
      prev.map(c => (c.cartId === cartId ? { ...c, quantity } : c))
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems(prev => prev.filter(c => c.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);
  const cartItemCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* Sticky Header */}
      <Header
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartDrawerOpen(true)}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onCallClick={() => setCallModalOpen(true)}
      />

      {/* Main View switching or stacked layout depending on active tab */}
      <main className="flex-1">
        {activeTab === 'menu' && (
          <>
            <Hero
              onExploreMenu={() => {
                const el = document.getElementById('menu');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenBuilder={() => handleTabChange('builder')}
              onCallClick={() => setCallModalOpen(true)}
            />
            <MenuSection onSelectItem={(item, qty) => setSelectedMenuItem({ item, qty: qty || 1 })} />
            <PromosFormules onSelectItem={(item, qty) => setSelectedMenuItem({ item, qty: qty || 1 })} />
            <LocationHours />
            <ReviewsSection />
          </>
        )}

        {activeTab === 'builder' && (
          <CustomBuilder onAddToCart={handleAddToCart} />
        )}

        {activeTab === 'promos' && (
          <PromosFormules onSelectItem={(item, qty) => setSelectedMenuItem({ item, qty: qty || 1 })} />
        )}

        {activeTab === 'location' && (
          <LocationHours />
        )}

        {activeTab === 'reviews' && (
          <ReviewsSection />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-300 font-extrabold text-sm flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-5 h-5 text-stone-950 fill-current" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      {selectedMenuItem && (
        <ItemModal
          item={selectedMenuItem.item}
          initialQuantity={selectedMenuItem.qty}
          onClose={() => setSelectedMenuItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        cartTotal={cartTotal}
      />

      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
      />
    </div>
  );
}

export default App;
