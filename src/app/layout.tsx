import type { Metadata } from "next";
import { dynaPuff, nunito } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kachi Okwuchi — Portfolio",
  description:
    "ALX-trained frontend developer. Real projects, honestly documented, with five charms hidden on the page.",
};

const THEME_INIT_SCRIPT = `
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dynaPuff.variable} ${nunito.variable} antialiased`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
