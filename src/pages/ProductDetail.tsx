import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, Star, ChevronLeft, ChevronRight, Minus, Plus, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/mockProducts';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-display-md mb-4">Product Not Found</h1>
        <p className="text-body-md text-muted-foreground mb-8">
          The product you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-body-sm">
        <Link to="/" className="text-muted-foreground hover:text-primary">
          Home
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link to="/shop" className="text-muted-foreground hover:text-primary">
          Shop
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link
          to={`/shop?category=${product.category.slug}`}
          className="text-muted-foreground hover:text-primary"
        >
          {product.category.name}
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
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
            </div>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand & Category */}
          <div className="flex items-center gap-3">
            <span className="text-body-sm text-muted-foreground">
              {product.brand}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-body-sm text-muted-foreground">
              {product.category.name}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-display-md">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-warning text-warning'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-body-sm font-medium">{product.rating}</span>
            <span className="text-body-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-display-sm">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-heading-md text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge className="bg-badge-sale text-destructive-foreground">
                  Save {discount}%
                </Badge>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-body-md text-muted-foreground">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <Check className="h-5 w-5 text-success" />
                <span className="text-body-sm text-success">
                  In Stock ({product.stock} available)
                </span>
              </>
            ) : (
              <span className="text-body-sm text-destructive">Out of Stock</span>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border border-input rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-body-md">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="hero-outline"
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            <Button variant="outline" size="icon-lg">
              <Heart className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="icon-lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-caption font-medium">Free Shipping</p>
              <p className="text-caption text-muted-foreground">Orders $100+</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-caption font-medium">Secure Payment</p>
              <p className="text-caption text-muted-foreground">100% Protected</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-caption font-medium">Easy Returns</p>
              <p className="text-caption text-muted-foreground">30 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Reviews */}
      <Tabs defaultValue="description" className="mt-16">
        <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            Reviews ({product.reviewCount})
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            Shipping & Returns
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-8">
          <div className="max-w-3xl">
            <p className="text-body-md text-muted-foreground mb-6">
              {product.description}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-success mt-0.5" />
                <span className="text-body-md">Premium quality materials</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-success mt-0.5" />
                <span className="text-body-md">Carefully designed for durability</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-success mt-0.5" />
                <span className="text-body-md">1-year manufacturer warranty</span>
              </li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-8">
          <div className="text-center py-12">
            <p className="text-body-md text-muted-foreground">
              Reviews coming soon...
            </p>
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="py-8">
          <div className="max-w-3xl space-y-6">
            <div>
              <h3 className="text-heading-md mb-3">Shipping</h3>
              <p className="text-body-md text-muted-foreground">
                Free shipping on orders over $100. Standard shipping takes 3-5
                business days. Express shipping available at checkout.
              </p>
            </div>
            <div>
              <h3 className="text-heading-md mb-3">Returns</h3>
              <p className="text-body-md text-muted-foreground">
                We accept returns within 30 days of purchase. Items must be in
                original condition with tags attached. Contact our support team
                to initiate a return.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <FeaturedProducts
          products={relatedProducts}
          title="You May Also Like"
          subtitle="Similar products you might enjoy"
          viewAllLink={`/shop?category=${product.category.slug}`}
        />
      )}
    </div>
  );
}
