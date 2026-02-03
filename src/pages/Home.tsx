import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { products, featuredProducts, saleProducts } from '@/data/mockProducts';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts
        products={featuredProducts}
        title="Trending Now"
        subtitle="Our most popular picks this season"
      />
      <FeaturedProducts
        products={saleProducts}
        title="On Sale"
        subtitle="Great deals you don't want to miss"
        viewAllLink="/shop?sale=true"
      />
      <FeaturedProducts
        products={products}
        title="New Arrivals"
        subtitle="Fresh additions to our collection"
        viewAllLink="/shop?sort=newest"
      />
    </>
  );
}
