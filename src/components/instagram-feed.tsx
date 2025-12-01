import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const instagramImages = [
  'insta-1', 'insta-2', 'insta-3', 'insta-4', 'insta-5', 'insta-6'
];

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export function InstagramFeed() {
  const images = instagramImages.map(getImage).filter(Boolean);

  return (
    <section className="py-16 sm:py-24">
      <div className="container text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight">Follow Our Story</h2>
        <p className="mt-2 text-lg text-primary">@think_forge_global</p>
        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {images.map((image) => image && (
            <Link href="#" key={image.id} className="group relative block overflow-hidden">
              <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                width={300}
                height={300}
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
