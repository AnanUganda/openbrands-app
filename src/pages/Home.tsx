import React from 'react';
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
