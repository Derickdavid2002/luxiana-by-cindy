export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Skincare", value: "Skincare" },
          { title: "Kayamata", value: "Kayamata" },
          { title: "Body Care", value: "Body Care" },
          { title: "Fragrance", value: "Fragrance" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "price",
      title: "Price (₦)",
      type: "number",
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    },
  ],
}