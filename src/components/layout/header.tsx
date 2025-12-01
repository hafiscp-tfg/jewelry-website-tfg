'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingBag, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { SearchDialog } from '@/components/search-dialog';
import { CartSheet } from '@/components/cart-sheet';
import { useCurrency } from '@/contexts/currency-context';

const navLinks = [
  { href: '/collections/all', label: 'Collections' },
  { href: '/collections/new-arrivals', label: 'New Arrivals' },
  { href: '/gift-finder', label: 'Gift Finder' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const { currency, setCurrency } = useCurrency();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="hidden font-headline text-lg font-bold sm:inline-block">
              Auria by TFG
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Navigation"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="flex h-full flex-col py-6">
                <Link href="/" className="mb-8 flex items-center space-x-2">
                  <Icons.logo className="h-6 w-6 text-primary" />
                  <span className="font-headline text-lg font-bold">Auria by TFG</span>
                </Link>
                <nav className="flex flex-col items-start space-y-4 text-lg font-medium">
                  {navLinks.map(({ href, label }) => (
                    <SheetClose asChild key={label}>
                      <Link
                        href={href}
                        className="transition-colors hover:text-primary"
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Mobile Title */}
        <div className="flex flex-1 justify-center md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold">Auria by TFG</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-1">
          <SearchDialog />
          
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Select Currency">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Currency</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={currency} onValueChange={(value) => setCurrency(value as 'USD' | 'INR')}>
                <DropdownMenuRadioItem value="USD">USD</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="INR">INR</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/login">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup">Create Account</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Account</DropdownMenuItem>
              <DropdownMenuItem>My Wishlist</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <CartSheet />
        </div>
      </div>
    </header>
  );
}
