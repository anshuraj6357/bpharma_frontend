// File: CEOPage.jsx
import React from "react";
import { Helmet } from "react-helmet";

const CEOPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* SEO Meta Tags */}
      <Helmet>
        <title>Ayush Raj | CEO of RoomGi Pvt. Ltd. - Student & Professional Housing</title>
        <meta
          name="description"
          content="Ayush Raj, CEO of RoomGi Pvt. Ltd., drives innovative housing solutions for students and young professionals across India. Explore his achievements, vision, and career milestones."
        />
        <meta
          name="keywords"
          content="Ayush Raj, RoomGi CEO, Student Housing India, PG Booking India, Hostel Booking India, Professional Stays, Innovation in Education, CEO Profile India"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Ayush Raj | CEO of RoomGi Pvt. Ltd." />
        <meta property="og:description" content="Discover the visionary CEO of RoomGi Pvt. Ltd., Ayush Raj, driving innovation in student and professional housing across India." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://yourdomain.com/ceo" />
        <meta property="og:image" content="https://yourdomain.com/images/ceo.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ayush Raj | CEO of RoomGi Pvt. Ltd." />
        <meta name="twitter:description" content="Leading RoomGi Pvt. Ltd. to provide innovative housing solutions for students and professionals in India." />
        <meta name="twitter:image" content="https://yourdomain.com/images/ceo.jpg" />

        {/* Structured Data - Person */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ayush Raj",
            "jobTitle": "CEO",
            "worksFor": {
              "@type": "Organization",
              "name": "RoomGi Pvt. Ltd.",
              "url": "https://yourdomain.com",
              "logo": "https://yourdomain.com/images/roomgi-logo.png"
            },
            "image": "https://yourdomain.com/images/ceo.jpg",
            "url": "https://linkedin.com/in/ayushraj",
            "sameAs": [
              "https://linkedin.com/in/ayushraj",
              "https://twitter.com/roomgi",
              "https://www.instagram.com/roomgi",
              "https://www.facebook.com/roomgi"
            ],
            "description": "Ayush Raj, CEO of RoomGi Pvt. Ltd., empowers students and professionals with innovative housing solutions across India.",
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "XYZ University"
            },
            "award": [
              "Best Young Entrepreneur 2024 - India Startup Awards",
              "Innovative Housing Leader 2025 - National Education Forum"
            ]
          })}
        </script>

        {/* FAQ JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Who is Ayush Raj?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ayush Raj is the CEO of RoomGi Pvt. Ltd., driving innovative student and professional housing solutions across India."
                }
              },
              {
                "@type": "Question",
                "name": "What is his vision?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "His vision is to create an ecosystem where students and young professionals can access verified, innovative, and affordable housing solutions while gaining practical skills and industry exposure."
                }
              },
              {
                "@type": "Question",
                "name": "What are his achievements?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "He has organized national-level hackathons, mentored hundreds of students, and led RoomGi Pvt. Ltd. to become a trusted platform for verified accommodations."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Ayush Raj</h1>
          <p className="text-2xl md:text-3xl">CEO, RoomGi Pvt. Ltd.</p>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Driving innovation in student and professional housing across India.
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Photo */}
        <div className="flex-shrink-0">
          <img
            src="/images/ceo.jpg"
            alt="Ayush Raj - CEO of RoomGi"
            className="rounded-2xl shadow-2xl w-80 md:w-96 mx-auto"
          />
        </div>

        {/* Bio */}
        <div className="md:flex-1 space-y-8">
          <h2 className="text-3xl font-semibold text-gray-800">About Ayush Raj</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Ayush Raj, the CEO of RoomGi Pvt. Ltd., is a visionary leader committed to transforming student and professional housing in India. With extensive experience in technology, operations, and education, he focuses on creating safe, verified, and tech-enabled accommodation solutions for students and young professionals.
          </p>

          {/* Career Timeline */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Career Milestones</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>2023: Appointed CEO of RoomGi Pvt. Ltd.</li>
              <li>2023: Launched RoomGi Open Innovation Hackathon to empower students</li>
              <li>2024: Recognized as Best Young Entrepreneur - India Startup Awards</li>
              <li>2025: Expanded RoomGi platform across 15+ major Indian cities</li>
            </ul>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Awards & Recognitions</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Best Young Entrepreneur 2024 - India Startup Awards</li>
              <li>Innovative Housing Leader 2025 - National Education Forum</li>
              <li>Mentored hundreds of students and startups</li>
              <li>Published articles in national media on student housing innovation</li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Vision & Mission</h3>
            <p className="text-gray-700 italic">
              “To create an ecosystem where students and professionals can explore, innovate, and transform their ideas into reality while gaining industry exposure and practical skills.”
            </p>
          </div>

          {/* Contact / Social */}
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="https://linkedin.com/in/ayushraj"
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

export default CEOPage;
