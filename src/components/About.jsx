export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* Main Content */}
      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              About Us
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
              RoomGi is a next-generation Hotel, PG, and Hostel discovery platform
              built to make accommodation search simple, transparent, and
              trustworthy across India.
            </p>
          </header>

          {/* About Content */}
          <div className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed space-y-8">
            <p>
              We help students and working professionals find comfortable,
              verified stays in major cities. By combining verified listings,
              real photos, and accurate information, ROOMGI removes uncertainty
              from the accommodation journey.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Mission
              </h2>
              <p>
                Our mission is to bring clarity, consistency, and confidence to
                the accommodation-searching experience by connecting users with
                safe, high-quality, and well-verified stays.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Why Choose ROOMGI?
              </h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>Verified Hotel, PG, and Hostel listings</li>
                <li>Real photos with accurate property details</li>
                <li>Smart filters for budget, food, sharing, and amenities</li>
                <li>Fast and reliable customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Vision
              </h2>
              <p>
                To become India’s most trusted and user-friendly platform for
                accommodation discovery.
              </p>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}
