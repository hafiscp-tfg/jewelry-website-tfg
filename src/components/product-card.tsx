import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/contexts/currency-context';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export function ProductCard({ product, className }: ProductCardProps) {
  const productImage = getImage(product.images[0].id);
  const { formatPrice } = useCurrency();

  return (
    <div className={cn('group relative', className)}>
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-secondary">
        <Link href={`/products/${product.id}`} className="block h-full w-full">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.name}
              data-ai-hint={productImage.imageHint}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </Link>
        <div className="absolute inset-x-0 bottom-12 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button asChild variant="secondary" className="shadow-lg">
            <Link href={`/products/${product.id}`}>Quick View</Link>
          </Button>
        </div>
        <div className="absolute right-3 top-3">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Link href={`/products/${product.id}`}>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-foreground">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.material}</p>
          </div>
          <p className="text-sm font-medium text-foreground">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
