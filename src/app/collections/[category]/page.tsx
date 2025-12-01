'use client';

import Image from 'next/image';
import { notFound, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, Filter, X } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import React, { useEffect, useMemo, useState, use } from 'react';
import type { Product } from '@/lib/types';
import { useDebounce } from 'react-use';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

const materials = ['Gold', 'Silver', 'Rose Gold'];
const stones = ['Diamond', 'Ruby', 'Emerald', 'Pearl', 'Sapphire'];
const styles = ['Solitaire', 'Pendant', 'Stud', 'Bangle', 'Chain', 'Choker', 'Vintage', 'Hoop', 'Charm'];

export default function CollectionsPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = use(params);

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
      headerImage: { id: 'collection-header-all' }, 
    };
  }
  else {
    collection = categories.find(c => c.name.toLowerCase() === categorySlug);
  }

  if (!collection) {
    notFound();
  }

  const baseProducts = useMemo(() => {
    if (isAllCollections) {
      return products;
    } else if (isNewArrivals) {
      return products.filter(p => p.isNew);
    } else {
      return products.filter(p => p.category.toLowerCase() === categorySlug);
    }
  }, [categorySlug, isAllCollections, isNewArrivals]);

  const headerImage = getImage(collection.headerImage.id);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(baseProducts);

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(searchParams.getAll('material'));
  const [selectedStones, setSelectedStones] = useState<string[]>(searchParams.getAll('stone'));
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const min = searchParams.get('minPrice');
    const max = searchParams.get('maxPrice');
    return [min ? Number(min) : 0, max ? Number(max) : 5000];
  });
  const [selectedStyles, setSelectedStyles] = useState<string[]>(searchParams.getAll('style'));
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'featured');

  const createQueryString = (params: Record<string, any>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(params)) {
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        newSearchParams.delete(key);
      } else if (Array.isArray(value)) {
        newSearchParams.delete(key);
        value.forEach(v => newSearchParams.append(key, v));
      } else {
        newSearchParams.set(key, String(value));
      }
    }
    return newSearchParams.toString();
  };

  const updateURL = (params: Record<string, any>) => {
    router.push(`${pathname}?${createQueryString(params)}`);
  };

  useDebounce(() => {
      updateURL({ minPrice: priceRange[0], maxPrice: priceRange[1] });
    }, 500, [priceRange]);
    
  useEffect(() => {
    let tempProducts = [...baseProducts];

    // Filter by material
    if (selectedMaterials.length > 0) {
      tempProducts = tempProducts.filter(p => selectedMaterials.includes(p.material));
    }

    // Filter by stone
    if (selectedStones.length > 0) {
      tempProducts = tempProducts.filter(p => p.stone && selectedStones.includes(p.stone));
    }
    
    // Filter by style
    if (selectedStyles.length > 0) {
      tempProducts = tempProducts.filter(p => selectedStyles.includes(p.style));
    }

    // Filter by price
    tempProducts = tempProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort products
    switch (sortBy) {
      case 'newest':
        tempProducts.sort((a, b) => (b.isNew ? 1 : -1) - (a.isNew ? 1 : -1) || 0);
        break;
      case 'price-asc':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        tempProducts.sort((a, b) => (b.isFeatured ? 1 : -1) - (a.isFeatured ? 1 : -1) || 0);
        break;
    }

    setFilteredProducts(tempProducts);
  }, [baseProducts, selectedMaterials, selectedStones, priceRange, selectedStyles, sortBy]);

  const activeFilterCount = selectedMaterials.length + selectedStones.length + selectedStyles.length + (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0);
  
  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedStones([]);
    setSelectedStyles([]);
    setPriceRange([0, 5000]);
    router.push(pathname);
  };

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
          <div className="flex flex-wrap items-center gap-3 pb-2 md:pb-0">
            <span className="shrink-0 text-sm font-bold flex items-center gap-2"><Filter className="w-4 h-4" />Filter By:</span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 shrink-0 rounded-full pl-4 pr-2">
                  Material {selectedMaterials.length > 0 && `(${selectedMaterials.length})`} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {materials.map(material => (
                  <DropdownMenuCheckboxItem key={material} checked={selectedMaterials.includes(material)} onSelect={e => e.preventDefault()}
                    onCheckedChange={(checked) => {
                      const newMaterials = checked ? [...selectedMaterials, material] : selectedMaterials.filter(m => m !== material);
                      setSelectedMaterials(newMaterials);
                       updateURL({ material: newMaterials });
                    }}>
                    {material}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 shrink-0 rounded-full pl-4 pr-2">
                  Stone Type {selectedStones.length > 0 && `(${selectedStones.length})`} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {stones.map(stone => (
                  <DropdownMenuCheckboxItem key={stone} checked={selectedStones.includes(stone)} onSelect={e => e.preventDefault()}
                    onCheckedChange={(checked) => {
                       const newStones = checked ? [...selectedStones, stone] : selectedStones.filter(s => s !== stone);
                      setSelectedStones(newStones);
                       updateURL({ stone: newStones });
                    }}>
                    {stone}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="h-9 shrink-0 rounded-full pl-4 pr-2">
                    Price Range <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Price Range</h4>
                            <p className="text-sm text-muted-foreground">
                                Show items from ${priceRange[0]} to ${priceRange[1]}
                            </p>
                        </div>
                        <Slider
                            defaultValue={priceRange}
                            value={priceRange}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                            min={0}
                            max={5000}
                            step={50}
                        />
                         <div className="flex justify-between text-xs text-muted-foreground">
                            <span>$0</span>
                            <span>$5,000</span>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 shrink-0 rounded-full pl-4 pr-2">
                  Style {selectedStyles.length > 0 && `(${selectedStyles.length})`} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {styles.map(style => (
                  <DropdownMenuCheckboxItem key={style} checked={selectedStyles.includes(style)} onSelect={e => e.preventDefault()}
                    onCheckedChange={(checked) => {
                      const newStyles = checked ? [...selectedStyles, style] : selectedStyles.filter(s => s !== style);
                      setSelectedStyles(newStyles);
                      updateURL({ style: newStyles });
                    }}>
                    {style}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 rounded-full">
                    Clear ({activeFilterCount}) <X className="ml-2 h-4 w-4" />
                </Button>
            )}

          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Sort By:</span>
            <Select value={sortBy} onValueChange={(value) => {
              setSortBy(value);
              updateURL({ sortBy: value });
            }}>
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
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="font-headline text-2xl font-bold">No Products Found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
            <Button onClick={clearFilters} className="mt-4">Clear Filters</Button>
          </div>
        )}
        
        {/* You can add pagination controls here if needed */}
      </section>
    </div>
  );
}
