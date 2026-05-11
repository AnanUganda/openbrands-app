import React from 'react';
import { Helmet } from 'react-helmet-async';
import EtherealBeamsHero from '@/components/ui/ethereal-beams-hero';
import { ProblemSection } from '@/components/problem-section';
import { SolutionSection } from '@/components/solution-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { ProcessSection } from '@/components/process-section';
import { OfferSection } from '@/components/offer-section';
import { DreamOutcomeSection } from '@/components/dream-outcome-section';
import { FaqSection } from '@/components/faq-section';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Open Brands | Results-Driven B2B Marketing Agency</title>
        <meta name="description" content="We build structured, done-for-you lead generation systems that drive real growth for B2B service businesses and high-ticket offers." />
      </Helmet>
      <EtherealBeamsHero />
      <ProblemSection />
      <SolutionSection />
      <TestimonialsSection />
      <ImageAutoSlider />
      <OfferSection />
      <DreamOutcomeSection />
      <ProcessSection />
      <FaqSection />
    </>
  );
}
