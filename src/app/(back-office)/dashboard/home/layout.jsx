"use client";

import { useState } from "react";
import HomeNavbar from "@/components/dashboard/HomeNavbar";

export default function HomeLayout({ children }) {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div>
      {showBanner && <HomeNavbar onCloseBanner={() => setShowBanner(false)} />}
      {children}
    </div>
  );
}
