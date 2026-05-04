export interface Product {
  _id: string
  name: string
  slug: { current: string }
  category: "Skincare" | "Kayamata" | "Body Care" | "Fragrance"
  price: number
  description: string
  image: any
  inStock: boolean
  featured: boolean
}

export interface GoldItem {
  _id: string
  name: string
  slug: { current: string }
  description: string
  images: any[]
  order: number
}

export interface CartItem {
  _id: string
  name: string
  price: number
  image: any
  slug: string
  qty: number
}