"use client";

import React from "react";

export default function GooglePreferredSourceBadge() {
  return (
    <a
      href="https://www.google.com/preferences/source?q=vaphers.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5 sm:gap-1 p-3.5 sm:p-4 bg-white border border-gray-300 rounded-[20px] shadow-xs hover:shadow-md hover:border-gray-400 transition-all duration-200 cursor-pointer no-underline select-none"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
      ` }} />

      {/* Google Logo */}
      <img
        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765277333/Google_LOGO_kybgvd.png"
        alt="Google Logo"
        className="w-10 h-10 sm:w-16 sm:h-16 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
      />

      {/* Text Label */}
      <p className="text-xs sm:text-sm font-medium text-gray-800 leading-snug tracking-tight">
        Add{" "}
        <span 
          className=" text-sm sm:text-lg inline-block align-baseline"
          style={{ fontFamily: '"Bungee Shade", cursive' }}
        >
          V<span className="text-blue-700">aphers</span>
        </span>{" "}
        as a preferred source on Google
      </p>
    </a>
  );
}
