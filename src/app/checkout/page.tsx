'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, Lock, Loader2, CheckCircle, CreditCard, Landmark } from 'lucide-react';
import { Icons } from '@/components/icons';
import { useCurrency } from '@/contexts/currency-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import React from 'react';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export default function CheckoutPage() {
  const { state } = useCart();
  const { formatPrice, currency } = useCurrency();
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Rough shipping cost, assuming $15 USD is the base
  const shipping = subtotal > 0 ? (currency === 'INR' ? 15 * 83 : 15) : 0;
  const total = subtotal + shipping;
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [paymentStep, setPaymentStep] = React.useState<'options' | 'loading' | 'success'>('options');
  
  const handlePaymentSubmit = () => {
    setIsModalOpen(true);
    setPaymentStep('options');
  };
  
  const handlePaymentMethodSelection = () => {
    setPaymentStep('loading');
    setTimeout(() => {
      setPaymentStep('success');
    }, 2000); // Simulate transaction time
  };

  const UpiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M4 4h16v1h-8v1h8v1h-8v1h8v1h-8v1h8v1h-8v1h8v1h-8v1h8v1h-8v1h8V4z"/>
      <path d="M4 14h1v6h-1zM6 14h1v6h-1zM8 14h1v6h-1zM10 14h1v6h-1zM12 14h1v6h-1zM14 14h1v6h-1zM16 14h1v6h-1zM18 14h1v6h-1zM20 14h1v6h-1z"/>
    </svg>
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row">
          <main className="w-full pb-12 pt-8 lg:w-1/2 lg:pr-12 lg:pt-16">
            <header className="flex items-center justify-start pb-8">
               <Link href="/" className="flex items-center space-x-2">
                <Icons.logo className="h-8 w-8 text-primary" />
                <span className="font-headline text-2xl font-bold">Auria by TFG</span>
            </Link>
            </header>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary">Cart</Link>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm font-medium text-foreground">Shipping</span>
               <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm text-muted-foreground">Payment</span>
            </div>
            <div className="mt-8 space-y-8">
              <div>
                <h2 className="pb-2 text-lg font-bold">Contact Information</h2>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" />
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Shipping address</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="First name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Last name" />
                    </div>
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Street address" />
                  </div>
                   <div className="grid gap-2">
                     <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" placeholder="Apartment, suite, etc." />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                     <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="State" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="ZIP code" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
              <Link href="/cart" className="group flex items-center gap-2 font-semibold text-primary transition-opacity hover:opacity-80">
                <ArrowLeft className="h-4 w-4" />
                <span>Return to cart</span>
              </Link>
              <Button size="lg" className="w-full sm:w-auto" onClick={handlePaymentSubmit}>Continue to Payment</Button>
            </div>
          </main>
          <aside className="w-full border-b py-8 lg:w-1/2 lg:border-b-0 lg:border-l lg:py-16 lg:pl-12">
            <div className="sticky top-24">
              <h2 className="mb-6 text-xl font-bold">Order summary</h2>
              <ul role="list" className="divide-y">
                {state.items.map(item => {
                    const image = getImage(item.images[0].id);
                    return (
                        <li key={item.id} className="flex py-4">
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border">
                               {image && <Image src={image.imageUrl} alt={item.name} fill className="object-cover" />}
                               <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-sm font-medium">{item.quantity}</span>
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">{item.material}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
              </ul>
              <div className="mt-8 space-y-4 border-t pt-6">
                <div className="flex items-center gap-4">
                  <Input placeholder="Discount code" />
                  <Button variant="secondary">Apply</Button>
                </div>
                <div className="flex justify-between text-base text-muted-foreground">
                  <p>Subtotal</p>
                  <p>{formatPrice(subtotal)}</p>
                </div>
                <div className="flex justify-between text-base text-muted-foreground">
                  <p>Shipping</p>
                  <p>{formatPrice(shipping)}</p>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>{formatPrice(total)}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {paymentStep === 'options' && 'Select Payment Method'}
              {paymentStep === 'loading' && 'Processing Payment'}
              {paymentStep === 'success' && 'Payment Successful'}
            </DialogTitle>
            <DialogDescription>
               {paymentStep === 'options' && 'Choose your preferred way to pay.'}
               {paymentStep === 'loading' && 'Please wait while we process your transaction...'}
               {paymentStep === 'success' && 'Thank you for your purchase!'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {paymentStep === 'options' && (
              <div className="space-y-4">
                <Button className="w-full justify-start gap-4" size="lg" variant="outline" onClick={handlePaymentMethodSelection}>
                  <CreditCard /> Credit Card
                </Button>
                <Button className="w-full justify-start gap-4" size="lg" variant="outline" onClick={handlePaymentMethodSelection}>
                  <Landmark /> Debit Card
                </Button>
                <Button className="w-full justify-start gap-4" size="lg" variant="outline" onClick={handlePaymentMethodSelection}>
                  <UpiIcon /> UPI
                </Button>
              </div>
            )}
            {paymentStep === 'loading' && (
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
              </div>
            )}
            {paymentStep === 'success' && (
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
                 <Button asChild onClick={() => setIsModalOpen(false)}><Link href="/collections/all">Continue Shopping</Link></Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <footer className="mt-12 w-full border-t bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-8">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Refund Policy</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Shipping Policy</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            </div>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <p>Secure Checkout</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
