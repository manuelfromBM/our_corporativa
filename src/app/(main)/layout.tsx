import NavbarPrincipal from "@/components/BM-components/Navbar/Navbar";
import FooterContainer from "@/components/BM-components/Footer/Footer";
import WhatsAppButton from "@/components/BM-components/BtnWasap/BtnWasap";
import FloatingSocial from "@/components/BM-components/FloatingSocial/FloatingSocial";
import "@/Styles/BM-theme.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bmcodelab-theme">
      <NavbarPrincipal />
      <main>{children}</main>
      <FooterContainer />
      <FloatingSocial />
      <WhatsAppButton />
    </div>
  );
}
