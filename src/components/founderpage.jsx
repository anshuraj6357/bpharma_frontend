// File: FounderPage.jsx

import React from "react";

const FounderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ayush Raj</h1>
          <p className="text-xl md:text-2xl"> CEO, RoomGi Pvt. Ltd.</p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Photo */}
        <div className="flex-shrink-0">
          <img
            src="/images/founder.jpg" // Replace with CEO photo path
            alt="Abhinav Kumar"
            className="rounded-xl shadow-xl w-72 md:w-96 mx-auto"
          />
        </div>

        {/* Bio */}
        <div className="md:flex-1 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            About the CEO
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Abhinav Kumar, the visionary behind RoomGi Pvt. Ltd., leads the
            company with a mission to innovate and empower students and young
            professionals through technology-driven solutions. Under his
            leadership, RoomGi has launched initiatives like the RoomGi Open
            Innovation Hackathon to foster creativity, skill development, and
            real-world problem-solving among students across India.
          </p>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Key Achievements
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Founded RoomGi Pvt. Ltd. in [Year]</li>
              <li>
                Organized national-level hackathons with cash prizes and
                internship opportunities
              </li>
              <li>Mentored hundreds of students and startups through RoomGi initiatives</li>
              <li>Focused on bridging the gap between academics and industry</li>
              <li>Spearheaded AI and tech-enabled education solutions for students</li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Founder’s Vision
            </h3>
            <p className="text-gray-700 italic">
              “To create an ecosystem where students can explore, innovate, and
              transform their ideas into reality while gaining industry exposure
              and practical skills.”
            </p>
          </div>

          {/* Contact / Social */}
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="https://linkedin.com/in/ayushraj" // Replace with actual
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              LinkedIn
            </a>
            <a
              href="mailto:support@roomgi.com"
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
            >
              Email
            </a>
            <a
              href="/aboutus"
              className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
            >
              About RoomGi
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FounderPage;
