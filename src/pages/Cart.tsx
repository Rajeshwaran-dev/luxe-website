import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
  } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/50 mb-6" />
        <h1 className="text-display-md mb-4">Your Cart is Empty</h1>
        <p className="text-body-md text-muted-foreground mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button variant="hero-outline" size="lg" asChild>
          <Link to="/shop">
            Start Shopping
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-display-md">Shopping Cart</h1>
        <Button
          variant="ghost"
          onClick={clearCart}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Cart
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-6 p-4 rounded-xl bg-card shadow-card"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${item.product.id}`}
                  className="h-28 w-28 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="text-heading-sm hover:text-primary transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-body-sm text-muted-foreground mb-2">
                    {item.product.brand} • {item.product.category.name}
                  </p>
                  <p className="text-heading-md">{formatPrice(item.product.price)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-input rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-body-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-heading-md">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-xl bg-secondary/50 space-y-4">
            <h2 className="text-heading-lg">Order Summary</h2>

            <div className="space-y-3 py-4 border-y border-border">
              <div className="flex justify-between text-body-md">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-body-md">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-body-md">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between text-heading-md">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Button variant="hero-outline" size="lg" className="w-full" asChild>
              <Link to="/checkout">
                Proceed to Checkout
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>

            {/* Free shipping notice */}
            {subtotal < 100 && (
              <p className="text-caption text-center text-muted-foreground">
                Add {formatPrice(100 - subtotal)} more for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
