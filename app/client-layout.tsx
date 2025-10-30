"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideHeader =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <>
      {!hideHeader && <Header />}
      <main className="container mx-auto px-4 py-6">{children}</main>
    </>
  );
}
