import React from 'react';

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
          animation: scroll-up 60s linear infinite;
        }
        
        .infinite-scroll-down {
          animation: scroll-down 60s linear infinite;
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
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
        }

        .port-image:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }
      `}</style>
      
      <section className="w-full bg-[#020202] relative flex flex-col items-center border-t border-white/5 z-20 pb-16">
        {/* Title Section placed above the showcase */}
        <div className="w-full text-center pt-24 md:pt-32 pb-12 shrink-0 relative z-30">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">Our Work</h2>
          <p className="text-lg md:text-xl text-zinc-400 mt-4 font-medium">A glimpse into the results we drive</p>
        </div>

        {/* Scrolling images container */}
        <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden scroll-container-mask shrink-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/20 to-[#020202] z-0 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full h-[150%] px-4 md:px-8 lg:px-12 -mt-24">
            
            {/* Column 1 (Scrolls Up) */}
            <div className="flex flex-col gap-6 lg:gap-8 infinite-scroll-up">
              {dup1.map((image, index) => (
                <div
                  key={`c1-${index}`}
                  className="port-image w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
                >
                  <img
                    src={image}
                    alt={`Portfolio item ${(index % col1.length) + 1}`}
                    className="w-full h-full object-cover"
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
                  className="port-image w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
                >
                  <img
                    src={image}
                    alt={`Portfolio item ${(index % col2.length) + 1}`}
                    className="w-full h-full object-cover"
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
                  className="port-image w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
                >
                  <img
                    src={image}
                    alt={`Portfolio item ${(index % col3.length) + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
        
        {/* Gradients on top and bottom specifically to fade out the moving elements even more, moved inside the scrolling container relative wrapper */}
      </section>
    </>
  );
};
