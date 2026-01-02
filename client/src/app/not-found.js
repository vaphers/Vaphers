import Link from 'next/link';
import { Button } from "../components/ui/button";
import NavBar from "../PageComponents/Global Components/Header";
import Footer from "../PageComponents/Global Components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[##3792e1]">
      
      <main className="flex-1  w-full relative overflow-hidden">
        <NavBar />
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_bottom,white_0%,#3a9ae6_50%,#3a9ae6_100%)]" />
        <div className="relative z-10 w-full min-h-screen flex items-center justify-center gap-30 px-12 lg:px-20 py-12">
          <img
            className="w-full max-w-[600px] h-auto object-contain"
            alt="Dragon breathing fire over castle illustration"
            src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767354745/12_pwbsuk.png"
          />

          <div className="flex flex-col items-center gap-12">
            <h1 className="[font-family:'Concert_One',Helvetica] font-normal text-white text-7xl lg:text-[88px] text-center tracking-[0] leading-tight lg:leading-[100px] bungee-inline-regular">
              Whoops...
              <br />
              this page
              <br />
              is not
              <br />
              available
            </h1>

            <Link href="/">
              <Button
                variant="link"
                className="[font-family:'Clash_Grotesk-Medium',Helvetica] font-medium text-blue-900  bg-white border font-bold rounded-4xl text-base tracking-[0] leading-[normal] p-5 cursor-pointer"
              >
                Home Page 
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
