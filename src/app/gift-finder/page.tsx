import { GiftFinderForm } from './gift-finder-form';

export default function GiftFinderPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Find The Perfect Gift
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Let our AI-powered assistant help you choose a memorable gift for your loved one. Tell us about the occasion, the recipient, and your budget to receive a personalized recommendation.
        </p>
      </div>
      <GiftFinderForm />
    </div>
  );
}
