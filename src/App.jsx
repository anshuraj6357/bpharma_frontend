import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BranchRoomsPage from "./user/branch-rooms.jsx"
import LandingPage from './user/LandingPage';
import TenantDashboard from "./user/trackrentdashboard";
import PGDetailsPage from './user/PGDetailsPage';
import PGMap from "./user/pgmap.jsx";
import AuthModal from "./user/AuthModal";
import Wishlist from "./user/wishlist";
import CancellationPolicy from "./user/cancilationandrefundpolicy";
import ContactUs from "./user/contactus";
import PrivacyPolicy from "./user/privacypolicy";
import TermsConditions from "./user/termsandcondition";
import ShippingPolicy from "./user/shippingpolicy";
import HelpCenter from "./user/HelpCenter.jsx";
import FAQs from "./user/FAQs.jsx";
import Career from "./user/career.jsx";
import CustomerSupport from "./user/CustomerSupport.jsx";
import PartnerWithRoomgi from "./user/PartnerWithRoomgi.jsx";
import AboutUs from "./user/AbutUs.jsx";
import About from "./user/About.jsx";
import Contact from "./user/Contact.jsx";
import Searched from "./user/filtered.jsx";
import AllPotos from "./user/allphotos";
import DashboardHeader from "./owner/header";
import AdminApp from "./owner/AdminApp";
import Header from "./user/Header";
import Footer from "./user/Footer";
import { hydrateUser } from "./backend-routes/slice/authSlice";
import ProtectedRoute from "./protectedroutes/userprotectedroutes";
import Bookings from "./user/booking";
import CreateComplaint from "./user/complain";
import ComplaintsPage from "./user/mycomplain"
import Profile from "./user/myprofile"
import SignupSuccess from "./user/signupsuccess";
import ScrollToTop from "./user/ScrollToTop";
import BookingSuccess from "./user/bookingssuccess"
import PayRentPanel from "./user/payrent";
import WishlistPage from "./user/wishlistdetails";
import FounderPage from "./user/founderpage.jsx"
import Disclaimer from "./user/desclaimer.jsx";
import InternshipCertificate from "./user/InternshipCertificate";
import ReportIssue from "./user/reportanissue.jsx"
import MissionVision from "./user/missionandvision.jsx"
import WhyRoomgi from "./user/why-roomgi.jsx"
import SafetyGuidelinesPage from "./user/safetyguidlinepage.jsx"












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
const isAdminRoute = Array.isArray(user?.role)
  ? user.role.includes("owner") || user.role.includes("branch-manager")
  : user?.role === "owner" || user?.role === "branch-manager";

  console.log(isAdminRoute)
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
           <Route path="/career" element={<Career />} />
          <Route path="/customersupport" element={<CustomerSupport />} />
          <Route path="/partnerwithroomgi" element={<PartnerWithRoomgi />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payrent/:id" element={<PayRentPanel />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/internship-certificate"element={<InternshipCertificate />}/>
          <Route path="/branch-rooms/:id" element={<BranchRoomsPage/>}/>
                    <Route path="/reportissue" element={<ReportIssue />} />
<Route path="/mission" element={<MissionVision/>}></Route>
<Route path="/why-roomgi" element={<WhyRoomgi/>}></Route>
<Route path="/safety-guidelines" element={<SafetyGuidelinesPage/>}></Route>


          {/* Admin */}

  <Route path="/admin/*" element={<AdminApp />} />


 <Route path="/login" element={<AuthModal />} />


        </Routes>
      </main>


      {/* Conditional Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;