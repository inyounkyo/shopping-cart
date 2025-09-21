import { create } from 'zustand';
// TYPE'S 
import { ProductTy, ColorsTy } from '@/types';

const useShoppingCart = create((set, get) => ({
  addItems: [],
  addCart: (addItem) => set((state) => 
    ({ 
        addItems: [...state.addItems, addItem]
    })), 

  deleteCartItem: (id) => set((state) => 
    ({ 
        addItems: state.addItems.filter((item)=> item.id !== id),
    })),

  updateQuantity: (id, qty) => set((state) => 
    (
      { 
        addItems: state.addItems.map((item)=> item.id === id
                                        ? {...item, quantity:qty} : item) ,
    })),

  reset: () => set({ count: 0 }), // Action to reset
}));

export default useShoppingCart;
