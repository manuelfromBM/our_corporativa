import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://www.bmcodelab.cl'),
    title: {
        default: 'BM Code Lab — Desarrollo web y consultoría tecnológica',
        template: '%s | BM Code Lab',
    },
    description: 'Desarrollamos soluciones digitales a medida: desarrollo web, apps móviles, integración de IA, DevOps y consultoría tecnológica para empresas en Chile.',
    keywords: ['desarrollo web', 'consultoría tecnológica', 'aplicaciones móviles', 'inteligencia artificial', 'Next.js', 'Chile'],
    authors: [{ name: 'BM Code Lab' }],
    creator: 'BM Code Lab',
    openGraph: {
        title: 'BM Code Lab — Desarrollo web y consultoría tecnológica',
        description: 'Desarrollamos soluciones digitales a medida para empresas en Chile.',
        url: 'https://www.bmcodelab.cl',
        siteName: 'BM Code Lab',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'BM Code Lab' }],
        locale: 'es_CL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'BM Code Lab',
        description: 'Desarrollamos soluciones digitales a medida para empresas en Chile.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}