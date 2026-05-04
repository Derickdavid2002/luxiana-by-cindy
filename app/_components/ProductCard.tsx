"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { urlFor } from "@/lib/sanity";

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug.current,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <Link
      href={`/shop/${product.slug.current}`}
      className="group bg-gradient-to-br from-[#111111] to-[#0d0d0d] border border-[#1e1e1e] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[rgba(232,61,138,0.5)] hover:-translate-y-1.5 no-underline block"
    >
    {/* Image */}
<div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111]">
  {product.image ? (
    <Image
      src={urlFor(product.image).width(600).height(450).url()}
      alt={product.name}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">
      🌸
    </div>
  )}
  <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/60 to-transparent" />
  <span className="absolute top-3 left-3 bg-[rgba(232,61,138,0.15)] border border-[rgba(232,61,138,0.4)] text-[#f472b6] text-[9px] font-bold px-3 py-1 rounded-full tracking-[1.5px] uppercase backdrop-blur-[8px]">
    {product.category}
  </span>
  {!product.inStock && (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
      <span className="text-white/50 text-sm font-bold uppercase tracking-widest">Out of Stock</span>
    </div>
  )}
</div>

      {/* Info */}
      <div className="px-5 pt-[18px] pb-[22px]">
        <h3 className="text-[#f0f0f0] text-[15px] font-semibold mb-2 tracking-wide">{product.name}</h3>
        <p className="text-[#4a4a4a] text-xs leading-[1.65] mb-[18px] line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#E83D8A] font-extrabold text-[19px] [text-shadow:0_0_12px_rgba(232,61,138,0.4)]">
            {fmt(product.price)}
          </span>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`text-white border-none px-[18px] py-[9px] rounded-[9px] font-bold text-xs cursor-pointer transition-all duration-300 tracking-wide
              ${added
                ? "bg-gradient-to-br from-[#1a5c2a] to-[#22703a] shadow-[0_4px_16px_rgba(26,92,42,0.4)]"
                : product.inStock
                  ? "bg-gradient-to-br from-[#E83D8A] to-[#c0256e] shadow-[0_4px_16px_rgba(232,61,138,0.35)]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"}`}
          >
            {added ? "✓ Added!" : product.inStock ? "+ Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </Link>
  );
}