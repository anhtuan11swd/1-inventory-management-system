import "./globals.css";

export const metadata = {
  description: "Hệ thống Quản lý Kho hàng",
  title: "Hệ thống Quản lý Kho hàng",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
