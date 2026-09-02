import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="relative mx-auto mb-10 flex max-w-full flex-col items-center justify-center bg-gradient-to-b from-blue-500  via-blue-600 to-blue-800 lg:-mt-28 lg:pt-38 lg:mx-4 lg:rounded-[40px]">
      <div className="mt-5"></div>

      {/* Top pill */}
      <div className="border border-blue-700 p-1 w-fit mx-auto rounded-full flex items-center justify-between mb-7">
        <span className="font-inter text-base font-medium text-white ml-3 mr-2">
          Explore how to use for brands.
        </span>
        <Link
          href="/about-us"
          className="w-8 h-8 rounded-full flex justify-center items-center bg-blue-700"
          aria-label="Learn more about Vaphers"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="px-4 pb-30 flex flex-col items-center">
        {/* Heading */}
        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-4xl font-bold text-slate-200 md:text-4xl lg:text-[80px] dark:text-slate-300 bungee-inline-regular">
          Marketing for Interior Designers
        </h1>

        {/* Paragraph */}
        <p className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-white dark:text-neutral-400">
          Grow your interior design business with data-driven marketing strategies designed to increase visibility, attract qualified clients, and turn more searches into measurable leads and revenue.        </p>  

        {/* Buttons */}
        <div className="relative z-10 mt-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full">
          <Link href="/seo-services" className="w-60">
            <button className="w-full rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-500 cursor-pointer">
              Not Sure Where to Start?
            </button>
          </Link>
          <Link href="/contact" className="w-60">
            <button className="w-full rounded-lg border border-blue-600 bg-white px-6 py-2.5 font-medium text-blue-700 transition-colors hover:bg-gray-50 cursor-pointer">
              Get a Proposal
            </button>
          </Link>
        </div>

        {/* LCP Image (NO animation) */}
        {/* <div className="relative z-10 mt-20 w-full max-w-6xl rounded-3xl border border-neutral-300 bg-neutral-200 p-2 md:p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <Image
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_1200/v1761213572/hero_landing_rhywrd.jpg"
              alt="Landing page preview"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
              className="object-cover"
              quality={80}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Hero;
