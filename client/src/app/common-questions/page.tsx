import CommonQuestionsList from '@/PageComponents/CommonQuestions Components/CommonQuestionsList';
import ContactSection from '@/PageComponents/Landing Home/ContactSection';
import MarketingPriceCalculator from '@/PageComponents/Global Components/PriceCalc';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';
import Script from 'next/script'; 

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Common Questions & Answers | Vaphers', 
  description: 'Find answers to common questions about digital marketing, SEO, PPC advertising, and custom web development.',
  keywords: ['common questions', 'FAQ', 'digital marketing FAQ', 'SEO questions', 'Vaphers'],
  openGraph: {
    title: 'Common Questions | Vaphers',
    description: 'Read answers to frequently asked questions on SEO, PPC, and web development.',
    url: 'https://www.vaphers.com/common-questions', 
  },
};

export default async function CommonQuestionsPage() {
  let questions = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/common-questions`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      questions = data.questions || [];
    }
  } catch (err) {
    console.error("Failed to fetch common questions:", err);
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.vaphers.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Common Questions",
        "item": "https://www.vaphers.com/common-questions"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <Script
        id="breadcrumb-schema-cq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <NavBar/>
      <CommonQuestionsList initialQuestions={questions}/>
      <MarketingPriceCalculator/>
      <ContactSection/>
      <Footer/>
    </main>
  );
}
