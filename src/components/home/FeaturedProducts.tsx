import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
}

export default function FeaturedProducts({
  products,
  title = 'Featured Products',
  subtitle = 'Handpicked favorites from our collection',
  viewAllLink = '/shop',
}: FeaturedProductsProps) {
  return (
    <section className="container py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-display-sm mb-2">{title}</h2>
          <p className="text-body-md text-muted-foreground">{subtitle}</p>
        </div>
        <Link
          to={viewAllLink}
          className="hidden sm:flex items-center gap-2 text-body-sm font-medium hover:gap-3 transition-all"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ProductGrid products={products.slice(0, 4)} />

      <Link
        to={viewAllLink}
        className="sm:hidden flex items-center justify-center gap-2 mt-8 text-body-sm font-medium"
      >
        View All Products
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
