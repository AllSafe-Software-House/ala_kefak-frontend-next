import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import { mainInfo } from "./constants/info";
import AppProviders from "./providers/AppProviders";
import Wraper from "./Wraper";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "900"],
});

export const metadata = {
  title: mainInfo.name,
  description: mainInfo.description,
  robots: "index, follow",
  language: "en",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${interFont.className} `}>
        <AppProviders>
          <Wraper>{children}</Wraper>
        </AppProviders>
      </body>
    </html>
  );
}
