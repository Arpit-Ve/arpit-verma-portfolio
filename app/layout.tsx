import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

export const metadata: Metadata = {
  title: 'Arpit Verma — AI Product Builder & Full-Stack Developer',
  description:
    'Portfolio of Arpit Verma — AI Product Builder & Full-Stack Developer. Co-founder of Biblio AI. Building intelligent, scalable products with React, Next.js, Python, TensorFlow, Google Gemini API. Ghaziabad, India.',
  keywords: ['Arpit Verma', 'AI Developer', 'Full Stack Developer', 'Portfolio', 'Biblio AI', 'Machine Learning', 'Next.js'],
  authors: [{ name: 'Arpit Verma' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Arpit Verma — AI Product Builder & Full-Stack Developer',
    description: 'Turning ideas into intelligent, scalable solutions.',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,300;1,14..32,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
