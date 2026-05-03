import Navbar from "@/components/navbar"
import Footer from "@/components/footer";
import {ReactLenis} from "@/lib/lenis"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root>
      <Navbar />
      {children}
      <Footer />
    </ReactLenis>
  );
}
