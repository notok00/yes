import Header from "../../components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* About Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <span className="relative">
                About
                <div className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200 -z-10 rounded"></div>
              </span>
            </h2>
            <p
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              This website was made by students in honour of our college's vice
              deans. We celebrate their dedication, leadership, and
              contributions to our academic community.
            </p>

            {/* About Image */}
            <div className="max-w-4xl mx-auto">
              <img
                src="https://i.postimg.cc/Y2TtjjF7/Whats-App-Image-2025-11-11-at-4-06-22-AM.jpg"
                alt="College faculty and students"
                className="w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
