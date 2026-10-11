import type { Metadata } from 'next'
import {
  Barlow_Condensed,
  Geist,
  JetBrains_Mono,
  Press_Start_2P,
  VT323,
} from 'next/font/google'
import Script from 'next/script'
import { universes } from '@/content/universes'
import {
  backgroundStyles,
  cursorStyles,
  cursorColors,
} from '@/content/style-lab'
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

// Restores the saved universe and Style Lab background before paint.
const noFlashSkinScript = `try{var s=localStorage.getItem('site-skin');if(${JSON.stringify(universes.map(({ id }) => id))}.includes(s)){document.documentElement.setAttribute('data-skin',s)}}catch(e){};try{var p=JSON.parse(localStorage.getItem('site-style-lab')||'null');if(p&&typeof p==='object'){var v={cursor:${JSON.stringify(cursorStyles.map(({ id }) => id))}.includes(p.cursor)?p.cursor:'theme',cursorColor:(${JSON.stringify(cursorColors.map(({ id }) => id))}.includes(p.cursorColor)||typeof p.cursorColor==='string'&&/^#[0-9a-f]{6}$/i.test(p.cursorColor))?p.cursorColor:'theme',background:${JSON.stringify(backgroundStyles.map(({ id }) => id))}.includes(p.background)?p.background:'theme',density:['subtle','balanced','lively'].includes(p.density)?p.density:'balanced',motion:p.motion==='still'?'still':'animated',interaction:typeof p.interaction==='boolean'?p.interaction:true};document.documentElement.setAttribute('data-style-settings',JSON.stringify(v));document.documentElement.setAttribute('data-background',v.background)}}catch(e){}`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-skin="neo"
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
