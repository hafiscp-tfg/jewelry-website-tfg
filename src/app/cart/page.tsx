'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCurrency } from '@/contexts/currency-context';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export default function CartPage() {
  const { state, removeFromCart, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="font-headline text-4xl font-black tracking-tight">My Bag</h1>
          <p className="text-muted-foreground">You have {state.items.length} items in your bag.</p>
        </div>

        {state.items.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <div className="flex flex-col divide-y">
                {state.items.map(item => {
                  const image = getImage(item.images[0].id);
                  return (
                    <div key={item.id} className="flex items-center justify-between gap-4 py-6">
                      <div className="flex flex-1 items-start gap-5">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-center gap-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.material}, {item.style}</p>
                            </div>
                            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded-full border">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                            <Button variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                              <Trash2 className="mr-1 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
               <Link href="/collections/all" className="group flex items-center gap-2 text-sm font-bold text-primary">
                <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
                <span className="group-hover:underline">Continue Shopping</span>
              </Link>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-4 border-b pb-4 text-lg font-bold">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="text-center text-xs text-muted-foreground">
                    Shipping & taxes calculated at checkout.
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button asChild size="lg" className="w-full">
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <p className="text-xs text-muted-foreground">We accept:</p>
                    {/* Add payment icons here if available or needed */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link href="/collections/all">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
