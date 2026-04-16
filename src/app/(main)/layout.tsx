import NavbarPrincipal from "@/components/Navbar/Navbar";
import FooterContainer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/BtnWasap/BtnWasap";
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
      <WhatsAppButton />
    </div>
  );
}
