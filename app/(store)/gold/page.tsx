import { client } from "@/lib/sanity"
import { allGoldItemsQuery } from "@/lib/queries"
import { GoldItem } from "../../types"
import GoldGrid from "./_components/GoldGrid"

export const revalidate = 0

export default async function GoldPage() {
  const items: GoldItem[] = await client.fetch(allGoldItemsQuery)

  return <GoldGrid items={items} />
}