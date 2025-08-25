import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Add this import
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

// Create a Home component with your existing content
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
            <header>
            </header>
            <main
                className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center bg-cover bg-center relative"
                style={{
                    backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
            >
                {/* Content container with better responsive spacing */}
                <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
                    {/* Main heading with improved typography scaling */}
                    <div className="w-full">
                        <h1
                            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight font-light tracking-wide"
                            style={{ fontFamily: "Crimson Text, serif" }}
                        >
                            Welcome to{" "}
                            <span className="block sm:block md:inline lg:inline text-[#d4af7a] font-normal mt-2 sm:mt-2 md:mt-0 lg:mt-0">
              deWave Academy
            </span>
                        </h1>
                    </div>

                    {/* Subtitle with better contrast and spacing */}
                    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                        <p className="text-gray-100 text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed font-light opacity-90">
                            Discover excellence in education with our comprehensive learning platform designed for your success
                        </p>
                    </div>

                    {/* CTA button with enhanced design */}
                    <div className="pt-4 sm:pt-6 md:pt-8">
                        <button className="group inline-flex items-center px-8 py-4 md:px-10 md:py-5 bg-[#d4af7a] text-gray-900 font-semibold text-base md:text-lg rounded-full shadow-2xl hover:bg-[#e6c490] hover:shadow-3xl transform hover:scale-105 transition-all duration-300 ease-out border-2 border-transparent hover:border-[#f5e6d3]">
                            <span className="mr-3">Get Started</span>
                            <svg
                                ref={svgRef}
                                className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                    {/* Optional: Add some visual elements */}
                    <div className="hidden lg:block absolute top-20 left-10 w-32 h-32 bg-[#d4af7a] opacity-10 rounded-full blur-3xl"></div>
                    <div className="hidden lg:block absolute bottom-20 right-10 w-40 h-40 bg-[#836953] opacity-10 rounded-full blur-3xl"></div>
                </div>

                {/* Optional: Scroll indicator for better UX */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-light">Scroll to explore</span>
                        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
                        </div>
                    </div>
                </div>
            </main>
            <Affiliates />
            <CoursesSection />
            <BlogCarouselSection />
            <TestimonialSection />
            <SignUpSection />
        </>
    );
};

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Routes container that will expand */}
                <Navbar />

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/course/:courseId" element={<CourseDetailPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/course" element={<CoursePage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:blogId" element={<BlogDetail />} />
                    </Routes>
                </main>

                {/* Footer stays at bottom */}
                <Footer />
            </div>
        </Router>
    );
}


export default App