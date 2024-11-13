import { CustomCollections, Integer } from "./customCollection"

const LinksSchema = {
    title: String,
    url: String,
    createdAt: Date
  }

export const LinksCollection = new CustomCollections('links', LinksSchema)

