import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BlogPage from "./pages/BlogPage";
import BlogSinglePage from "./pages/BlogSinglePage";
import ContactPage from "./pages/ContactPage";
import ReviewPage from "./pages/ReviewPage";
import GalleryPage from "./pages/GalleryPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogSinglePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
