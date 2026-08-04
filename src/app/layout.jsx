import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import AuthProvider from "@/context/AuthProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  description: "Hệ thống Quản lý Kho hàng",
  title: "Hệ thống Quản lý Kho hàng",
};

export default function RootLayout({ children }) {
  return (
    <html className={cn("font-sans", inter.variable)} lang="vi">
      <body>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
