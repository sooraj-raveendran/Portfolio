import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.vercel.app';

export const metadata = {
  title: {
    default: 'Sooraj R | Portfolio',
    template: '%s | Sooraj R',
  },
  description: 'A modern portfolio built with Next.js and Tailwind CSS, showcasing full-stack projects and development experience.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sooraj R | Portfolio',
    description: 'A modern portfolio built with Next.js and Tailwind CSS, showcasing full-stack projects and development experience.',
    url: siteUrl,
    siteName: 'Sooraj R Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sooraj R | Portfolio',
    description: 'A modern portfolio built with Next.js and Tailwind CSS, showcasing full-stack projects and development experience.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  )
}
