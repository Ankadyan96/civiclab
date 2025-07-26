import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsSans = Poppins({
  weight: ["400", "500", "600"], // Add desired weights
  variable: "--font-poppins-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "Civic Data Lab",
  description: "Civic data lab assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppinsSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
