import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'

const FONT_POPPINS = Poppins({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const FONT_CLASH_DISPLAY = localFont({ src: './ClashDisplay-Variable.woff2', variable: '--font-mono' })

export { FONT_POPPINS, FONT_CLASH_DISPLAY }
