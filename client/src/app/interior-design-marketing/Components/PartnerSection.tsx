import React from 'react';

export default function InteriorDesignPartnerSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 sm:gap-10 lg:gap-16">
        <div>
          <h3 className="text-[32px] sm:text-4xl lg:text-5xl font-serif text-gray-900 leading-[1.2] sm:leading-tight mb-3 sm:mb-4 bungee-shade">
            Your trusted partner <br className="hidden sm:block" />
            in <span className="text-blue-700">design studio growth</span>
          </h3>
          <p className="text-lg sm:text-xl text-gray-800 mb-5 sm:mb-6">
            Elevate your brand presence, attract high-end clients.
          </p>
          <hr className="border-gray-300 mb-6 sm:mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            <div className="flex flex-col">
              <p className="text-[15px] sm:text-base text-gray-800 mb-4 sm:mb-6 font-medium leading-relaxed">
                Caring for your studio's growth like our own, building a stronger foundation through effective <span className="font-bold">interior design marketing</span>.
              </p>
              <div className="mt-auto">
                <img
                  src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop"
                  alt="Interior designer reviewing material samples"
                  className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-sm"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center md:border-l md:border-gray-200 p-2 sm:p-6 mt-4 md:mt-0">
              <div className="flex items-center justify-center space-x-1 text-5xl sm:text-6xl font-serif text-[#2b301f] mb-3 sm:mb-4">
                <span>300</span>
                <span className="relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full text-2xl sm:text-3xl font-serif italic text-center">
                  %
                </span>
              </div>
              <p className="text-[13px] sm:text-sm text-gray-800 font-medium">
                Average boost in targeted <br className="hidden sm:block" />
                portfolio traffic within 6 months.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 lg:mt-0">
          <p className="text-[15px] sm:text-base text-gray-800 mb-4 sm:mb-6 font-medium leading-relaxed">
            Aesthetic-focused marketing strategies tailored to your firm, specializing in visually-driven platforms and <span className="font-bold">brand positioning</span>.
          </p>
          <div className="mt-auto h-full w-full">
             <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
              alt="Beautifully designed modern interior space"
              className="w-full h-full min-h-[200px] sm:min-h-[300px] object-cover rounded-xl sm:rounded-2xl shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
