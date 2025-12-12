// /app/layout.tsx

import type { Metadata } from "next";
import SmoothScroll from "@/PageComponents/Global Components/SmoothScroll"; // Import the new component
import NavBar from "@/PageComponents/Global Components/Header";
import Footer from "@/PageComponents/Global Components/Footer";

export const metadata: Metadata = {
  title: "Your Default Website Title",
  description: "Your default website description.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
