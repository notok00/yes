"use client";

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, isRTL, changeLanguage, t } = useLanguage();

  const navItems = [
    { label: t("about"), href: "/about" },
    { label: t("home"), href: "/" },
    { label: t("credit"), href: "/credit" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Hamburger menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center hover:bg-yellow-50 transition-colors duration-150 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-800" strokeWidth={2} />
            ) : (
              <Menu size={24} className="text-gray-800" strokeWidth={2} />
            )}
          </button>

          {/* Center - Logo/Title */}
          <h1
            className="font-bold text-xl text-gray-800 text-center"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {language === "ar" ? "وكلاء كلية الآداب" : "Vice Deans"}
          </h1>

          {/* Right - Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors duration-150 ${
                  language === "en"
                    ? "bg-yellow-500 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("ar")}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors duration-150 ${
                  language === "ar"
                    ? "bg-yellow-500 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                AR
              </button>
            </div>
            <Globe size={20} className="text-gray-500" />
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="mt-4 py-4 border-t border-gray-100 bg-white">
            <nav
              className={`flex flex-col gap-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-yellow-600 font-medium text-base transition-colors duration-150 px-2 py-1 rounded hover:bg-yellow-50"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
