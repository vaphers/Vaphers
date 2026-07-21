"use client";

import { useState } from "react";

export default function BlogLeadForm() {
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [renderTime] = useState<number>(() => Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get("botcheck") || formData.get("_hp");
    if (honeypot && String(honeypot).trim() !== "") {
      setSuccess(true);
      setWebsite("");
      setLoading(false);
      return;
    }

    const trimmedWebsite = website.trim();

    // Auto add https:// if missing
    const formattedWebsite =
      trimmedWebsite.startsWith("http://") ||
      trimmedWebsite.startsWith("https://")
        ? trimmedWebsite
        : `https://${trimmedWebsite}`;

    try {
      const response = await fetch("/api/blogs/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website: formattedWebsite,
          blogTitle: typeof document !== "undefined" ? document.title : "",
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          submissionTime: new Date().toISOString(),
          _ts: renderTime,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setWebsite("");

        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "blog_lead_submit", {
            event_category: "Lead",
            event_label: typeof document !== "undefined" ? document.title : "",
          });
        }
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot hidden field */}
      <input
        type="text"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <input
        type="text"
        required
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Enter your website (e.g. vaphers.com)"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Submitting..." : "Get My Free Plan →"}
      </button>

      {success && (
        <p className="text-green-600 text-sm font-medium text-center">
          Thank you! We'll contact you shortly.
        </p>
      )}
    </form>
  );
}