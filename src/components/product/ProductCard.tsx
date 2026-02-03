import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-card bg-card rounded-xl overflow-hidden shadow-card">
          {/* Image */}
          <div className="relative aspect-square image-zoom">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {product.badges?.includes('sale') && (
                <Badge className="bg-badge-sale text-destructive-foreground">
                  -{discount}%
                </Badge>
              )}
              {product.badges?.includes('new') && (
                <Badge className="bg-badge-new text-success-foreground">
                  New
                </Badge>
              )}
              {product.badges?.includes('trending') && (
                <Badge className="bg-badge-trending text-warning-foreground">
                  Trending
                </Badge>
              )}
            </div>

            {/* Quick Add Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button
                variant="hero-outline"
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-caption text-muted-foreground">
                {product.brand}
              </span>
              <span className="text-caption text-muted-foreground">•</span>
              <span className="text-caption text-muted-foreground">
                {product.category.name}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-heading-sm line-clamp-2 mb-2">{product.name}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-body-sm font-medium">{product.rating}</span>
              <span className="text-caption text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-heading-md">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-body-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
