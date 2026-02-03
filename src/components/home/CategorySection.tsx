import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/mockProducts';

export default function CategorySection() {
  return (
    <section className="container py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-display-sm mb-2">Shop by Category</h2>
          <p className="text-body-md text-muted-foreground">
            Find exactly what you're looking for
          </p>
        </div>
        <Link
          to="/categories"
          className="hidden sm:flex items-center gap-2 text-body-sm font-medium hover:gap-3 transition-all"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/shop?category=${category.slug}`}
              className="group block p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
            >
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl">
                  {category.slug === 'electronics' && '📱'}
                  {category.slug === 'clothing' && '👕'}
                  {category.slug === 'home-living' && '🏠'}
                  {category.slug === 'sports' && '⚽'}
                  {category.slug === 'beauty' && '💄'}
                  {category.slug === 'books' && '📚'}
                </span>
              </div>
              <h3 className="text-heading-sm mb-1">{category.name}</h3>
              <p className="text-caption text-muted-foreground">
                {category.productCount} products
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
