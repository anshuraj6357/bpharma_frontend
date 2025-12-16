export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white">
      {/* Main Content */}
      <main className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-white border rounded-3xl shadow-xl px-12 py-14">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Contact Us
            </h1>
            <p className="text-green-600 text-xl font-semibold mt-2">
              ROOMGI
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Have questions or need assistance? We’re here to help you with
              bookings, support, and general queries — feel free to reach out.
            </p>
          </header>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl border text-center hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Phone
              </h3>
              <p className="text-gray-600">Call us directly</p>
              <p className="font-semibold text-green-600 mt-3">
                +91 98765 43210
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border text-center hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600">Send us your queries</p>
              <p className="font-semibold text-green-600 mt-3">
                support@roomgi.com
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border text-center hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Address
              </h3>
              <p className="text-gray-600">
                Ghaziabad, Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 border rounded-2xl shadow-md p-10 max-w-4xl mx-auto mb-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Send us a message
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and our team will get back to you shortly.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Our Location
            </h2>

            <iframe
              title="ROOMGI Location"
              src="https://maps.google.com/maps?q=Ghaziabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-80 rounded-2xl shadow-lg border"
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </main>
    </div>
  );
}
