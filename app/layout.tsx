import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import Navbar from "@/components/Navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Eatsy",
    template: "%s | Eatsy",
  },
  description: "A recipe app that doesn't try to tell you its life story.",
};

const checkSession = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session ? true : false;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = checkSession();
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <header>
              <Navbar session={session} />
            </header>
            <main className="max-w-xl mx-auto">{children}</main>
          </div>
          <footer className="text-center relative bottom:0">
            Copyright © 2024 Eatsy
          </footer>
        </div>
      </body>
    </html>
  );
}
