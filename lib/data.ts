export interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
}

export interface GoldItem {
  id: number
  name: string
  description: string
  image: string
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Rose Glow Serum",
    category: "Skincare",
    price: 12500,
    description: "Brightening vitamin C serum with rosehip oil for radiant, even skin tone.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80",
  },
  {
    id: 2,
    name: "Brightening Toner",
    category: "Skincare",
    price: 7200,
    description: "Gentle exfoliating toner with niacinamide for glass-skin results.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
  },
  {
    id: 3,
    name: "Glass Skin Moisturiser",
    category: "Skincare",
    price: 9200,
    description: "Lightweight gel-cream for 72hr hydration and a lit-from-within glow.",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=600&q=80",
  },
  {
    id: 4,
    name: "24K Gold Ring",
    category: "Gold",
    price: 85000,
    description: "Elegant 24K gold ring crafted for the woman who appreciates true luxury.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
  },
  {
    id: 5,
    name: "Gold Chain Necklace",
    category: "Gold",
    price: 120000,
    description: "Handcrafted solid gold chain necklace. Timeless and sophisticated.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
  },
  {
    id: 6,
    name: "Diamond Stud Earrings",
    category: "Diamonds",
    price: 250000,
    description: "Brilliant cut diamond studs set in 18K white gold. Classic elegance.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    id: 7,
    name: "Diamond Tennis Bracelet",
    category: "Diamonds",
    price: 450000,
    description: "Stunning row of princess cut diamonds set in gold. The ultimate statement piece.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
  {
    id: 8,
    name: "Luxury Dress Watch",
    category: "Watches",
    price: 320000,
    description: "Swiss movement dress watch with gold case and sapphire crystal glass.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
  {
    id: 9,
    name: "Rose Gold Watch",
    category: "Watches",
    price: 280000,
    description: "Elegant rose gold timepiece with diamond-set bezel. Pure sophistication.",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80",
  },
]

export const GOLD_ITEMS: GoldItem[] = [
  {
    id: 1,
    name: "24K Gold Facial Set",
    description: "Opulent gold-infused skincare ritual. Three-piece set for the ultimate luxury experience.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
  },
  {
    id: 2,
    name: "Gold Elixir Body Oil",
    description: "Pure 24K gold flakes suspended in a rare botanical oil blend. For skin that truly glows.",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80",
  },
  {
    id: 3,
    name: "Royal Gold Collection",
    description: "Our most exclusive gold jewellery collection. Crafted for the woman who deserves only the finest.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
  },
]

export const CATEGORIES = ["All", "Skincare", "Gold", "Diamonds", "Watches"]

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1600&q=90",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=90",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=90",
]