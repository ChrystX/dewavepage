import './App.css'
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'; // Add this import
import Navbar from "./components/navbar.jsx";
import {useEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import CoursesSection from "./sections/course_sections.jsx";
import Affiliates from "./sections/trustedsection.jsx";
import SignUpSection from "./sections/signupsection.jsx";
import TestimonialSection from "./sections/testimonial.jsx";
import Footer from "./components/footer.jsx";
import CourseDetailPage from "./Page/course_detail.jsx";
import AboutPage from "./Page/about.jsx";
import CoursePage from "./Page/course-page.jsx";
import BlogPage from "./Page/blog-page.jsx";
import BlogDetail from "./Page/blog-detail.jsx";
import BlogCarouselSection from "./sections/blog-section.jsx";
import SweeperSection from "./sections/sweeper-section.jsx";
import CategoryCourseSection from "./sections/category-course-section.jsx";
import AdminApplicationDashboard from "./admin_page/application_page.jsx";
import AdminCourseDashboard from "./admin_page/admin_course_page.jsx";
import AdminCategoryDashboard from "./admin_page/category_page.jsx";
import Test from "./Page/test.jsx";
import AdminBlogDashboard from "./admin_page/admin_blog_page.jsx";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-300">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
                <p className="text-gray-500 mt-4 mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <div className="space-x-4">
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Go Back
                    </button>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-[#d4af7a] text-gray-900 rounded-lg hover:bg-[#e6c490] transition-colors"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        gsap.to(svgRef.current, {
            x: 5,
            duration: 0.8,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
        });
    }, []);

    return (
        <>
            <header></header>
            <main
                className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative"
                style={{
                    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://i.imgur.com/17Pej2Z.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Content container with responsive spacing */}
                <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 w-full max-w-full mx-auto text-center">
                    {/* Main heading */}
                    <h1
                        className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-light tracking-wide"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                        Welcome to{" "}
                        <span className="text-[#e91e63] font-normal block md:inline mt-2 md:mt-0">
                            deWave Academy
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-100 text-sm sm:text-lg md:text-xl lg:text-xl leading-relaxed font-light opacity-90 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                        Master the art of beauty with our comprehensive training programs in massage, lashes, nails, makeup, and waxing
                    </p>

                    {/* CTA button */}
                    <div className="pt-4 sm:pt-6 md:pt-8 w-full flex justify-center">
                        <button className="group inline-flex items-center px-6 py-3 md:px-10 md:py-5 bg-[#e91e63] text-white font-semibold text-sm md:text-lg rounded-full shadow-2xl hover:bg-[#c2185b] hover:shadow-3xl transform hover:scale-105 transition-all duration-300 ease-out border-2 border-transparent hover:border-[#f8bbd9]">
                            <span className="mr-3">Start Your Journey</span>
                            <svg
                                ref={svgRef}
                                className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                    {/* Optional visual pink accents */}
                    <div className="hidden lg:block absolute top-20 left-10 w-32 h-32 bg-[#e91e63] opacity-10 rounded-full blur-3xl"></div>
                    <div className="hidden lg:block absolute bottom-20 right-10 w-40 h-40 bg-[#c2185b] opacity-10 rounded-full blur-3xl"></div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs sm:text-sm font-light">Scroll to explore</span>
                        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
                            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2 animate-bounce"></div>
                        </div>
                    </div>
                </div>
            </main>

            <Affiliates />
            <CategoryCourseSection />
            <SweeperSection />
            <BlogCarouselSection />
            <TestimonialSection />
            <SignUpSection />
        </>
    );
};



function Layout({ children }) {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <div className="flex flex-col min-h-screen">
            {/* Show Navbar only if not admin */}
            {!isAdminRoute && <Navbar />}

            <main className="flex-grow">{children}</main>

            {/* Footer stays at bottom always */}
            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/course/:courseId" element={<CourseDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/course" element={<CoursePage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:blogId" element={<BlogDetail />} />
                    <Route path="*" element={<NotFoundPage />} />

                    {/* Admin routes */}
                    <Route path="/admin/application" element={<AdminApplicationDashboard />} />
                    <Route path="/admin/categories" element={<AdminCategoryDashboard />} />
                    <Route path="/admin/courses" element={<AdminCourseDashboard />} />
                    <Route path="/admin/blogs" element={<AdminBlogDashboard />} />

                    <Route path="/test" element={<Test />} />
                </Routes>
            </Layout>
        </Router>
    );
}


export default App