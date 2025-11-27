"use client";

import { useState } from "react";
import { ChevronDown, Users, Code } from "lucide-react";
import Header from "../../components/Header";
import { useLanguage } from "../../contexts/LanguageContext";

export default function CreditPage() {
  const [expandedTeam, setExpandedTeam] = useState(null);
  const { isRTL, t } = useLanguage();

  const teams = [
    {
      id: 1,
      name: t("researchTeam"),
      icon: <Users size={24} className="text-yellow-600" />,
      description:
        "Our dedicated research professionals (def didn't make me hate my life while making this ε=ε=ε=ε=┏( ￣▽￣)┛)",
      members: [
        {
          id: 1,
          name: "Najwa Rabie Mahmoud ",
          role: "Lead Researcher/coordinator/student",
          image:
            "https://i.postimg.cc/FKYWBbrK/Whats-App-Image-2025-11-11-at-4-06-22-AM-1.jpg",
        },
        {
          id: 2,
          name: "Farha Abdelhamed Nagy",
          role: "Research Assistant",
          image:
            "https://i.postimg.cc/FKYWBbrK/Whats-App-Image-2025-11-11-at-4-06-22-AM-1.jpg",
        },
        {
          id: 3,
          name: "Malak Mahmoud Mustafa",
          role: "Research Assistant",
          image:
            "https://i.postimg.cc/FKYWBbrK/Whats-App-Image-2025-11-11-at-4-06-22-AM-1.jpg",
        },
        {
          id: 4,
          name: "Sayed Mahmoud Mahmoud",
          role: "Research Assistant",
          image:
            "https://i.postimg.cc/FKYWBbrK/Whats-App-Image-2025-11-11-at-4-06-22-AM-1.jpg",
        },
        {
          id: 5,
          name: "Donya Ahmed Salah",
          role: "Research Assistant",
          image:
            "https://i.postimg.cc/FKYWBbrK/Whats-App-Image-2025-11-11-at-4-06-22-AM-1.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Site maker",
      icon: <Code size={24} className="text-yellow-600" />,
      description: "The technical dude behind this website (◐ω◑ ) ",
      members: [
        {
          id: 1,
          name: "Omar Khaled Youssef",
          role: "Web Developer/team-leader/student ",
          image:
            "https://i.postimg.cc/XYMTFz4C/56940049-3167-481a-b934-bc6388db5f59.jpg",
        },
      ],
    },
  ];

  const toggleTeam = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      <div className="pt-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <span className="relative">
                {t("credits")}
                <div className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200 -z-10 rounded"></div>
              </span>
            </h1>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Meet the teams behind this project. Click on each team to learn
              more about our contributors.
            </p>
          </div>

          {/* Teams Grid */}
          <div className="max-w-4xl mx-auto space-y-6">
            {teams.map((team) => {
              const isExpanded = expandedTeam === team.id;
              return (
                <div key={team.id} className="group">
                  {/* Team Card */}
                  <button
                    onClick={() => toggleTeam(team.id)}
                    className="w-full bg-white border-2 border-yellow-200 hover:border-yellow-400 rounded-lg p-8 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                  >
                    <div
                      className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        {team.icon}
                        <div className={isRTL ? "text-right" : "text-left"}>
                          <h3
                            className="font-bold text-xl text-gray-800 mb-1"
                            style={{
                              fontFamily: "Plus Jakarta Sans, sans-serif",
                            }}
                          >
                            {team.name}
                          </h3>
                          <p
                            className="text-sm text-gray-600"
                            style={{
                              fontFamily: "Plus Jakarta Sans, sans-serif",
                            }}
                          >
                            {team.description}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        size={24}
                        className={`text-yellow-600 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        } ${isRTL ? "transform scale-x-[-1]" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Expanded Team Members with Scrollable Area */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isExpanded
                        ? "max-h-[600px] opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
                      {/* Scrollable Container */}
                      <div
                        className="max-h-[500px] overflow-y-auto p-6"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: "#FDE047 #FEF3C7",
                        }}
                      >
                        {/* Scroll Hint for Research Team */}
                        {team.id === 1 && isExpanded && (
                          <div className="text-center mb-4 py-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                            <p
                              className="text-xs text-yellow-700 font-medium"
                              style={{
                                fontFamily: "Plus Jakarta Sans, sans-serif",
                              }}
                            >
                              📜 Scroll down to see all research team members ↓
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {team.members.map((member) => (
                            <div
                              key={member.id}
                              className="bg-white border border-yellow-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200"
                            >
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-yellow-300 mb-3"
                              />
                              <h4
                                className="font-bold text-gray-800 mb-1"
                                style={{
                                  fontFamily: "Plus Jakarta Sans, sans-serif",
                                }}
                              >
                                {member.name}
                              </h4>
                              <p
                                className="text-sm text-yellow-600 font-medium"
                                style={{
                                  fontFamily: "Plus Jakarta Sans, sans-serif",
                                }}
                              >
                                {member.role}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Bottom padding for better scrolling */}
                        <div className="h-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional styling for scrollbars */}
          <style jsx global>{`
            .overflow-y-auto::-webkit-scrollbar {
              width: 8px;
            }
            .overflow-y-auto::-webkit-scrollbar-track {
              background: #FEF3C7;
              border-radius: 4px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb {
              background: #FDE047;
              border-radius: 4px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
              background: #FACC15;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
