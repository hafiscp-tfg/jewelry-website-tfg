
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Diamond, Gem, Award } from 'lucide-react';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

const values = [
  {
    icon: Diamond,
    title: 'Uncompromising Quality',
    description: 'We use only the finest materials, from ethically sourced gemstones to recycled precious metals, ensuring exceptional quality and brilliance.',
  },
  {
    icon: Gem,
    title: 'Ethical Sourcing',
    description: 'Our commitment to sustainability means every material is responsibly sourced, honoring both the planet and its people.',
  },
  {
    icon: Award,
    title: 'Designed for a Lifetime',
    description: 'Timeless design and meticulous craftsmanship result in heirloom-quality pieces meant to be passed down through generations.',
  },
];

const team = [
  {
    name: 'Elara Vance',
    role: 'Founder & Chief Designer',
    quote: '"Jewelry is silent poetry; it tells a story without a single word."',
    image: getImage('about-founder'),
  },
  {
    name: 'Julian Reyes',
    role: 'Master Goldsmith',
    quote: '"The metal has its own spirit. My job is to listen and bring it to life."',
    image: getImage('about-goldsmith'),
  },
  {
    name: 'Sofia Chen',
    role: 'Head of Gemology',
    quote: '"Every stone has a universe within it. I find the brightest stars."',
    image: getImage('about-gemologist'),
  },
];

export default function AboutPage() {
  const heroImage = getImage('about-hero');

  return (
    <div className="container py-12 sm:py-16">
      {/* Hero Section */}
      <section className="relative flex min-h-[480px] w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-cover bg-center p-4 text-center">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-4 text-white">
          <h1 className="font-headline text-4xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl">
            Our Story of Artistry & Passion.
          </h1>
          <p className="max-w-2xl text-base font-normal leading-normal text-white/90 sm:text-lg">
            Discover the legacy and craftsmanship behind every Auria by TFG jewelry.
          </p>
        </div>
        <Button asChild size="lg" className="relative z-10">
          <Link href="/collections/all">Discover Our Craft</Link>
        </Button>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <h2 className="font-headline text-3xl font-bold leading-tight tracking-tight">From a Dream to a Legacy</h2>
          <p className="text-base font-normal leading-relaxed text-muted-foreground">
            Founded in 1985 by visionary designer Elara Vance, Auria by TFG began in a small, sunlit studio with a simple mission: to create pieces that were not just accessories, but heirlooms. This narrative about the brand's origins, inspiration, and evolution over time is a testament to our dedication to timeless beauty.
          </p>
          <p className="text-base font-normal leading-relaxed text-muted-foreground">
            Each design draws from the raw beauty of nature and the clean lines of modern architecture, creating a unique harmony that has defined our signature style for decades.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="flex flex-col items-center gap-8 rounded-xl bg-secondary p-8 lg:p-16">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="font-headline text-3xl font-bold leading-tight tracking-tight">The Values That Guide Us</h2>
          <p className="max-w-2xl text-base text-muted-foreground">Our philosophy is built on a foundation of principles that ensure every piece is worthy of being cherished for generations.</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-center gap-4 rounded-xl border bg-background p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="flex flex-col items-center gap-8 py-16 lg:py-24">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="font-headline text-3xl font-bold leading-tight tracking-tight">The Hands Behind the Art</h2>
          <p className="max-w-2xl text-base text-muted-foreground">Meet the artisans and visionaries who pour their passion and expertise into every Auria by TFG creation.</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                {member.image && (
                    <Image
                        src={member.image.imageUrl}
                        alt={member.image.description}
                        data-ai-hint={member.image.imageHint}
                        fill
                        className="object-cover"
                    />
                )}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground italic">"{member.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center gap-4 rounded-xl bg-secondary p-10 text-center">
        <h2 className="font-headline text-2xl font-bold sm:text-3xl">Experience the Craftsmanship</h2>
        <p className="max-w-xl text-base text-muted-foreground">Each piece in our collection is a labor of love, waiting to become a part of your story.</p>
        <Button asChild size="lg" className="mt-2">
            <Link href="/collections/all">Explore the Collection</Link>
        </Button>
      </section>
    </div>
  );
}
