import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Estrategia Electoral Xalapa 2027',
  description: 'Análisis de rentabilidad electoral, matriz FODA, simulador táctico de participación y mapeo de secciones con inteligencia artificial.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-100" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

