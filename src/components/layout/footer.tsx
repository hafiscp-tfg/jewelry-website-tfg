import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-secondary">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-2">
                <Icons.logo className="h-7 w-7 text-primary" />
                <span className="font-headline text-xl font-bold">Auria by TFG</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Timeless elegance, ethically sourced and masterfully crafted for life's most precious moments.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-headline text-sm font-semibold leading-6 text-foreground">Customer Service</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Track Order</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="font-headline text-sm font-semibold leading-6 text-foreground">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Our Craftsmanship</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Press</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 sm:mt-0">
                <h3 className="font-headline text-sm font-semibold leading-6 text-foreground">Join The Inner Circle</h3>
                <p className="mt-4 text-sm text-muted-foreground">Receive exclusive offers, new collection previews, and more.</p>
                <form className="mt-6 flex max-w-md gap-x-4">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <Input type="email" name="email" id="email-address" autoComplete="email" placeholder="Enter your email" required className="min-w-0 flex-auto bg-background" />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-muted-foreground">&copy; {new Date().getFullYear()} Auria by TFG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
