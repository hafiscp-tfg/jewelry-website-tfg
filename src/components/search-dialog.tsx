'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from './ui/scroll-area';
import { useCurrency } from '@/contexts/currency-context';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (query.length > 1) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.category.toLowerCase().includes(lowerCaseQuery) ||
          product.material.toLowerCase().includes(lowerCaseQuery)
      );
      setResults(filteredProducts);
    } else {
      setResults([]);
    }
  }, [query]);
  
  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Input
            placeholder="Search for jewelry..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>

        <ScrollArea className="mt-4 max-h-[60vh]">
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((product) => {
                const image = getImage(product.images[0].id);
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex items-center gap-4 rounded-md p-2 hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : query.length > 1 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No results for "{query}"
            </p>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
