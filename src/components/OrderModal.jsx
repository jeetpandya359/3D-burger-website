import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle, Flame, Truck, CreditCard } from 'lucide-react';
import { MENU_ITEMS } from './LuxuryMenu';

export default function OrderModal({ isOpen, onClose, initialSelectedItem }) {
  const [cart, setCart] = useState(() => {
    if (initialSelectedItem) {
      return [{ ...initialSelectedItem, quantity: 1, spiceLevel: 'Medium' }];
    }
    return [
      { ...MENU_ITEMS[0], quantity: 1, spiceLevel: 'Medium' },
      { ...MENU_ITEMS[1], quantity: 1, spiceLevel: 'Mild' }
    ];
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const addItemToCart = (menuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...menuItem, quantity: 1, spiceLevel: 'Medium' }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);
  const thermalDeliveryFee = 5.00;
  const total = subtotal + (cart.length > 0 ? thermalDeliveryFee : 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setOrderPlaced(true);
  };

  const resetAndClose = () => {
    setOrderPlaced(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-lg h-full bg-darkBg border-l border-white/10 p-6 md:p-8 flex flex-col justify-between overflow-y-auto relative shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-goldAccent/20 border border-goldAccent/40 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-goldAccent" />
              </div>
              <div>
                <h3 className="syne-font text-xl font-extrabold text-white">YOUR LUXURY VAULT</h3>
                <span className="text-[10px] font-mono uppercase text-subText tracking-widest">
                  Thermal Precision Delivery
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-subText hover:text-white hover:bg-goldAccent hover:text-darkBg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          {orderPlaced ? (
            <div className="my-auto text-center py-12 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-glow mb-6 animate-bounce">
                <CheckCircle className="w-10 h-10 text-darkBg" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-goldAccent font-bold">
                Order Confirmed #BM-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <h4 className="syne-font text-3xl font-extrabold text-white mt-2 mb-4">
                PREPARING YOUR MANIA
              </h4>
              <p className="text-xs text-subText leading-relaxed max-w-sm font-light mb-8">
                Your Wagyu patties are currently flame-seared on black ceramic. Our courier has activated the 140°F thermal pod. Estimated delivery: <strong className="text-goldAccent">18 Mins</strong>.
              </p>

              <button
                onClick={resetAndClose}
                className="w-full py-4 rounded-xl bg-gold-gradient text-darkBg font-bold text-sm uppercase tracking-wider shadow-gold-glow cursor-pointer"
              >
                Track Live Delivery Status
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="my-6 space-y-4 flex-1 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-subText font-mono text-xs">
                    Your luxury vault is empty. Select a burger from the menu to proceed.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-4 relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10"
                      />

                      <div className="flex-1">
                        <h4 className="syne-font text-sm font-bold text-white">{item.title}</h4>
                        <span className="text-xs font-mono font-bold text-goldAccent">
                          ${(item.numericPrice * item.quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs hover:bg-white/20"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-white px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs hover:bg-white/20"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-subText hover:text-red-400 p-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}

                {/* Add Quick Add Suggestions */}
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[11px] font-mono text-subText uppercase tracking-wider block mb-3">
                    Add Chef Extras:
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {MENU_ITEMS.slice(2, 5).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => addItemToCart(m)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-semibold text-white hover:border-goldAccent flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Plus className="w-3 h-3 text-goldAccent" />
                        <span>{m.title} ({m.price})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Checkout Form & Total Calculation */}
              <div className="pt-6 border-t border-white/10">
                <form onSubmit={handleCheckout} className="space-y-3 mb-6">
                  <input
                    type="text"
                    required
                    placeholder="Full Name / VIP Title"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-subText focus:outline-none focus:border-goldAccent"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Delivery Address (Penthouse / Suite / Residence)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-subText focus:outline-none focus:border-goldAccent"
                  />
                </form>

                <div className="space-y-2 font-mono text-xs text-subText mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thermal Vault Express Shipping</span>
                    <span className="text-goldAccent font-bold">${thermalDeliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white pt-2 border-t border-white/10 font-bold">
                    <span>Total Amount</span>
                    <span className="text-goldAccent font-extrabold font-mono">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-4 rounded-xl bg-gold-gradient text-darkBg font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:scale-[1.02] active:scale-98 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Authorize Express Order (${total.toFixed(2)})</span>
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
