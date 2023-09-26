import "@/app/globals.css";
import { Space_Grotesk } from "next/font/google";

const spgrot = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "Talent Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${spgrot.className}`}>{children}</body>
    </html>
  );
}
