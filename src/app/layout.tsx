import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css'; // Estilos globais
import { ReactNode } from 'react';

// Definição das fontes
const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
    display: 'swap', // Melhor para performance
});

const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
    display: 'swap',
});

// Metadados da página
export const metadata: Metadata = {
    title: 'Meu painel de portifólios',
    description:
        'Meu projeto para divulgar trabalhos de desenvolvimento web, focado em criar portifolios para todo aquele que quiser divulgar seu trabalho por meio da internet!',
    icons: {
        icon: '/favicon.png',
    },
};

// Componente de layout principal
export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
            </body>
        </html>
    );
}
