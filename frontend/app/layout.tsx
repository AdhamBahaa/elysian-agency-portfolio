import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elysian Agency | Immersive Creative Design & Technology Studio",
  description: "Elysian is a premium design and development agency crafting visually stunning and highly interactive web experiences for luxury, art, and technology brands.",
  keywords: ["Next.js", "GSAP", "Tailwind CSS", "Strapi v5", "Creative Agency", "WebGL", "Interactive Design"],
  authors: [{ name: "Elysian Agency" }],
  openGraph: {
    title: "Elysian Agency | Immersive Creative Design & Technology Studio",
    description: "Elysian is a premium design and development agency crafting visually stunning and highly interactive web experiences for luxury, art, and technology brands.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
      </body>
    </html>
  );
}
