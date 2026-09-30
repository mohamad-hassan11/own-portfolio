import type { Metadata } from 'next'
import {
  Barlow_Condensed,
  Geist,
  JetBrains_Mono,
  Press_Start_2P,
  VT323,
} from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

const barlow = Barlow_Condensed({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
})

// Only loaded for the optional "Pixel art" style skin (see globals.css).
const pressStart = Press_Start_2P({
  variable: '--font-press-start',
  subsets: ['latin'],
  weight: '400',
})

const vt323 = VT323({
  variable: '--font-vt323',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Mohamad Hassan | Software Engineer',
}

// Applies a stored style skin before paint, so returning visitors don't see a flash of the default look.
const noFlashSkinScript = `try{var s=localStorage.getItem('site-skin');if(s&&s!=='neo'){document.documentElement.setAttribute('data-skin',s)}}catch(e){}`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrains.variable} ${barlow.variable} ${pressStart.variable} ${vt323.variable}`}
    >
      <body>
        <Script
          id="skin-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: noFlashSkinScript }}
        />
        {children}
      </body>
    </html>
  )
}
