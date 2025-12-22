import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LandingPage from './components/LandingPage';
import TenantDashboard from "./components/trackrentdashboard";
import PGDetailsPage from './components/PGDetailsPage';
import PGMap from "./components/pgmap.jsx";
import AuthModal from "./components/AuthModal";
import Wishlist from "./components/wishlist";
import CancellationPolicy from "./components/cancilationandrefundpolicy";
import ContactUs from "./components/contactus";
import PrivacyPolicy from "./components/privacypolicy";
import TermsConditions from "./components/termsandcondition";
import ShippingPolicy from "./components/shippingpolicy";
import HelpCenter from "./components/HelpCenter.jsx";
import FAQs from "./components/FAQs.jsx";
import CustomerSupport from "./components/CustomerSupport.jsx";
import PartnerWithRoomgi from "./components/PartnerWithRoomgi.jsx";
import AboutUs from "./components/AbutUs.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Searched from "./components/filtered.jsx";
import AllPotos from "./components/allphotos";
import DashboardHeader from "./admin/header";
import AdminApp from "./admin/AdminApp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { hydrateUser } from "./Bothfeatures/features/authSlice";
import ProtectedRoute from "./userprotectedroutes";
import Bookings from "./components/booking";
import CreateComplaint from "./components/complain";
import ComplaintsPage from "./components/mycomplain"
import Profile from "./components/myprofile"
import SignupSuccess from "./components/signupsuccess";
import ScrollToTop from "./components/ScrollToTop";
import BookingSuccess from "./components/bookingssuccess"
import PayRentPanel from "./components/payrent";
import WishlistPage from "./components/wishlistdetails";
















function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hydrate user from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("user");
    try {
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed) {
        dispatch(hydrateUser({ user: parsed, isAuthenticated: true }));
      }
    } catch (e) {
      console.warn("Invalid user in localStorage. Clearing...");
      localStorage.removeItem("user");
      dispatch(hydrateUser({ user: null, isAuthenticated: false }));
    }
  }, [dispatch]);

  // Admin roles
  const isAdminRoute =
    user?.role === "owner" || user?.role === "branch-manager";
  const UserRoutes =
    user?.role === "owner" || user?.role === "branch-manager";

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {isAdminRoute ? (
        <DashboardHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      ) : (
        <Header />
      )}

      {/* Main content */}
      <main className="flex-1">
        <ScrollToTop />
        <Routes>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/allpotos/:id" element={<AllPotos />} />
            <Route path="/pg/:id" element={<PGDetailsPage />} />
            <Route path="/PGMap/:branchId" element={<PGMap />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/Wishlistdetails/:id" element={<TenantDashboard />} />
            <Route path="/search/:city" element={<Searched />} />
            <Route path="/complain/:branchId" element={<CreateComplaint />} />
            <Route path="/mycomplain" element={<ComplaintsPage />} />
            <Route path="/myprofile" element={<Profile />} />
            <Route path="/signup-success" element={<SignupSuccess />} />
            <Route path="/bookingssuccess" element={<BookingSuccess />} />

            <Route path="/mybooking" element={<Bookings />} />
            <Route path="/Wishlistdetails" element={<WishlistPage />} />


          </Route>

          {/* Public Routes */}
          <Route path="/CancellationPolicy" element={<CancellationPolicy />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandcondition" element={<TermsConditions />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/customersupport" element={<CustomerSupport />} />
          <Route path="/partnerwithroomgi" element={<PartnerWithRoomgi />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payrent/:id" element={<PayRentPanel />} />


          {/* Admin */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* Auth */}
          <Route path="/login" element={<AuthModal />} />

        </Routes>
      </main>


      {/* Conditional Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;