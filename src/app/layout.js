import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LoadingProfile from "./components/LoadingProfile";


import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat.ly - Realtime Chat App",
  description: "A chat app to talk to friends in realtime.",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-chatly-bg bg-no-repeat bg-cover w-full h-screen flex items-center justify-center"}>
        <Suspense fallback={<LoadingProfile />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
