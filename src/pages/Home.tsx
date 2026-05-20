import React from 'react';
import { Helmet } from 'react-helmet-async';
import SplitHero from '@/components/ui/split-hero';
import { ProblemSection } from '@/components/problem-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { ProcessSection } from '@/components/process-section';
import { OfferSection } from '@/components/offer-section';
import { DreamOutcomeSection } from '@/components/dream-outcome-section';
import { FaqSection } from '@/components/faq-section';
import { LogoTicker } from '@/components/logo-ticker';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Open Brands | Results-Driven B2B Marketing Agency</title>
        <meta name="description" content="We build structured, done-for-you lead generation systems that drive real growth for B2B service businesses and high-ticket offers." />
      </Helmet>
      <SplitHero />
      <LogoTicker />
      <ProblemSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ImageAutoSlider />
      <OfferSection />
      <DreamOutcomeSection />
      <ProcessSection />
      <FaqSection />
    </>
  );
}
