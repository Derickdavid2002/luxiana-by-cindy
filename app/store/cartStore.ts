"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const EXPIRY_HOURS = 12
const EXPIRY_MS = EXPIRY_HOURS * 60 * 60 * 1000

export interface CartItem {
  _id: string
  name: string
  price: number
  image: any
  slug: string
  qty: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  expiresAt: number | null
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: Omit<CartItem, "qty">) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  checkExpiry: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      expiresAt: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      addItem: (item) => {
        // Set or refresh expiry on every add
        const expiresAt = Date.now() + EXPIRY_MS

        const exists = get().items.find(i => i._id === item._id)
        if (exists) {
          set(state => ({
            expiresAt,
            items: state.items.map(i =>
              i._id === item._id ? { ...i, qty: i.qty + 1 } : i
            ),
          }))
        } else {
          set(state => ({
            expiresAt,
            items: [...state.items, { ...item, qty: 1 }],
          }))
        }
      },

      removeItem: (id) =>
        set(state => ({
          items: state.items.filter(i => i._id !== id),
        })),

      updateQty: (id, qty) => {
        if (qty < 1) return get().removeItem(id)
        set(state => ({
          items: state.items.map(i =>
            i._id === id ? { ...i, qty } : i
          ),
        }))
      },

      clearCart: () => set({ items: [], expiresAt: null }),

      checkExpiry: () => {
        const { expiresAt, clearCart } = get()
        if (expiresAt && Date.now() > expiresAt) {
          clearCart()
        }
      },

      totalItems: () => get().items.reduce((a, i) => a + i.qty, 0),
      totalPrice: () => get().items.reduce((a, i) => a + i.price * i.qty, 0),
    }),
    {
      name: "luxiana-cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)