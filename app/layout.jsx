import './globals.css'
import { Instrument_Serif, Libre_Franklin, Barlow_Condensed } from 'next/font/google'

const cond = Barlow_Condensed({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-cond',
})

const display = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
})
const body = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata = {
  title: 'Congreso en vivo — Sesión del Senado',
  description: 'Transcripción, cronología y resumen en vivo de la sesión del Senado argentino',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${cond.variable}`}>
      <body>{children}</body>
    </html>
  )
}
