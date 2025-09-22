import { create } from "zustand";
// TYPE'S
import { CartItemTy } from "@/types";

interface ShoppingCartTy {
  addItems: CartItemTy[];
  addCart: (addItem: CartItemTy) => void;
  deleteCartItem: (id: string, color: string) => void;
  updateQuantity: (id: string, qty: number) => void;
}

const useShoppingCart = create<ShoppingCartTy>((set) => ({
  addItems: [],
  addCart: (addItem: CartItemTy) =>
    set((state) => ({
      addItems: [...state.addItems, addItem],
    })),

  deleteCartItem: (id: string, color: string) =>
    set((state) => ({
      addItems: state.addItems.filter(
        (item) => item.id !== id || item.color != color
      ),
    })),

  updateQuantity: (id: string, qty: number) =>
    set((state) => ({
      addItems: state.addItems.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      ),
    })),

  // reset: () => set({ count: 0 }), // Action to reset
}));

export default useShoppingCart;
