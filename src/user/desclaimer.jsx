import { Helmet } from "react-helmet";

export default function Disclaimer() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-16 px-6">
      <Helmet>
        <title>Disclaimer | Roomgi Private Limited</title>
        <meta
          name="description"
          content="Read the official disclaimer of Roomgi Private Limited regarding the accuracy, reliability, and usage of information provided on its website. Legal notice for users."
        />
        <link rel="canonical" href="https://www.roomgi.com/disclaimer" />
        <meta property="og:title" content="Disclaimer | Roomgi Pvt Ltd" />
        <meta
          property="og:description"
          content="Official disclaimer of Roomgi Private Limited. All information on this website is for general informational purposes only."
        />
        <meta property="og:url" content="https://www.roomgi.com/disclaimer" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Roomgi" />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-lg border">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Disclaimer
        </h1>

        <p className="text-gray-700 mb-4">
          The information provided on <strong>Roomgi.com</strong> and its affiliated platforms is for general informational purposes only. While we strive to ensure that the content on this website is accurate, complete, and up-to-date, <strong>Roomgi Private Limited</strong> makes no warranties or representations of any kind regarding the accuracy, reliability, or completeness of the information.
        </p>

        <p className="text-gray-700 mb-4">
          Users are advised to independently verify any information before making decisions or taking action based on the content provided. Roomgi Private Limited is not responsible for any loss, damage, or inconvenience caused due to reliance on the information available on this website.
        </p>

        <p className="text-gray-700 mb-4">
          Any external links provided on our website are for convenience only. Roomgi Private Limited does not endorse, control, or take responsibility for the content of external sites.
        </p>

        <p className="text-gray-700 mb-4">
          By using our website, you agree to this disclaimer and understand that Roomgi Private Limited shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or the information contained herein.
        </p>

        <p className="text-gray-700 mb-4">
          This disclaimer is subject to change without prior notice. Please check this page regularly for updates.
        </p>

        <p className="text-gray-600 text-sm text-center mt-8">
          © 2026 Roomgi Private Limited. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
