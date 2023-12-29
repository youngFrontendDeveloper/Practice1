import "../styles/globals.scss";
import { ptSans, montserrat, lato } from "@/fonts/fonts";
// import styles from "@/app/page.module.scss";

export const metadata = {
  title: "Тестовое задание",
  description: "Тестовое задание на позицию Junior Frontend Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={ `${ ptSans.variable } ${ lato.variable } ${ montserrat.variable }` }>
    <main className="main container">
      { children }
    </main>
    <div id="modal-root"/>
    </body>
    </html>
  );
}
