"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  en: {
    // Header
    home: "Home",
    about: "About",
    credit: "Credit",

    // Homepage
    meetOurViceDeans: "Meet Our Vice Deans",
    searchPlaceholder: "Search by name, department, or research area...",
    allDepartments: "All Departments",
    clearFilters: "Clear Filters",
    showingResults: "Showing {count} of {total} vice deans",
    noViceDeansFound: "No vice deans found matching your criteria",
    clearAllFilters: "Clear all filters",
    showQuickPreview: "Show Quick Preview",
    hideDetails: "Hide Details",
    clickForFullProfile: "Click for full profile",
    viewFullProfile: "View Full Profile",

    // Vice Dean Profile
    backToViceDeans: "Back to Vice Deans",
    qrCodeNotice: "This profile has a unique QR code for easy sharing",
    education: "Education",
    experience: "Experience",
    researchAreas: "Research Areas",
    awardsRecognition: "Awards & Recognition",
    publications: "Publications",
    backToAllViceDeans: "Back to All Vice Deans",
    viceDeanNotFound: "Vice Dean Not Found",
    profileNotExist: "The vice dean profile you're looking for doesn't exist.",
    returnToHome: "Return to Home",
    loadingProfile: "Loading vice dean profile...",
    degrees: "Degrees",

    // Credit Page
    credits: "Credits",
    researchTeam: "Research Team",

    // About Page
    aboutTitle: "About Faculty of Arts",
    aboutDescription:
      "Learn more about our faculty's mission, history, and achievements.",

    // Search descriptions
    searchByName:
      "Search by name, department, or research area. Click on any vice dean card to learn more about their background, education, and research interests.",

    // Common
    loading: "Loading...",
    error: "Error",
  },

  ar: {
    // Header
    home: "الرئيسية",
    about: "حول",
    credit  "الفضل",

    // Homepage
    meetOurViceDeans: "تعرف على وكلاء الكلية",
    searchPlaceholder: "ابحث بالاسم أو القسم أو مجال البحث...",
    allDepartments: "جميع الأقسام",
    clearFilters: "مسح الفلاتر",
    showingResults: "عرض {count} من {total} وكيل كلية",
    noViceDeansFound: "لم يتم العثور على وكلاء كلية تطابق معاييرك",
    clearAllFilters: "مسح جميع الفلاتر",
    showQuickPreview: "عرض معاينة سريعة",
    hideDetails: "إخفاء التفاصيل",
    clickForFullProfile: "انقر للحصول على الملف الشخصي الكامل",
    viewFullProfile: "عرض الملف الشخصي الكامل",

    // Vice Dean Profile
    backToViceDeans: "العودة إلى وكلاء الكلية",
    qrCodeNotice: "يحتوي هذا الملف الشخصي على رمز QR فريد لسهولة المشاركة",
    education: "التعليم",
    experience: "الخبرة",
    researchAreas: "مجالات البحث",
    awardsRecognition: "الجوائز والتقدير",
    publications: "المنشورات",
    backToAllViceDeans: "العودة إلى جميع وكلاء الكلية",
    viceDeanNotFound: "وكيل الكلية غير موجود",
    profileNotExist: "الملف الشخصي لوكيل الكلية الذي تبحث عنه غير موجود.",
    returnToHome: "العودة إلى الرئيسية",
    loadingProfile: "تحميل ملف وكيل الكلية...",
    degrees: "الدرجات العلمية",

    // Credit Page
    credits   "الفضل",
    researchTeam: "فريق البحث",

    // About Page
    aboutTitle: "حول كلية الآداب",
    aboutDescription: "تعرف على رسالة كليتنا وتاريخها وإنجازاتها.",

    // Search descriptions
    searchByName:
      "البحث بالاسم أو القسم أو مجال البحث. اضغط على أي بطاقة وكيل كلية لمعرفة المزيد حول خلفيتهم وتعليمهم واهتماماتهم البحثية.",

    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");

    // Update document direction and lang attribute
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setIsRTL(newLanguage === "ar");
    localStorage.setItem("language", newLanguage);

    // Update document direction and lang attribute
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  const t = (key, params = {}) => {
    let text =
      translations[language]?.[key] || translations["en"]?.[key] || key;

    // Replace parameters in the text
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, params[param]);
    });

    return text;
  };

  const value = {
    language,
    isRTL,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};



