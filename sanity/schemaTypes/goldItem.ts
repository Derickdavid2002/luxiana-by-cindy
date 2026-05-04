export default {
  name: "goldItem",
  title: "Gold Collection",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Item Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order items appear on the page",
    },
  ],
}