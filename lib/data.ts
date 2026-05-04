export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface GoldItem {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Rose Glow Serum", category: "Skincare", price: 12500, description: "Brightening vitamin C serum with rosehip oil for radiant, even skin tone.", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80" },
  { id: 2, name: "Kayamata Spice Blend", category: "Kayamata", price: 8500, description: "Premium aromatic blend for sensual allure. 100% natural ingredients.", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80" },
  { id: 3, name: "Whipped Shea Butter", category: "Body Care", price: 6500, description: "Deeply moisturising whipped shea butter with jasmine & vanilla.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80" },
  { id: 4, name: "Brightening Toner", category: "Skincare", price: 7200, description: "Gentle exfoliating toner with niacinamide for glass-skin results.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80" },
  { id: 5, name: "Luxe Body Oil", category: "Body Care", price: 9800, description: "Silky dry oil blend of marula, argan & gold shimmer.", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80" },
  { id: 6, name: "Midnight Perfume Oil", category: "Fragrance", price: 11000, description: "Intoxicating blend of oud, amber and dark rose. Long-lasting.", image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80" },
  { id: 7, name: "Kayamata Honey Pack", category: "Kayamata", price: 15000, description: "Exclusive honey-infused pack for feminine wellness and allure.", image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80" },
  { id: 8, name: "Glass Skin Moisturiser", category: "Skincare", price: 9200, description: "Lightweight gel-cream for 72hr hydration and a lit-from-within glow.", image: "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=600&q=80" },
];

export const GOLD_ITEMS: GoldItem[] = [
  { id: 1, name: "24K Gold Facial Set", description: "Opulent gold-infused skincare ritual. Three-piece set for the ultimate luxury experience.", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80" },
  { id: 2, name: "Gold Elixir Body Oil", description: "Pure 24K gold flakes suspended in a rare botanical oil blend. For skin that truly glows.", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80" },
  { id: 3, name: "Royal Gold Kayamata", description: "Our most exclusive kayamata blend, infused with edible gold for the ultimate gift.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80" },
];

export const CATEGORIES = ["All", "Skincare", "Kayamata", "Body Care", "Fragrance"];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1600&q=90",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=90",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=90",
]