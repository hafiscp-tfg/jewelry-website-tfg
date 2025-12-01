'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, use } from 'react';
import { Star, Heart, Truck, Lock, ShieldCheck, Minus, Plus } from 'lucide-react';

import { products, testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product-card';
import { useToast } from '@/hooks/use-toast';
import type { Product, Testimonial } from '@/lib/types';
import { useCart } from '@/contexts/cart-context';
import { useCurrency } from '@/contexts/currency-context';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

type ProductPageProps = {
  params: {
    id: string;
  };
};

function ProductImageGallery({ product }: { product: Product }) {
  const [mainImageId, setMainImageId] = useState(product.images[0].id);

  const mainImage = getImage(mainImageId);
  const galleryImages = product.images.slice(0, 4).map(getImage).filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        {mainImage && (
          <Image
            src={mainImage.imageUrl}
            alt={product.name}
            data-ai-hint={mainImage.imageHint}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {galleryImages.map((image) => image && (
          <div 
            key={image.id} 
            className={`relative aspect-square w-full overflow-hidden rounded-md cursor-pointer ${mainImageId === image.id ? 'border-2 border-primary' : ''}`}
            onClick={() => setMainImageId(image.id)}
          >
            <Image
              src={image.imageUrl}
              alt={`${product.name} thumbnail`}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 10vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { toast } = useToast();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };
  
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: !isWishlisted ? "Added to Wishlist" : "Removed from Wishlist",
      description: `${product.name} has been ${!isWishlisted ? 'added to' : 'removed from'} your wishlist.`,
    });
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  
  return (
    <div className="container py-8 sm:py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        <ProductImageGallery product={product} />

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight lg:text-4xl">{product.name}</h1>
            <p className="mt-2 text-2xl text-muted-foreground">{formatPrice(product.price)}</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center text-primary">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5" />
              </div>
              <a href="#reviews" className="text-sm text-muted-foreground underline hover:text-primary">(3 Reviews)</a>
            </div>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>
          
          <div className="flex items-center gap-4">
             <label htmlFor="quantity" className="text-sm font-bold">Quantity:</label>
             <div className="flex items-center rounded-full border">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
                <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min="1" className="h-8 w-12 border-0 bg-transparent p-0 text-center focus-visible:ring-0" />
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
             </div>
          </div>


          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="flex-1 rounded-full" onClick={handleAddToCart}>Add to Cart</Button>
            <Button size="icon" variant="outline" className="h-12 w-12 rounded-full" aria-label="Add to wishlist" onClick={handleWishlist}>
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          
           <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /><span>Free Shipping</span></div>
              <div className="flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /><span>Secure Checkout</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /><span>Lifetime Warranty</span></div>
           </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Materials & Sizing</AccordionTrigger>
              <AccordionContent>
                Crafted from high-quality, ethically sourced materials. Our {product.material} pieces are designed for durability and timeless appeal. See sizing chart for details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Care Instructions</AccordionTrigger>
              <AccordionContent>
                To maintain its shine, avoid contact with perfumes and lotions. Store in a cool, dry place. Clean gently with a soft cloth.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                Enjoy free standard shipping on all US orders. We accept returns within 30 days of purchase for a full refund or exchange.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
       {/* Customer Reviews Section */}
      <div id="reviews" className="pt-16 sm:pt-24">
        <div className="border-t pt-12">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Words From Our Customers</h2>
                <p className="mt-2 text-lg leading-8 text-muted-foreground">
                We are proud to create jewelry that becomes a part of your story.
                </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {testimonials.map((testimonial: Testimonial) => {
                const testimonialImage = getImage(testimonial.image.id);
                return (
                    <div key={testimonial.id} className="flex flex-col rounded-lg border bg-background p-8">
                    <div className="flex-1 text-foreground">
                        <p>"{testimonial.quote}"</p>
                    </div>
                    <div className="mt-6 flex items-center gap-x-4">
                        {testimonialImage && (
                        <Image
                            src={testimonialImage.imageUrl}
                            alt={testimonialImage.description}
                            data-ai-hint={testimonialImage.imageHint}
                            width={40}
                            height={40}
                            className="rounded-full bg-muted"
                        />
                        )}
                        <div>
                        <div className="font-semibold text-foreground">{testimonial.author}</div>
                        <div className="text-muted-foreground">{testimonial.role}</div>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
        </div>
      </div>


      {/* You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 sm:pt-24">
            <div className="border-t pt-12">
                <h2 className="text-center font-headline text-3xl font-bold tracking-tight">You May Also Like</h2>
                 <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
