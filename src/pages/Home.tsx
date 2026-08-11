import React from 'react';
import { Helmet } from 'react-helmet-async';
import SplitHero from '@/components/ui/split-hero';
import { ProblemSection } from '@/components/problem-section';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { TransformationSection } from '@/components/transformation-section';
import { ProcessSection } from '@/components/process-section';
import { BenefitsSection } from '@/components/benefits-section';
import { PositioningSection } from '@/components/positioning-section';
import { WhoWeServeSection } from '@/components/who-we-serve-section';
import { CapabilitiesSection } from '@/components/capabilities-section';
import { ServicesSection } from '@/components/services-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FaqSection } from '@/components/faq-section';
import { FinalCtaSection } from '@/components/final-cta-section';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Open Brands | Websites That Actually Bring You Clients</title>
        <meta name="description" content="High-converting websites + SEO systems designed to turn visitors into paying customers. Built for service businesses." />
      </Helmet>
      <SplitHero />
      <ProblemSection />
      <ServicesSection />
      <TestimonialsSection />
      <ImageAutoSlider />
      <TransformationSection />
      <WhoWeServeSection />
      <CapabilitiesSection />
      <ProcessSection />
      <FaqSection />
    </>
  );
}
