// import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Luckiest_Guy, Roboto_Slab } from 'next/font/google'
import { AccessProvider } from "@/context/context";
import ClientLayout from './ClientLayout';
import "./globals.scss"

// Poppins fontini turli vaznlar bilan sozlash
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  // style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins'
})

// Luckiest Guy fonti
export const luckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-luckiest-guy'
})

// Roboto Slab fonti (agar kerak bo'lsa)
export const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-roboto-slab'
})

export const metadata = {
  title: "AFD Music - Barcha qo'shiqlar bizda!",
  description: "AFD Music - Barcha qo'shiqlarni bepulga tinglang va yuklab oling!",
};

export default function RootLayout({ children }) {
  return (
    <AccessProvider>
      <html lang="en" className={`${poppins.variable}`}>
        <head>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1980545331504061"
            crossorigin="anonymous"></script>
          {/* YANDEX AD START */}
          <script>window.yaContextCb=window.yaContextCb||[]</script>
          <script src="https://yandex.ru/ads/system/context.js" async></script>
          {/* YANDEX AD END */}
        </head>
        <body id='__next'>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </AccessProvider>
  );
}