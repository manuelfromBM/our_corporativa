import NavbarPrincipal from "@/components/Navbar/Navbar";
import FooterContainer from "@/components/Footer/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarPrincipal />
      <main>{children}</main>
      <FooterContainer />
    </>
  );
}
