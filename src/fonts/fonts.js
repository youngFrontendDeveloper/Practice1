import { PT_Sans, Montserrat, Lato } from "next/font/google";
import localFont from 'next/font/local';

export const ptSans = PT_Sans( {
  weight: [ "400", "700" ],
  style: [ "normal" ],
  subsets: [ "cyrillic" ],
  display: "swap",
  variable: "--primary-text-font",
  fallback: [ "system-ui", "arial" ],
} );

export const montserrat = Montserrat( {
  weight: [ "800" ],
  style: [ "normal" ],
  subsets: [ "cyrillic" ],
  display: "swap",
  variable: "--title-font",
  fallback: [ "system-ui", "verdana" ],
} );

export const lato = localFont({
  src: [
    {
      path: './Lato-Light.woff2',
      weight: '400',
      style: 'normal',
      subsets: [ "cyrillic" ],
    },
    {
      path: './Lato-Medium.woff2',
      weight: '600',
      style: 'normal',
      subsets: [ "cyrillic" ],
    },
  ],
  variable: '--secondary-text-font',
  display: 'swap',
});



