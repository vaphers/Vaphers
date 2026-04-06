// "use client";

// import { useState } from "react";

// export default function BlogLeadForm() {
//   const [website, setWebsite] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const trimmedWebsite = website.trim();

//     // Auto add https:// if missing
//     const formattedWebsite =
//       trimmedWebsite.startsWith("http://") ||
//       trimmedWebsite.startsWith("https://")
//         ? trimmedWebsite
//         : `https://${trimmedWebsite}`;

//     const formData = new FormData();

//     // Web3Forms access key
//     formData.append(
//       "access_key",
//       process.env.NEXT_PUBLIC_BLOG_LEAD_WEB3FORMS!
//     );

//     // User input
//     formData.append("Client's Website", formattedWebsite);

//     // Extra lead metadata
//     formData.append("Blog Title", document.title);
//     formData.append("Page URL", window.location.href);
//     formData.append("Submission Time", new Date().toISOString());

//     // Email config
//     formData.append("Subject", "New Blog Sidebar Lead");
//     formData.append("from_name", "Vaphers Blog Lead Form");

//     // Honeypot (spam protection)
//     formData.append("botcheck", "");

//     try {
//       const response = await fetch(
//         "https://api.web3forms.com/submit",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const result = await response.json();

//       if (result.success) {
//         setSuccess(true);
//         setWebsite("");

//         // Optional GA tracking
//         if (typeof window !== "undefined" && (window as any).gtag) {
//           (window as any).gtag("event", "blog_lead_submit", {
//             event_category: "Lead",
//             event_label: document.title,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Submission failed:", error);
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">

//       {/* Honeypot hidden field */}
//       <input
//         type="checkbox"
//         name="botcheck"
//         className="hidden"
//         style={{ display: "none" }}
//       />

//       <input
//         type="text"
//         required
//         value={website}
//         onChange={(e) => setWebsite(e.target.value)}
//         placeholder="Enter your website (e.g. vaphers.com)"
//         className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
//       >
//         {loading ? "Submitting..." : "Get My Free Plan →"}
//       </button>

//       {success && (
//         <p className="text-green-600 text-sm font-medium text-center">
//          Thank you! We'll contact you shortly.
//         </p>
//       )}
//     </form>
//   );
// }



"use client";

import { useState } from "react";

export default function BlogLeadForm() {
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
          blogTitle: document.title,
          pageUrl: window.location.href,
          submissionTime: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setWebsite("");

        // can track in ga4 using tag if needed but not a priority rn 
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "blog_lead_submit", {
            event_category: "Lead",
            event_label: document.title,
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
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