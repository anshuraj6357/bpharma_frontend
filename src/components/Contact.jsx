export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 text-lg text-center mb-10">
          Have questions? We’re here to help you.  
          Reach out to us anytime — we respond quickly!
        </p>

        {/* Contact Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          {/* Phone */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">Call us directly</p>
            <p className="font-semibold text-blue-600 mt-2">+91 9876543210</p>
          </div>

          {/* Email */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600">Send us your queries</p>
            <p className="font-semibold text-blue-600 mt-2">
              support@roomgi.com
            </p>
          </div>

          {/* Address */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
            <p className="text-gray-600">Ghaziabad, Uttar Pradesh, India</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white border shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Send us a message
          </h2>
          <p className="text-gray-600 mb-6">
            Fill the form below and our team will contact you soon.
          </p>

          <form className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Our Location
          </h2>

          <iframe
            title="RoomGi Location"
            src="https://maps.google.com/maps?q=Ghaziabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-72 rounded-xl shadow-lg border"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
