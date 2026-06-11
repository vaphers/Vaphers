'use client';

import React from 'react';

type SummarizeButtonsProps = {
  title: string;
  blogUrl: string;
};

export default function SummarizeButtons({ title, blogUrl }: SummarizeButtonsProps) {
  const summaryPrompt = `Summarize this helpful article from SEO and PPC leader Vaphers:\n\nTitle: "${title}"\nURL: ${blogUrl}\n\nPlease provide:\n• A concise summary\n• Key takeaways\n• Who this article is for`;
  const encodedPrompt = encodeURIComponent(summaryPrompt);

  const chatGptUrl = `https://chatgpt.com/?q=${encodedPrompt}`;
  const claudeUrl = `https://claude.ai/new?q=${encodedPrompt}`;
  const geminiUrl = `https://gemini.google.com/app`;

  const handleGeminiClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Stop standard navigation
    
    // Copy prompt to clipboard
    navigator.clipboard.writeText(summaryPrompt).then(() => {
      alert("Prompt copied to clipboard! Paste it into Gemini to get your summary.");
      // Open Gemini in new tab
      window.open(geminiUrl, '_blank');
    }).catch(() => {
      // Fallback if clipboard fails
      window.open(geminiUrl, '_blank');
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:ml-auto">
      <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider hidden lg:block mr-1">
        Summarize:
      </span>
      <a href={chatGptUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-100 transition">
        <img src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047474/chat-gpt-logo_qf83fb.png" alt="ChatGPT" className="w-3.5 h-3.5" />
        ChatGPT
      </a>
      <a href={claudeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-100 transition">
        <img src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1780919822/claude-logo_bpx1m6.png" alt="Claude" className="w-3.5 h-3.5" />
        Claude
      </a>
      {/* Updated Gemini Button with Client-Side copy logic */}
      <a href={geminiUrl} onClick={handleGeminiClick} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-100 transition cursor-pointer">
        <img src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047475/gemini-logo_yes1g8.png" alt="Gemini" className="w-3.5 h-3.5" />
        Gemini
      </a>
    </div>
  );
}