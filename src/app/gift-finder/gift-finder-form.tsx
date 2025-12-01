'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Gift, Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { getGiftRecommendation, type GiftRecommendationOutput } from '@/ai/flows/ai-gift-recommendations';

const giftFinderSchema = z.object({
  occasion: z.string().min(1, 'Please select an occasion.'),
  recipient: z.string().min(1, 'Please select a recipient.'),
  budget: z.array(z.number()).min(1).max(1),
});

const occasions = ['Anniversary', 'Birthday', 'Wedding', 'Graduation', 'Just Because'];
const recipients = ['Partner', 'Mother', 'Friend', 'Sister', 'Self'];

export function GiftFinderForm() {
  const [recommendation, setRecommendation] = useState<GiftRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof giftFinderSchema>>({
    resolver: zodResolver(giftFinderSchema),
    defaultValues: {
      occasion: '',
      recipient: '',
      budget: [1000],
    },
  });

  async function onSubmit(values: z.infer<typeof giftFinderSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const input = {
        occasion: values.occasion,
        recipient: values.recipient,
        budget: values.budget[0],
      };
      const result = await getGiftRecommendation(input);
      setRecommendation(result);
    } catch (e) {
      setError('Sorry, we couldn\'t generate a recommendation at this time. Please try again later.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-2xl">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Your Preferences</CardTitle>
              <CardDescription>Fill out the details below to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="occasion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occasion</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an occasion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {occasions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a recipient" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {recipients.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget: ${field.value[0]?.toLocaleString()}</FormLabel>
                    <FormControl>
                      <Slider
                        min={100}
                        max={5000}
                        step={50}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                     <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$100</span>
                        <span>$5,000</span>
                      </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Find My Gift
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
         <Card className="mt-8 text-center">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Loader2 className="h-6 w-6 animate-spin text-primary"/>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Our AI is searching for the perfect gift...</p>
            </CardContent>
         </Card>
      )}

      {error && (
        <Card className="mt-8 border-destructive">
             <CardHeader>
                <CardTitle className="text-destructive">An Error Occurred</CardTitle>
            </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {recommendation && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Gift className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Your AI-Powered Recommendation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-foreground">{recommendation.recommendation}</p>
          </CardContent>
           <CardFooter>
            <Button asChild className="w-full">
              <a href="/collections/all">Shop Now</a>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
