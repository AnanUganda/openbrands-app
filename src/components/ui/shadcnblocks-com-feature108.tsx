import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc?: string;
  imageAlt?: string;
  mockup?: React.ReactNode;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

export const Feature108 = ({
  badge = "Core Services",
  heading = "Precision Systems Built to Convert",
  description = "A suite of structured marketing assets engineered to generate highly qualified inquiries.",
  tabs = [],
}: Feature108Props) => {
  if (tabs.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden z-10 border-b border-gray-100">
      {/* Subtle corner glows */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <Badge variant="outline" className="px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-600 border-cyan-200 bg-cyan-50/30">
            {badge}
          </Badge>
          <h2 className="max-w-2xl text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
            {heading}
          </h2>
          <p className="text-gray-500 max-w-xl text-lg font-medium">
            {description}
          </p>
        </div>

        {/* Radix Tabs */}
        <Tabs.Root defaultValue={tabs[0].value} className="mt-8 w-full">
          
          {/* Spaced-Out Transparent Tabs Navigation Triggers List matching reference image exactly */}
          <Tabs.List className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-8 mb-16 w-full">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 border border-transparent text-gray-400 hover:text-[#1A1A1A] cursor-pointer select-none data-[state=active]:bg-gray-100 data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-sm data-[state=active]:border-gray-200/10 data-[state=active]:scale-102"
              >
                {tab.icon} 
                <span>{tab.label}</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Details Content Panel Container with Light Gray Card styling */}
          <div className="mx-auto max-w-screen-xl rounded-[2.5rem] bg-[#F8F9FA] border border-gray-200/60 p-8 lg:p-16 shadow-xl shadow-gray-200/20">
            {tabs.map((tab) => (
              <Tabs.Content
                key={tab.value}
                value={tab.value}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center focus:outline-none outline-none"
              >
                
                {/* Left Side: Content Copy */}
                <div className="flex flex-col gap-6">
                  <Badge variant="outline" className="w-fit px-3 py-1 bg-white border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px] rounded-full">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.05]">
                    {tab.content.title}
                  </h3>
                  <p className="text-gray-500 lg:text-lg leading-relaxed font-medium">
                    {tab.content.description}
                  </p>
                  <Button className="mt-4 w-fit gap-2 bg-[#1A1A1A] hover:bg-cyan-500 hover:text-white px-6 py-5 rounded-xl font-extrabold text-sm transition-all duration-300 shadow-sm" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>

                {/* Right Side: Mockup or Centered Image with Gray Backing Container Box */}
                <div className="w-full bg-[#EAEBEF]/55 border border-gray-200/40 rounded-[2rem] p-6 sm:p-10 flex items-center justify-center aspect-[4/3] overflow-hidden shadow-inner relative group">
                  {tab.content.mockup ? (
                    <div className="w-full h-full flex items-center justify-center transform group-hover:scale-102 transition-transform duration-500">
                      {tab.content.mockup}
                    </div>
                  ) : (
                    tab.content.imageSrc && (
                      <div className="w-full h-full flex items-center justify-center transform group-hover:scale-102 transition-transform duration-500">
                        <img
                          src={tab.content.imageSrc}
                          alt={tab.content.imageAlt || "showcase"}
                          className="rounded-2xl border border-gray-200 shadow-lg max-w-[90%] max-h-[90%] object-contain bg-white p-3 sm:p-4"
                        />
                      </div>
                    )
                  )}
                </div>

              </Tabs.Content>
            ))}
          </div>

        </Tabs.Root>

      </div>
    </section>
  );
};
