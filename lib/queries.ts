export const allProductsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id, name, slug, category, price, description, image, inStock, featured
}`

export const featuredProductsQuery = `*[_type == "product" && featured == true] {
  _id, name, slug, category, price, description, image, inStock, featured
}`

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id, name, slug, category, price, description, image, inStock, featured
}`

export const allGoldItemsQuery = `*[_type == "goldItem"] | order(order asc) {
  _id, name, slug, description, images, order
}`