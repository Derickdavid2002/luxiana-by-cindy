import { StructureBuilder } from "sanity/structure"

// ✅ SAFE: no window/document usage anywhere
export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Products
      S.listItem()
        .title("Products")
        .child(
          S.documentTypeList("product")
            .title("Products")
        ),

      // Add more content types safely here if needed
      S.divider(),

      S.listItem()
        .title("Settings")
        .child(
          S.documentTypeList("settings")
            .title("Settings")
        ),
    ])