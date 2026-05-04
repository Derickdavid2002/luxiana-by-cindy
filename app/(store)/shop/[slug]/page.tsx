import { client } from "../../../../lib/sanity";
import { productBySlugQuery, allProductsQuery } from "../../../../lib/queries";
import { Product } from "../../../types";
import { notFound } from "next/navigation";
import ProductDetail from "../_components/ProductDetail";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products: Product[] = await client.fetch(allProductsQuery);
    return products?.length > 0
      ? products.map((p) => ({ slug: p.slug.current }))
      : [];
  } catch {
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: Product | null = null;

  try {
    product = await client.fetch(productBySlugQuery, { slug });
  } catch {
    product = null;
  }

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}