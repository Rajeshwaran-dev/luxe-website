import { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', productCount: 24 },
  { id: '2', name: 'Clothing', slug: 'clothing', productCount: 36 },
  { id: '3', name: 'Home & Living', slug: 'home-living', productCount: 18 },
  { id: '4', name: 'Sports', slug: 'sports', productCount: 12 },
  { id: '5', name: 'Beauty', slug: 'beauty', productCount: 28 },
  { id: '6', name: 'Books', slug: 'books', productCount: 42 },
];

export const brands = [
  'Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 
  'Puma', 'Levi\'s', 'H&M', 'Zara', 'IKEA', 'Dyson'
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
    ],
    category: categories[0],
    brand: 'Sony',
    stock: 45,
    rating: 4.8,
    reviewCount: 324,
    badges: ['sale', 'bestseller'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with precision. Heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    ],
    category: categories[0],
    brand: 'Apple',
    stock: 28,
    rating: 4.9,
    reviewCount: 512,
    badges: ['trending'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: '3',
    name: 'Minimalist Leather Backpack',
    description: 'Crafted from genuine leather with modern design. Fits 15" laptops, water-resistant lining, and hidden anti-theft pocket.',
    price: 189.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    ],
    category: categories[1],
    brand: 'Zara',
    stock: 62,
    rating: 4.7,
    reviewCount: 189,
    badges: ['new'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12'),
  },
  {
    id: '4',
    name: 'Ultra-Thin Laptop Stand',
    description: 'Ergonomic aluminum laptop stand with adjustable height. Improves posture and increases productivity. Foldable for easy transport.',
    price: 79.99,
    originalPrice: 99.99,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    ],
    category: categories[0],
    brand: 'IKEA',
    stock: 120,
    rating: 4.6,
    reviewCount: 256,
    badges: ['sale'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '5',
    name: 'Organic Cotton T-Shirt',
    description: '100% organic cotton, sustainably sourced. Soft, breathable, and available in 12 colors.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
    category: categories[1],
    brand: 'H&M',
    stock: 200,
    rating: 4.5,
    reviewCount: 428,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    id: '6',
    name: 'Smart Home Speaker',
    description: 'Voice-controlled speaker with rich, room-filling sound. Works with all major smart home platforms.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800',
    ],
    category: categories[0],
    brand: 'Samsung',
    stock: 85,
    rating: 4.7,
    reviewCount: 367,
    badges: ['trending'],
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '7',
    name: 'Premium Running Shoes',
    description: 'Lightweight and responsive running shoes with advanced cushioning technology. Perfect for long-distance running.',
    price: 159.99,
    originalPrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    ],
    category: categories[3],
    brand: 'Nike',
    stock: 75,
    rating: 4.8,
    reviewCount: 892,
    badges: ['sale', 'bestseller'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '8',
    name: 'Ceramic Pour-Over Coffee Set',
    description: 'Handcrafted ceramic pour-over coffee maker with matching cups. Brew the perfect cup every time.',
    price: 68.99,
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    ],
    category: categories[2],
    brand: 'IKEA',
    stock: 42,
    rating: 4.9,
    reviewCount: 156,
    badges: ['new'],
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-14'),
  },
];

export const featuredProducts = products.filter(p => 
  p.badges?.includes('bestseller') || p.badges?.includes('trending')
);

export const saleProducts = products.filter(p => 
  p.badges?.includes('sale')
);

export const newProducts = products.filter(p => 
  p.badges?.includes('new')
);
