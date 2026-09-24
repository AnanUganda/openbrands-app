import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";

export function About() {
  return (
    <div className="relative w-full min-h-screen bg-[#FBFBFB] text-[#0D0D0D] flex-1 border-t border-gray-200/80">
      <Helmet>
        <title>About me | Twijjukye Anan • Open Brands</title>
        <meta
          name="description"
          content="About Twijjukye Anan, founder and lead designer at Open Brands. Building high-converting, considered websites for service businesses."
        />
      </Helmet>

      {/* Texture Background with 70% opacity */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
        style={{
          backgroundImage: "url('/texture.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "800px auto",
        }}
      />

      {/* Visible Glassmorphic Blur at Viewport Bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 h-24 sm:h-28 pointer-events-none z-30 backdrop-blur-xl bg-white/20"
        style={{
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 45%, transparent 100%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80 pt-20 md:pt-28 pb-32 md:pb-44">
        
        {/* Hero Section: Plain and clean 'About me' with extra padding */}
        <div className="text-center flex flex-col items-center pt-4 pb-16 md:pb-24 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D0D0D] tracking-tight">
            About me
          </h1>
        </div>

        {/* 50/50 Layout: Left Content Scrolls / Right Sticky Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Exactly the provided text, clean and unembellished */}
          <div className="order-2 lg:order-1 flex flex-col space-y-10 text-gray-700 text-base sm:text-[18px] leading-[1.8] font-normal pb-16">
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D0D0D] leading-tight tracking-tight">
              I came for the design. I stayed for what happened after launch.
            </h2>

            <p>
              Five years ago I started building websites because I liked making things beautiful. That's the honest version — I was curious about design, about type and layout and the difference between a page that feels considered and one that feels assembled.
            </p>

            <p>
              What kept me here was something I didn't expect.
            </p>

            <p>
              I started paying attention to what happened after a site went live. A business that had been explaining itself badly for years suddenly had words that landed. Enquiries that used to take three emails took one form. Owners who'd quietly avoided mentioning their website started sending people to it. The design was the part I enjoyed. What it did for the business was the part that mattered.
            </p>

            <p>
              About twenty projects later, that's still what I'm after.
            </p>

            <div className="pt-4 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight">
                What I actually do
              </h3>

              <p>
                I build websites for service businesses — the kind where someone has to trust you before they'll call you. Contractors, cafés, clinics, consultants, firms selling something considered rather than impulsive.
              </p>

              <p>
                That work is less about decoration than people assume. Most of it is figuring out what a business is genuinely good at, saying it in language a stranger understands, and then building something that guides that stranger toward getting in touch. The visual craft matters — but it's in service of the thing, not the point of it.
              </p>
            </div>

            <div className="pt-4 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight">
                How I work
              </h3>

              <p>
                One project at a time, with the owner, not a committee. You'll talk to me throughout — I'm the one designing it and I'm the one building it.
              </p>

              <p>
                I ask a lot of questions at the start. What your best clients have in common, which objection comes up on every call, what you wish people understood before they reached out. Most of what makes a site work gets decided in that conversation, long before anything is designed.
              </p>

              <p>
                And I'd rather tell you a page isn't working than ship something we both quietly know is weak.
              </p>
            </div>

            <div className="pt-4 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight">
                Where I am
              </h3>

              <p>
                I'm based in Kampala, Uganda, and I work with clients here and abroad — recent projects have been for businesses across the United States. Everything runs over video calls, shared previews and regular written updates, which in practice means you see the work as it develops instead of waiting for a reveal.
              </p>
            </div>

            <div className="pt-4 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight">
                The part I don't take for granted
              </h3>

              <p>
                People hand me something they've built their livelihood on and trust me to represent it. That still doesn't feel routine. It's the reason I'd rather take on fewer projects and finish each one properly than run a queue.
              </p>

              <p className="font-medium text-[#0D0D0D] pt-2">
                If that's the kind of working relationship you're after, I'd like to hear what you're building
              </p>

              <div className="pt-4">
                <ButtonWithIcon to="/contact" variant="lime" size="lg">
                  Let's Collaborate
                </ButtonWithIcon>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 50% width, Sticky to the upper viewport with padding */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start w-full h-fit">
            <div className="bg-white border border-gray-200/90 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col">
              
              {/* Profile Image Frame */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] max-h-[500px] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/60 shadow-inner">
                <img
                  src="/anan.jpeg"
                  alt="Twijjukye Anan - Founder & Lead Designer at Open Brands"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>

              {/* Founder Details & Call to Action */}
              <div className="pt-5 pb-1 px-1 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-[#0D0D0D] tracking-tight">
                    Twijjukye Anan
                  </h3>
                  <span className="text-xs font-bold text-[#70c910] bg-[#BFF549]/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Founder
                  </span>
                </div>

                <p className="text-sm font-semibold text-gray-500 mb-5">
                  Web Designer, Strategist & Developer
                </p>

                {/* Direct Call to Action */}
                <div className="pt-1">
                  <ButtonWithIcon
                    to="/contact"
                    variant="lime"
                    size="lg"
                    className="w-full justify-center"
                  >
                    Book a Strategy Call
                  </ButtonWithIcon>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default About;
