export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  category: "membership" | "apparel" | "accessories" | "digital"
  images?: string[]
  featured?: boolean
}

// FSA Elite Performance Product Catalog
// The source of truth for all products - prices validated server-side
export const PRODUCTS: Product[] = [
  // MAIN MEMBERSHIP - $12.99 one-time for lifetime access
  {
    id: "fsa-elite-lifetime",
    name: "FSA Elite Lifetime Access",
    description: "One-time payment for full lifetime access to all FSA Elite Performance training modules, the Sales Bible, Olive AI coaching, exclusive community access, and permanent store member discounts. Become elite. Close more. Win big.",
    priceInCents: 1299, // $12.99
    category: "membership",
    featured: true,
  },
  
  // APPAREL
  {
    id: "fsa-elite-tee-black",
    name: "FSA Elite Performance Tee",
    description: "Premium black performance t-shirt with gold FSA Elite logo. Show the world you're a closer.",
    priceInCents: 4499, // $44.99
    category: "apparel",
  },
  {
    id: "fsa-elite-hoodie-black",
    name: "FSA Elite Performance Hoodie",
    description: "Premium heavyweight hoodie with embroidered FSA Elite crest. Stay warm, stay closing.",
    priceInCents: 8999, // $89.99
    category: "apparel",
  },
  {
    id: "fsa-closer-polo",
    name: "The Closer's Polo",
    description: "Professional polo shirt for the dealership floor. Look sharp, close sharp.",
    priceInCents: 5999, // $59.99
    category: "apparel",
  },
  {
    id: "fsa-elite-cap",
    name: "FSA Elite Snapback Cap",
    description: "Embroidered snapback cap with FSA crest. Elite mindset, elite style.",
    priceInCents: 3499, // $34.99
    category: "accessories",
  },
  
  // ACCESSORIES
  {
    id: "fsa-winner-bottle",
    name: "Winner's Water Bottle",
    description: "32oz insulated bottle. Stay hydrated, stay hungry. Laser-engraved FSA logo.",
    priceInCents: 3499, // $34.99
    category: "accessories",
  },
  {
    id: "fsa-desk-nameplate",
    name: "Elite Closer Desk Nameplate",
    description: "Custom engraved brass nameplate with 'Elite Closer' designation. For your desk or office.",
    priceInCents: 4999, // $49.99
    category: "accessories",
  },
  {
    id: "fsa-lanyard",
    name: "FSA Elite Lanyard",
    description: "Premium lanyard with FSA branding. Perfect for badges and keys.",
    priceInCents: 1499, // $14.99
    category: "accessories",
  },
  
  // DIGITAL
  {
    id: "fsa-objection-cards",
    name: "Objection Handler Cards (Digital)",
    description: "Printable PDF cards with 50+ objection responses. Keep them at your desk for instant reference.",
    priceInCents: 1999, // $19.99
    category: "digital",
  },
  {
    id: "fsa-closing-scripts",
    name: "Elite Closing Scripts Bundle",
    description: "Complete script library with word-for-word closes for every situation. Digital download.",
    priceInCents: 2999, // $29.99
    category: "digital",
  },
]

// Helper functions
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(product => product.id === id)
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return PRODUCTS.filter(product => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(product => product.featured)
}

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInCents / 100)
}
