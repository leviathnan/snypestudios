import "./globals.css";
import { neue_montreal } from "@/fonts";
import Header from '../components/header'
import Footer from '../components/footer'

export const metadata = {
  title: "Snype Studios",
  description: "Video Editor",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={neue_montreal.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
