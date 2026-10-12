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
  densityRange,
  sizeRange,
  opacityRange,
  defaultStyleSettings,
  universeBackgroundDefaults,
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
const noFlashSkinScript =
  `try{var s=localStorage.getItem('site-skin');if(${JSON.stringify(universes.map(({ id }) => id))}.includes(s)){document.documentElement.setAttribute('data-skin',s)}}catch(e){};try{var p=JSON.parse(localStorage.getItem('site-style-lab')||'null');if(p&&typeof p==='object'){var v={cursor:${JSON.stringify(cursorStyles.map(({ id }) => id))}.includes(p.cursor)?p.cursor:'theme',cursorColor:(${JSON.stringify(cursorColors.map(({ id }) => id))}.includes(p.cursorColor)||typeof p.cursorColor==='string'&&/^#[0-9a-f]{6}$/i.test(p.cursorColor))?p.cursorColor:'theme',background:${JSON.stringify(backgroundStyles.map(({ id }) => id))}.includes(p.background)?p.background:'theme',density:Number.isInteger(p.density)&&p.density>=${densityRange.min}&&p.density<=${densityRange.max}?p.density:p.density==='subtle'?1:p.density==='lively'?${densityRange.max}:3,size:Number.isInteger(p.size)&&p.size>=${sizeRange.min}&&p.size<=${sizeRange.max}?p.size:3,opacity:Number.isInteger(p.opacity)&&p.opacity>=${opacityRange.min}&&p.opacity<=${opacityRange.max}?p.opacity:${opacityRange.max},backgroundColor:(['theme','blue','mint','cyan','amber','violet','rose','rainbow','aurora','sunset'].includes(p.backgroundColor)||typeof p.backgroundColor==='string'&&/^#[0-9a-f]{6}$/i.test(p.backgroundColor))?p.backgroundColor:'theme',motion:p.motion==='still'?'still':'animated',interaction:typeof p.interaction==='boolean'?p.interaction:true};document.documentElement.setAttribute('data-style-settings',JSON.stringify(v));document.documentElement.setAttribute('data-background',v.background)}}catch(e){}` +
  `;try{if(!document.documentElement.hasAttribute('data-style-settings')){var t=document.documentElement.getAttribute('data-skin')||'neo';var d=${JSON.stringify(defaultStyleSettings)};var b=${JSON.stringify(universeBackgroundDefaults)}[t]||${JSON.stringify(universeBackgroundDefaults.neo)};var v=Object.assign({},d,b);document.documentElement.setAttribute('data-style-settings',JSON.stringify(v));document.documentElement.setAttribute('data-background',v.background)}}catch(e){}`

const migrateThemeBackgroundScript = `try{var p=JSON.parse(localStorage.getItem('site-style-lab')||'null');if(p&&p.background==='theme'){var t=document.documentElement.getAttribute('data-skin')||'neo';var b=${JSON.stringify(universeBackgroundDefaults)}[t]||${JSON.stringify(universeBackgroundDefaults.neo)};var v=JSON.parse(document.documentElement.getAttribute('data-style-settings')||'{}');v.background=b.background;if(!p.backgroundColor||p.backgroundColor==='theme')v.backgroundColor=b.backgroundColor;document.documentElement.setAttribute('data-style-settings',JSON.stringify(v));document.documentElement.setAttribute('data-background',v.background)}}catch(e){}`

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
          dangerouslySetInnerHTML={{
            __html: `${noFlashSkinScript}${migrateThemeBackgroundScript}`,
          }}
        />
        {children}
      </body>
    </html>
  )
}
