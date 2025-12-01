import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { categories, products, testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProductCard } from '@/components/product-card';
import { InstagramFeed } from '@/components/instagram-feed';
import type { Category, Testimonial } from '@/lib/types';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export default function Home() {
  const heroImage = getImage('hero-1');
  const storyImage = getImage('story-craftsman');
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Timeless Elegance, Redefined
          </h1>
          <p className="mt-4 max-w-xl text-lg">
            Discover our new collection of handcrafted fine jewelry, designed to be cherished for a lifetime.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/collections/all">Shop The Collection</Link>
          </Button>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 sm:py-24">
        <div className="container">
          <h2 className="text-center font-headline text-3xl font-bold tracking-tight">Shop by Category</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category: Category) => {
              const categoryImage = getImage(category.image.id);
              return (
                <Link href={`/collections/${category.name.toLowerCase()}`} key={category.id} className="group relative">
                  <div className="relative aspect-w-4 aspect-h-5 w-full overflow-hidden rounded-lg">
                    {categoryImage && (
                      <Image
                        src={categoryImage.imageUrl}
                        alt={categoryImage.description}
                        data-ai-hint={categoryImage.imageHint}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-headline text-2xl font-bold text-white">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container">
          <h2 className="text-center font-headline text-3xl font-bold tracking-tight">New Arrivals</h2>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
              {storyImage && (
                <Image
                  src={storyImage.imageUrl}
                  alt={storyImage.description}
                  data-ai-hint={storyImage.imageHint}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="max-w-xl">
              <p className="font-body text-sm font-bold uppercase tracking-wide text-primary">Our Story</p>
              <h2 className="mt-4 font-headline text-4xl font-extrabold tracking-tight">Crafted With Passion</h2>
              <p className="mt-4 text-muted-foreground">
                At Auria by TFG, we believe that jewelry is more than an accessory—it's an expression of art and a marker of life's precious moments. Each piece is meticulously designed and handcrafted by our master jewelers, using ethically sourced materials and time-honored techniques to create heirlooms for generations to come.
              </p>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container">
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
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

    </div>
  );
}
