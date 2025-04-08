import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import { mainInfo } from "./constants/info";
import AppProviders from "./providers/AppProviders";
import Wraper from "./Wraper";

export const metadata = {
  title: mainInfo.name,
  description: mainInfo.description,
  robots: "index, follow",
  language: "en",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` `}>
      <head>
        <meta name="theme-color" content="#49B42B" />
      </head>

      <body className={` `}>
        <AppProviders>
          <Wraper>{children}</Wraper>
        </AppProviders>
      </body>
    </html>
  );
}
