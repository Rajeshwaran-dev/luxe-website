import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-caption uppercase tracking-widest text-muted-foreground mb-4"
            >
              New Collection 2024
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-display-lg lg:text-[4.5rem] leading-none mb-6"
            >
              Discover
              <br />
              <span className="gradient-text">Premium Quality</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-body-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8"
            >
              Curated collection of premium products for the modern lifestyle.
              Free shipping on orders over $100.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/shop">
                  Shop Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/categories">View Categories</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center lg:justify-start gap-8 mt-12"
            >
              <div>
                <p className="text-display-sm">500+</p>
                <p className="text-caption text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-display-sm">50K+</p>
                <p className="text-caption text-muted-foreground">Customers</p>
              </div>
              <div>
                <p className="text-display-sm">4.9</p>
                <p className="text-caption text-muted-foreground">Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-large">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                alt="Premium products showcase"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-medium hidden lg:block"
            >
              <p className="text-caption text-muted-foreground mb-1">This month</p>
              <p className="text-heading-lg">2,500+</p>
              <p className="text-body-sm text-muted-foreground">Orders shipped</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
