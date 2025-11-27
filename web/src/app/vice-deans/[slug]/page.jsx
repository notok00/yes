"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Calendar, Award, BookOpen, Search } from "lucide-react";
import { viceDeans } from "../../../data/professors";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function ViceDeanProfile({ params }) {
  const [viceDean, setViceDean] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isRTL, t } = useLanguage();

  useEffect(() => {
    // Find the vice dean by slug
    const foundViceDean = viceDeans.find((vd) => vd.slug === params.slug);
    setViceDean(foundViceDean);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loadingProfile")}</p>
        </div>
      </div>
    );
  }

  if (!viceDean) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {t("viceDeanNotFound")}
          </h1>
          <p className="text-gray-600 mb-6">{t("profileNotExist")}</p>
          <a
            href="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            {t("returnToHome")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-yellow-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a
            href="/"
            className={`flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <ChevronLeft
              size={20}
              className={isRTL ? "transform scale-x-[-1]" : ""}
            />
            {t("backToViceDeans")}
          </a>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-8 mb-8">
          <div
            className={`flex flex-col md:flex-row items-center gap-8 ${isRTL ? "md:flex-row-reverse md:text-right" : "md:items-start"}`}
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={viceDean.image}
                alt={viceDean.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
              />
            </div>

            {/* Basic Info */}
            <div
              className={`flex-1 text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
            >
              <h1
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {viceDean.name}
              </h1>
              <p
                className="text-lg text-yellow-600 font-semibold mb-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {viceDean.title}
              </p>
              <p
                className="text-gray-600 mb-4"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {viceDean.department}
              </p>

              {/* QR Code Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 inline-block">
                <p
                  className="text-sm text-yellow-800"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  📱 {t("qrCodeNotice")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CV Sections */}
        <div className="space-y-6">
          {/* Education */}
          <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-6">
            <h2
              className={`text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 pl-4 ${isRTL ? "border-r-4 border-yellow-400 flex-row-reverse pr-4 pl-0" : "border-l-4 border-yellow-400"}`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <BookOpen size={24} className="text-yellow-600" />
              {t("education")}
            </h2>
            <ul className="space-y-3">
              {viceDean.cv.education.map((edu, index) => (
                <li
                  key={index}
                  className={`text-gray-700 text-base leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <span className="text-yellow-600 font-semibold">
                    {isRTL ? "•" : "•"}
                  </span>{" "}
                  {edu}
                </li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-6">
            <h2
              className={`text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 pl-4 ${isRTL ? "border-r-4 border-yellow-400 flex-row-reverse pr-4 pl-0" : "border-l-4 border-yellow-400"}`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <Calendar size={24} className="text-yellow-600" />
              {t("experience")}
            </h2>
            <ul className="space-y-3">
              {viceDean.cv.experience.map((exp, index) => (
                <li
                  key={index}
                  className={`text-gray-700 text-base leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <span className="text-yellow-600 font-semibold">•</span> {exp}
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-6">
            <h2
              className={`text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 pl-4 ${isRTL ? "border-r-4 border-yellow-400 flex-row-reverse pr-4 pl-0" : "border-l-4 border-yellow-400"}`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <Search size={24} className="text-yellow-600" />
              {t("researchAreas")}
            </h2>
            <div
              className={`flex flex-wrap gap-3 ${isRTL ? "justify-end" : "justify-start"}`}
            >
              {viceDean.cv.research.map((area, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium border border-yellow-300"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Awards (if available) */}
          {viceDean.cv.awards && viceDean.cv.awards.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-6">
              <h2
                className={`text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 pl-4 ${isRTL ? "border-r-4 border-yellow-400 flex-row-reverse pr-4 pl-0" : "border-l-4 border-yellow-400"}`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <Award size={24} className="text-yellow-600" />
                {t("awardsRecognition")}
              </h2>
              <ul className="space-y-3">
                {viceDean.cv.awards.map((award, index) => (
                  <li
                    key={index}
                    className={`text-gray-700 text-base leading-relaxed flex items-start gap-2 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <span className="text-yellow-600 text-lg">🏆</span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Publications (if available) */}
          {viceDean.cv.publications && viceDean.cv.publications.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-6">
              <h2
                className={`text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 pl-4 ${isRTL ? "border-r-4 border-yellow-400 flex-row-reverse pr-4 pl-0" : "border-l-4 border-yellow-400"}`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <BookOpen size={24} className="text-yellow-600" />
                {t("publications")}
              </h2>
              <ul className="space-y-3">
                {viceDean.cv.publications.map((publication, index) => (
                  <li
                    key={index}
                    className={`text-gray-700 text-base leading-relaxed flex items-start gap-2 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <span className="text-yellow-600 text-lg">📚</span>
                    {publication}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Back to Top */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm inline-block"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {t("backToAllViceDeans")}
          </a>
        </div>
      </div>
    </div>
  );
}
