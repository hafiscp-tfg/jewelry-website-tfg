import type { Product, Category, Testimonial } from './types';

export const categories: Category[] = [
  { 
    id: 'cat-1', 
    name: 'Rings', 
    image: { id: 'category-rings' },
    description: "Explore our collection of exquisite rings, from timeless solitaires to modern statement pieces. Each ring is crafted to perfection, making it the perfect symbol of love and commitment.",
    headerImage: { id: 'collection-header-rings' }
  },
  { 
    id: 'cat-2', 
    name: 'Necklaces', 
    image: { id: 'category-necklaces' },
    description: "Discover timeless elegance and modern designs. Our curated collection of necklaces features exquisite craftsmanship and the finest materials, perfect for any occasion.",
    headerImage: { id: 'collection-header-necklaces' }
  },
  { 
    id: 'cat-3', 
    name: 'Earrings', 
    image: { id: 'category-earrings' },
    description: "From elegant studs to glamorous drops, our earrings are designed to illuminate your features. Find the perfect pair to complete your look, crafted with exceptional care.",
    headerImage: { id: 'collection-header-earrings' }
  },
  { 
    id: 'cat-4', 
    name: 'Bracelets', 
    image: { id: 'category-bracelets' },
    description: "Adorn your wrist with our stunning bracelets. Whether you prefer a delicate chain or a bold bangle, each piece is a work of art designed for everyday luxury.",
    headerImage: { id: 'collection-header-bracelets' }
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Solitaire Diamond Ring',
    description: 'An 18k white gold ring featuring a brilliant-cut 1-carat diamond. A timeless symbol of love and elegance.',
    price: 1999,
    category: 'Rings',
    material: 'Silver',
    stone: 'Diamond',
    style: 'Solitaire',
    images: [{ id: 'product-ring-1' }, { id: 'product-detail-1' }, { id: 'product-detail-2' }],
    isNew: true,
    isFeatured: true,
    stock: 5,
  },
  {
    id: 'prod-2',
    name: 'Golden Locket Necklace',
    description: 'A 24k gold-plated locket, perfect for holding cherished memories close to your heart. Intricate filigree work adds a vintage touch.',
    price: 450,
    category: 'Necklaces',
    material: 'Gold',
    style: 'Pendant',
    images: [{ id: 'product-necklace-1' }, { id: 'product-detail-1' }, { id: 'product-detail-3' }],
    isNew: true,
    isFeatured: true,
    stock: 12,
  },
  {
    id: 'prod-3',
    name: 'Emerald Stud Earrings',
    description: 'Vibrant green emeralds set in sterling silver. These stud earrings add a pop of color and sophistication to any outfit.',
    price: 875,
    category: 'Earrings',
    material: 'Silver',
    stone: 'Emerald',
    style: 'Stud',
    images: [{ id: 'product-earrings-1' }, { id: 'product-detail-2' }],
    isNew: true,
    stock: 8,
  },
  {
    id: 'prod-4',
    name: 'Rose Gold Bangle',
    description: 'A sleek and modern bangle crafted from solid 18k rose gold. Perfect for stacking or wearing as a standalone statement piece.',
    price: 1200,
    category: 'Bracelets',
    material: 'Rose Gold',
    style: 'Bangle',
    images: [{ id: 'product-bracelet-1' }, { id: 'product-detail-3' }],
    isNew: true,
    stock: 10,
  },
  {
    id: 'prod-5',
    name: 'Vintage Sapphire Ring',
    description: 'A stunning vintage-inspired ring with a deep blue sapphire center stone, surrounded by a halo of smaller diamonds.',
    price: 2500,
    category: 'Rings',
    material: 'Gold',
    stone: 'Sapphire',
    style: 'Vintage',
    images: [{ id: 'product-ring-2' }],
    isFeatured: true,
    stock: 3,
  },
  {
    id: 'prod-6',
    name: 'Sterling Silver Choker',
    description: 'A delicate and modern sterling silver choker chain that sits beautifully on the collarbone. Minimalist and chic.',
    price: 275,
    category: 'Necklaces',
    material: 'Silver',
    style: 'Choker',
    images: [{ id: 'product-necklace-2' }],
    stock: 15,
  },
  {
    id: 'prod-7',
    name: 'Diamond Hoop Earrings',
    description: 'Classic diamond hoop earrings in 14k gold. A versatile accessory that transitions effortlessly from day to night.',
    price: 1500,
    category: 'Earrings',
    material: 'Gold',
    stone: 'Diamond',
    style: 'Hoop',
    images: [{ id: 'product-earrings-2' }],
    isFeatured: true,
    stock: 7,
  },
  {
    id: 'prod-8',
    name: 'Pearl Charm Bracelet',
    description: 'An elegant bracelet featuring freshwater pearls and delicate gold charms. A piece that exudes grace and femininity.',
    price: 350,
    category: 'Bracelets',
    material: 'Gold',
    stone: 'Pearl',
    style: 'Charm',
    images: [{ id: 'product-bracelet-2' }],
    stock: 20,
  },
];

export const testimonials: Testimonial[] = [
    {
        id: 'test-1',
        quote: "The engagement ring I purchased exceeded all my expectations. The quality and craftsmanship are simply breathtaking. Thank you for making our special moment perfect.",
        author: 'Sarah L.',
        role: 'Verified Buyer',
        image: { id: 'testimonial-sarah' }
    },
    {
        id: 'test-2',
        quote: "I've never received so many compliments on a piece of jewelry before. The necklace is delicate, elegant, and beautifully made. It's my new favorite.",
        author: 'Michael B.',
        role: 'Verified Buyer',
        image: { id: 'testimonial-michael' }
    },
    {
        id: 'test-3',
        quote: "Absolutely stunning earrings! The customer service was also fantastic, helping me choose the perfect gift. I will definitely be a returning customer.",
        author: 'Jessica T.',
        role: 'Verified Buyer',
        image: { id: 'testimonial-jessica' }
    }
];
