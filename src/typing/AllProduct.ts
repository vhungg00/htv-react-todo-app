type TAge = {
  age: string | null
}

type TImage = {
  asset: { url: string }
}

export type TAllProduct = {
  id: string
  age: TAge[] | null
  ageDescription: string | null
  brand: string | null
  categories: {
    categories: string
  }
  clothingCategories: {
    clothingCategories: string | null
  } | null
  featured: string | null | boolean
  forWhom: { forWhom: string }
  height: [{ height: string }] | null | []
  heightDescription: string | null
  images: TImage[]
  itemDescription: string
  name: string
  price: number | null
  slug: { current: string }
  stock: number
}
