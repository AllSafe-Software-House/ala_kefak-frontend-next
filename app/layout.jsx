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
      <body
        className={` `}
        // style={{
        //   backgroundColor: "#F3F4F6", // خلفية فاتحة
        //   darkMode: { backgroundColor: "#1E1F1D" }, // خلفية الوضع الليلي
        // }}
      >
        <AppProviders>
          <Wraper>{children}</Wraper>
        </AppProviders>
      </body>
    </html>
  );
}
