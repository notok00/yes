"use client";

import Header from "../components/Header";
import ViceDeanGrid from "../components/ViceDeanGrid";
import { useLanguage } from "../contexts/LanguageContext";

export default function HomePage() {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      <main className="pt-20">
        <ViceDeanGrid />
      </main>
    </div>
  );
}
