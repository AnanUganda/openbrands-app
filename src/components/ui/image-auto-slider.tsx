import { SectionLabel } from './section-label';

export const ImageAutoSlider = () => {
  // Images for the infinite scroll - using the local portfolio folder
  const images = [
    "/portfolio/Dreamweaver%20display%202.png",
    "/portfolio/lifecall%20display%202.png",
    "/portfolio/pot%20dis%201.png",
    "/portfolio/Pro%20coach.png",
    "/portfolio/procoach%201.png",
    "/portfolio/reiff%203.png",
    "/portfolio/Shed%20in%20a%20natural%20environment%201.png",
    "/portfolio/Sowers%20Harvest-1.png",
    "/portfolio/Sowers%20Harvest-2.png",
    "/portfolio/Sowers%20Harvest.png",
    "/portfolio/The%20coach%203.png",
    "/portfolio/Torify%20Case%202.png",
    "/portfolio/Torify%20display%203.png",
    "/portfolio/Torify%20website.png",
    "/portfolio/Urban%20Sheds.png",
    "/portfolio/urban-mock.png",
    "/portfolio/URban.png",
    "/portfolio/willowhill%20D.png"
  ];

  // Distribute into 3 columns
  const col1 = [...images.slice(0, 6)];
  const col2 = [...images.slice(6, 12)];
  const col3 = [...images.slice(12, 18)];

  // Triplicate the columns to ensure seamless infinite scroll (since translate is -33.33%)
  const dup1 = [...col1, ...col1, ...col1];
  const dup2 = [...col2, ...col2, ...col2];
  const dup3 = [...col3, ...col3, ...col3];

  return (
    <>
      <style>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333333%);
          }
        }
        
        @keyframes scroll-down {
          0% {
            transform: translateY(-33.333333%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .infinite-scroll-up {
          animation: scroll-up 120s linear infinite;
        }
        
        .infinite-scroll-down {
          animation: scroll-down 120s linear infinite;
        }

        .scroll-container-mask {
          mask: linear-gradient(
            180deg,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            180deg,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }

        .port-image {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease, border-color 0.6s ease;
        }

        .port-image:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
          border-color: rgba(191,245,73,0.4);
        }
      `}</style>
      
      <section className="w-full bg-[#0D0D0D] relative flex flex-col items-center border-t border-white/[0.08] z-20 pb-16">
        {/* Structural Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" style={{
            backgroundSize: '100px 100px',
            backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        }} />

        {/* Title Section placed above the showcase */}
        <div className="max-w-[1400px] w-full px-4 md:px-8 lg:px-12 text-center pt-24 md:pt-32 pb-12 shrink-0 relative z-30">
          <SectionLabel label="Our Portfolio" dark={true} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg max-w-3xl mx-auto text-balance">
            Modern Service Websites, Built to Convert
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mt-4 font-medium max-w-xl mx-auto text-balance">
            Selected projects focused on trust, conversion, and long-term scalability.
          </p>
        </div>

        {/* Scrolling images container */}
        <div className="relative max-w-[1400px] mx-auto w-full h-[600px] md:h-[800px] overflow-hidden scroll-container-mask shrink-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D] z-10 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full h-[150%] px-4 md:px-8 lg:px-12 -mt-24">
            
            {/* Column 1 (Scrolls Up) */}
            <div className="flex flex-col gap-6 lg:gap-8 infinite-scroll-up">
              {dup1.map((image, index) => (
                <div
                  key={`c1-${index}`}
                  className="port-image w-full rounded-sm overflow-hidden shadow-sm bg-[#161616] border border-white/[0.08] aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
                >
                  <img
                    src={image}
                    alt={`Portfolio item ${(index % col1.length) + 1}`}
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Column 2 (Scrolls Down) */}
            <div className="hidden md:flex flex-col gap-6 lg:gap-8 infinite-scroll-down">
              {dup2.map((image, index) => (
                <div
                  key={`c2-${index}`}
                  className="port-image w-full rounded-sm overflow-hidden shadow-sm bg-[#161616] border border-white/[0.08] aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
                >
                  <img
                    src={image}
                    alt={`Portfolio item ${(index % col2.length) + 1}`}
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Column 3 (Scrolls Up) */}
            <div className="hidden md:flex flex-col gap-6 lg:gap-8 infinite-scroll-up">
              {dup3.map((image, index) => (
                <div
                  key={`c3-${index}`}
                  className="port-image w-full rounded-sm overflow-hidden shadow-sm bg-[#161616] border border-white/[0.08] aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
                >
                  <img
                    src={image}
                    alt={`Portfolio item ${(index % col3.length) + 1}`}
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
