import { Suspense } from "react";
import { client } from "../../../lib/sanity";
import { allProductsQuery } from "../../../lib/queries";
import { Product } from "../../types";
import ShopClient from "./_components/ShopClient";

const MOCK_PRODUCTS: Product[] = [
  {
    _id: "mock-1",
    name: "Glow Serum",
    slug: { current: "glow-serum" },
    category: "Skincare",
    price: 15000,
    description: "A luxurious serum that gives your skin a radiant, healthy glow.",
    image: null,
    inStock: true,
    featured: true,
  },
  {
    _id: "mock-2",
    name: "Kayamata Blend",
    slug: { current: "kayamata-blend" },
    category: "Kayamata",
    price: 22000,
    description: "Premium feminine wellness blend crafted with natural ingredients.",
    image: null,
    inStock: true,
    featured: true,
  },
  {
    _id: "mock-3",
    name: "Luxury Body Butter",
    slug: { current: "luxury-body-butter" },
    category: "Body Care",
    price: 12000,
    description: "Rich, nourishing body butter for silky smooth skin head to toe.",
    image: null,
    inStock: true,
    featured: true,
  },
  {
    _id: "mock-4",
    name: "Signature Fragrance",
    slug: { current: "signature-fragrance" },
    category: "Fragrance",
    price: 28000,
    description: "An exclusive signature scent that lingers beautifully all day.",
    image: null,
    inStock: true,
    featured: true,
  },
  {
    _id: "mock-5",
    name: "Brightening Cream",
    slug: { current: "brightening-cream" },
    category: "Skincare",
    price: 18000,
    description: "Brightening cream that evens skin tone and reduces dark spots.",
    image: null,
    inStock: true,
    featured: false,
  },
  {
    _id: "mock-6",
    name: "Feminine Oil Blend",
    slug: { current: "feminine-oil-blend" },
    category: "Kayamata",
    price: 25000,
    description: "Traditional feminine wellness oil with premium natural extracts.",
    image: null,
    inStock: true,
    featured: false,
  },
  {
    _id: "mock-7",
    name: "Exfoliating Scrub",
    slug: { current: "exfoliating-scrub" },
    category: "Body Care",
    price: 9500,
    description: "Gentle yet effective scrub that leaves your skin silky smooth.",
    image: null,
    inStock: false,
    featured: false,
  },
  {
    _id: "mock-8",
    name: "Rose Mist Perfume",
    slug: { current: "rose-mist-perfume" },
    category: "Fragrance",
    price: 32000,
    description: "Delicate rose-based mist with warm woody undertones.",
    image: null,
    inStock: true,
    featured: false,
  },
];

export default async function ShopPage() {
  let products: Product[] = [];

  try {
    const fetched = await client.fetch(allProductsQuery);
    products = fetched?.length > 0 ? fetched : MOCK_PRODUCTS;
  } catch {
    products = MOCK_PRODUCTS;
  }

  return (
    <Suspense fallback={<div className="bg-[#060606] min-h-screen" />}>
      <ShopClient products={products} />
    </Suspense>
  );
}