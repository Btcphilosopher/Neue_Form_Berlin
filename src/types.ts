export interface Product {
  id: string;
  name: string;
  category: string;
  priceEUR: number;
  image: string;
  designer: string;
  origin: string;
  material: string;
  dimensions: string;
  weight: string;
  description: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  content: string;
}

export type Language = 'DE' | 'EN';
export type Currency = 'EUR' | 'USD' | 'GBP';
