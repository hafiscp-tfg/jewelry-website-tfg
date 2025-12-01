'use server';
/**
 * @fileOverview AI-powered gift recommendation flow for the Auria jewellery store.
 *
 * - getGiftRecommendation - A function that takes occasion, recipient, and budget and returns a gift recommendation.
 * - GiftRecommendationInput - The input type for the getGiftRecommendation function.
 * - GiftRecommendationOutput - The return type for the getGiftRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GiftRecommendationInputSchema = z.object({
  occasion: z.string().describe('The occasion for the gift (e.g., birthday, anniversary, wedding).'),
  recipient: z.string().describe('The recipient of the gift (e.g., partner, friend, mother).'),
  budget: z.number().describe('The budget for the gift in USD.'),
});

export type GiftRecommendationInput = z.infer<typeof GiftRecommendationInputSchema>;

const GiftRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('A detailed gift recommendation including the name of the jewellery item and why it is suitable for the occasion, recipient and budget.'),
});

export type GiftRecommendationOutput = z.infer<typeof GiftRecommendationOutputSchema>;

export async function getGiftRecommendation(input: GiftRecommendationInput): Promise<GiftRecommendationOutput> {
  return giftRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'giftRecommendationPrompt',
  input: {schema: GiftRecommendationInputSchema},
  output: {schema: GiftRecommendationOutputSchema},
  prompt: `You are a personal shopping assistant for a luxury jewellery store.

  Based on the occasion, recipient, and budget provided, recommend a specific jewellery item from the store and explain why it is a suitable gift.

  Occasion: {{{occasion}}}
  Recipient: {{{recipient}}}
  Budget: ${{{budget}}} USD

  Ensure the recommendation aligns with the brand's image of timeless elegance and high-quality craftsmanship. Consider the persona needs.
`,
});

const giftRecommendationFlow = ai.defineFlow(
  {
    name: 'giftRecommendationFlow',
    inputSchema: GiftRecommendationInputSchema,
    outputSchema: GiftRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
