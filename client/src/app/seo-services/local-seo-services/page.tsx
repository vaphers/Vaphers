import HeroSEO from "@/PageComponents/Global Components/HeroSubpage";
import LocalPitch from "@/PageComponents/Local Seo Components/Pitch";

export default function Page(){
    return(
        <>
        <main>
        <HeroSEO 
          heading="Local SEO Services That Transform Your Business"
          subtext="Boost your local visibility with our proven Local SEO strategies that deliver real results and drive organic traffic to your website."
          badgeText="Explore our SEO solutions"
        />
        <LocalPitch/>
        </main>
        </>
    )
}