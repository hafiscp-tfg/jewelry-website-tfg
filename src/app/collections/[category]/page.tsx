import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronDown, Filter } from 'lucide-react';
import { categories, products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

type CollectionsPageProps = {
  params: {
    category: string;
  };
};

export default function CollectionsPage({ params }: CollectionsPageProps) {
  const { category: categorySlug } = params;

  const isAllCollections = categorySlug === 'all';
  const isNewArrivals = categorySlug === 'new-arrivals';
  
  let collection;
  if (isAllCollections) {
    collection = {
      name: 'All Collections',
      description: 'Explore our full range of handcrafted jewelry, designed to be cherished for a lifetime.',
      headerImage: { id: 'collection-header-all' },
    };
  } else if (isNewArrivals) {
     collection = {
      name: 'New Arrivals',
      description: 'Discover the latest additions to our collection of timeless and elegant jewelry.',
      headerImage: { id: 'collection-header-all' }, // You may want a specific image for new arrivals
    };
  }
  else {
    collection = categories.find(c => c.name.toLowerCase() === categorySlug);
  }

  if (!collection) {
    notFound();
  }

  let collectionProducts;
  if (isAllCollections) {
    collectionProducts = products;
  } else if (isNewArrivals) {
    collectionProducts = products.filter(p => p.isNew);
  } else {
    collectionProducts = products.filter(p => p.category.toLowerCase() === categorySlug);
  }
  
  const headerImage = getImage(collection.headerImage.id);

  return (
    <div>
      <section className="relative min-h-[320px]">
        {headerImage && (
          <Image
            src={headerImage.imageUrl}
            alt={collection.name}
            data-ai-hint={headerImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative flex h-full min-h-[320px] items-end p-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white">{collection.name}</h1>
        </div>
      </section>

      <section className="container py-8">
        <p className="mx-auto max-w-lg pb-8 pt-1 text-center text-muted-foreground">{collection.description}</p>
        
        <div className="flex flex-col gap-4 border-y py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
            <span className="shrink-0 text-sm font-bold">Filter By:</span>
            <Button variant="outline" className="h-9 shrink-0 rounded-full pl-4 pr-2">
              Material <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-9 shrink-0 rounded-full pl-4 pr-2">
              Stone Type <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-9 shrink-0 rounded-full pl-4 pr-2">
              Price Range <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
             <Button variant="outline" className="h-9 shrink-0 rounded-full pl-4 pr-2">
              Style <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Sort By:</span>
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* You can add pagination controls here if needed */}
      </section>
    </div>
  );
}