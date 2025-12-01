'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCurrency } from '@/contexts/currency-context';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export function CartSheet() {
  const { state, removeFromCart, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Shopping Bag" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>My Bag ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
                <div className="flex flex-col gap-6 px-6 py-4">
                {state.items.map(item => {
                    const image = getImage(item.images[0].id);
                    return (
                    <div key={item.id} className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        {image && (
                             <Image
                                src={image.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                        )}
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <div className="flex justify-between">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.material}</p>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center rounded-full border">
                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            </ScrollArea>
            <SheetFooter className="border-t bg-background px-6 py-4">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <p className="text-center text-sm text-muted-foreground">Shipping & taxes calculated at checkout.</p>
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetClose>
                 <SheetClose asChild>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/cart">View Cart</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Your bag is empty</h3>
            <SheetClose asChild>
              <Button asChild>
                <Link href="/collections/all">Continue Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
