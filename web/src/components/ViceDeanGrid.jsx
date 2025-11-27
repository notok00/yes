"use client";

import { useState } from "react";
import { ChevronDown, Search, Filter } from "lucide-react";
import { viceDeans } from "../data/professors";
import { useLanguage } from "../contexts/LanguageContext";

export default function ViceDeanGrid() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { language, isRTL, t } = useLanguage();

  // Get unique departments from vice deans data
  const departments = [...new Set(viceDeans.map((vd) => vd.department))].sort();

  // Filter vice deans based on search term and department
  const filteredViceDeans = viceDeans.filter((viceDean) => {
    const matchesSearch =
      searchTerm === "" ||
      viceDean.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      viceDean.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      viceDean.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      viceDean.cv.research.some((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesDepartment =
      selectedDepartment === "" || viceDean.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const toggleCard = (viceDeanId) => {
    setExpandedCard(expandedCard === viceDeanId ? null : viceDeanId);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("");
  };

  const handleCardClick = (slug) => {
    window.location.href = `/vice-deans/${slug}`;
  };

  return (
    <section className="py-12 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {t("meetOurViceDeans")
              .split(" ")
              .map((word, index, words) => {
                if (index === words.length - 2) {
                  // Second to last word
                  return (
                    <span key={index} className="relative">
                      {word} {/* Yellow underline accent */}
                      <div className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200 -z-10 rounded"></div>
                    </span>
                  );
                }
                return word + " ";
              })}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {t("searchByName")}
          </p>

          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search
                  size={20}
                  className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
                />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full py-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-700 ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"}`}
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <Filter
                  size={18}
                  className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
                />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className={`py-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-700 bg-white min-w-[200px] ${isRTL ? "pr-10 pl-8" : "pl-10 pr-8"}`}
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <option value="">{t("allDepartments")}</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || selectedDepartment) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-medium rounded-lg transition-colors duration-150"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {t("clearFilters")}
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="mt-4 text-center">
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {t("showingResults", {
                  count: filteredViceDeans.length,
                  total: viceDeans.length,
                })}
                {selectedDepartment && (
                  <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    {selectedDepartment}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Vice Deans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredViceDeans.map((viceDean) => {
            const isExpanded = expandedCard === viceDean.id;
            return (
              <div key={viceDean.id} className="group">
                {/* Vice Dean Card */}
                <div className="w-full">
                  {/* Clickable Header */}
                  <div
                    onClick={() => handleCardClick(viceDean.slug)}
                    className="bg-white border-2 border-yellow-200 hover:border-yellow-400 rounded-lg p-6 transition-all duration-200 hover:shadow-lg cursor-pointer"
                  >
                    {/* Vice Dean Image */}
                    <div className="mb-4">
                      <img
                        src={viceDean.image}
                        alt={viceDean.name}
                        className="w-28 h-28 rounded-full mx-auto object-cover border-3 border-yellow-300"
                      />
                    </div>

                    {/* Vice Dean Info */}
                    <h3
                      className="font-bold text-lg text-gray-800 mb-1 text-center"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {viceDean.name}
                    </h3>
                    <p
                      className="text-sm text-yellow-600 font-medium mb-2 text-center"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {viceDean.department}
                    </p>
                    <p
                      className="text-sm text-gray-600 mb-3 text-center"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {viceDean.title}
                    </p>

                    <div className="text-center">
                      <span className="text-xs text-yellow-600 font-medium bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                        {t("clickForFullProfile")}
                      </span>
                    </div>
                  </div>

                  {/* Expand/Collapse Toggle */}
                  <button
                    onClick={() => toggleCard(viceDean.id)}
                    className="w-full mt-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-600 font-medium">
                        {isExpanded ? t("hideDetails") : t("showQuickPreview")}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-600 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        } ${isRTL ? "transform scale-x-[-1]" : ""}`}
                      />
                    </div>
                  </button>
                </div>

                {/* Expanded CV Content */}
                <div
                  className={`transition-all duration-300 ease-out ${
                    isExpanded
                      ? "max-h-[500px] opacity-100 mt-4 overflow-y-auto"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#FDE047 #FEF3C7",
                  }}
                >
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm">
                    {/* Research Areas Preview */}
                    <div className="mb-4">
                      <h4
                        className="font-bold text-gray-800 mb-2 text-sm"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {t("researchAreas")}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {viceDean.cv.research.slice(0, 3).map((area, index) => (
                          <span
                            key={index}
                            className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              fontFamily: "Plus Jakarta Sans, sans-serif",
                            }}
                          >
                            {area.length > 20
                              ? `${area.substring(0, 20)}...`
                              : area}
                          </span>
                        ))}
                        {viceDean.cv.research.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{viceDean.cv.research.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-lg font-bold text-yellow-600">
                          {viceDean.cv.education?.length || 0}
                        </div>
                        <div className="text-xs text-gray-600">
                          {t("degrees")}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-lg font-bold text-yellow-600">
                          {viceDean.cv.publications?.length || 0}
                        </div>
                        <div className="text-xs text-gray-600">
                          {t("publications")}
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => handleCardClick(viceDean.slug)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {t("viewFullProfile")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredViceDeans.length === 0 &&
          (searchTerm || selectedDepartment) && (
            <div className="text-center py-12">
              <p
                className="text-gray-600 text-lg mb-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {t("noViceDeansFound")}
              </p>
              <button
                onClick={clearFilters}
                className="text-yellow-600 hover:text-yellow-700 font-medium underline"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {t("clearAllFilters")}
              </button>
            </div>
          )}
      </div>
    </section>
  );
}
