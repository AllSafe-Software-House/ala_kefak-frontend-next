import { mainInfo } from "@/app/constants/info";
import Link from "next/link";
import {
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaWindows,
  FaApple,
} from "react-icons/fa";
import { Logo } from "../navbar/Logo";

const socialIcons = [
  { id: "whatsapp", icon: FaWhatsapp, link: "https://wa.me/" },
  { id: "youtube", icon: FaYoutube, link: "https://www.youtube.com/" },
  {
    id: "instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/allsafe_software_house?igsh=MW5wejh5NjNydzJubA==",
  },
  {
    id: "facebook",
    icon: FaFacebookF,
    link: "https://www.facebook.com/allsafesoftwarehouse",
  },
];

const quickLinksData = [
  { title: "Platform", links: ["Footer", "Footer", "Footer", "Footer"] },
  { title: "Company", links: ["Footer", "Footer", "Footer", "Footer"] },
  { title: "Links", links: ["Footer", "Footer", "Footer", "Footer"] },
];

const appLinks = [
  { name: "Windows", icon: FaWindows, link: "#" },
  { name: "Apple", icon: FaApple, link: "#" },
];

const Footer = () => {
  return (
    <div>
      <footer className="w-full grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] gap-8 py-12 px-4 lg:px-16 bg-white dark:bg-darknav border-b border-gray-200 dark:border-gray-800">
        <Section title={Logo()} subtitle={mainInfo.name}>
          <div className="flex gap-4">
            {socialIcons.map(({ id, icon: Icon, link }) => (
              <Link
                key={id}
                href={link}
                target="_blank"
                className="text-primary bg-gray-100 rounded-full p-2 text-xl hover:text-white hover:bg-primary animation
                dark:bg-darkbg dark:text-primary hover:dark:bg-primary hover:dark:text-darkbg
                "
              >
                <Icon />
              </Link>
            ))}
          </div>
        </Section>

        <div className="grid grid-cols-3">
          {quickLinksData.map(({ title, links }, index) => (
            <Section key={index} title={title}>
              {links.map((text, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-sm md:text-base hover:text-primary animation"
                >
                  {text}
                </Link>
              ))}
            </Section>
          ))}
        </div>

        <Section title="Get the app">
          <div className="flex flex-row lg:flex-col gap-2">
            {appLinks.map(({ name, icon: Icon, link }) => (
              <Link
                key={name}
                href={link}
                className="flex items-center gap-2 p-2 px-5 border rounded-3xl hover:text-primary hover:border-primary animation"
              >
                <Icon className="text-xl" />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </Section>
      </footer>
      <CopyRight />
    </div>
  );
};

export default Footer;

const Section = ({ title, subtitle, children }) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-xl md:text-2xl">{title}</h2>
    {subtitle && <p className="text-sm">{subtitle}</p>}
    <div className="flex flex-col gap-2">{children}</div>
  </div>
);


function CopyRight() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full flex justify-center items-center gap-1 bg-primary text-white p-4">
      <p>All Rights Reserved {currentYear}</p>
      <Link target="_blank" href="https://www.allsafeeg.com/en" className="text-lg font-semibold animation hover:text-yellow-300">
        “All safe“
      </Link>
      <p>company</p>
    </div>
  );
}
