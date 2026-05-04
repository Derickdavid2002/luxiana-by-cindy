import { create } from "zustand";
import { CartItem } from "../types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product) =>
    set((state) => {
      const exists = state.items.find((i) => i._id === product._id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i._id === product._id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i._id !== id) })),

  updateQty: (id, qty) =>
    set((state) => {
      if (qty < 1) return { items: state.items.filter((i) => i._id !== id) };
      return {
        items: state.items.map((i) => (i._id === id ? { ...i, qty } : i)),
      };
    }),
}));