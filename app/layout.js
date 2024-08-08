import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Header from "./components/Header";

export const metadata = {
  title: "Customer Support",
  description: "Customer support chat app powered by OpenAI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
