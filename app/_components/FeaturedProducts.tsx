import Link from "next/link";
import { client } from "../../lib/sanity";
import { Product } from "../types";
import ProductCard from "../_components/ProductCard";

const featuredQuery = `*[_type == "product" && featured == true][0...4]`;

export default async function FeaturedProducts() {
  const products: Product[] = await client.fetch(featuredQuery);

  return (
    <div className="bg-[#060606] px-8 py-[90px]">
      <div className="max-w-[1280px] mx-auto">

        <div className="text-center mb-14">
          <p className="text-[#E83D8A] text-[10px] tracking-[5px] uppercase mb-3.5 [text-shadow:0_0_10px_rgba(232,61,138,0.4)]">
            Bestsellers
          </p>
          <h2 className="text-[#f0f0f0] text-[34px] font-bold tracking-wide">Featured Products</h2>
          <div className="w-[60px] h-[2px] bg-gradient-to-r from-transparent via-[#E83D8A] to-transparent mx-auto mt-[18px] shadow-[0_0_10px_#E83D8A]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        <div className="text-center mt-[52px]">
          <Link
            href="/shop"
            className="inline-block bg-transparent text-[#E83D8A] border border-[rgba(232,61,138,0.4)] px-11 py-3.5 rounded-[11px] font-semibold text-sm no-underline tracking-wide shadow-[0_0_20px_rgba(232,61,138,0.1)] transition-all duration-300 hover:bg-[rgba(232,61,138,0.08)]"
          >
            View All Products →
          </Link>
        </div>

      </div>
    </div>
  );
}