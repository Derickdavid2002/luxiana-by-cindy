import Hero from "../_components/Hero";
import CategoryShowcase from "../_components/CategoryShowcase";
import FeaturedProducts from "../_components/FeaturedProducts";
import GoldTeaser from "../_components/GoldTeaser";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <GoldTeaser />
    </main>
  );
}