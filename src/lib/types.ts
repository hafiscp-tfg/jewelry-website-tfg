export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Rings' | 'Necklaces' | 'Bracelets' | 'Earrings';
  material: 'Gold' | 'Silver' | 'Rose Gold';
  stone?: 'Diamond' | 'Ruby' | 'Emerald' | 'Pearl' | 'Sapphire';
  style: 'Solitaire' | 'Pendant' | 'Stud' | 'Bangle' | 'Chain' | 'Choker' | 'Vintage' | 'Hoop' | 'Charm';
  images: { id: string }[];
  isNew?: boolean;
  isFeatured?: boolean;
  stock: number;
}

export interface Category {
  id: string;
  name: 'Rings' | 'Necklaces' | 'Bracelets' | 'Earrings';
  image: { id: string };
  description: string;
  headerImage: { id: string };
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: { id: string };
}
