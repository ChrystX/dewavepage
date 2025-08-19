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
import RecentPostsCarousel from "./components/recent-post-carousel.jsx";

// Create a Home component with your existing content
const HomePage = () => {
    const svgRef = useRef(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        gsap.to(svgRef.current, {
            x: 5,
            duration: 0.8,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
        });
    }, []);


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://dewavefreeapi20250731173800.azurewebsites.net/api/blogs');
                if (!response.ok) throw new Error("Failed to fetch blogs");
                const data = await response.json();
                setBlogs(data.slice(0, 8)); // take top 8 for carousel
            } catch (err) {
                setError(err.message);
                setBlogs([]); // fallback empty
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <>
            <header>
            </header>
            <main className='w-full min-h-screen bg-center bg-cover items-center justify-center flex'
                  style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('src/assets/hero-bg2.JPG')"}}>
                <div className={"flex flex-col items-center text-center space-y-6"}>
                    <h1
                        className="text-white text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight px-4"
                        style={{ fontFamily: "Crimson Text, serif" }}
                    >
                        Welcome to{" "}
                        <span className="block sm:inline text-[#836953]">
                            deWave Academy
                        </span>
                    </h1>

                    <p className="entry-text ">This thing do not render under the h1 tag</p>
                    <button className="button-main in-hover:">
                        <span>Explore</span>
                        <svg
                            ref={svgRef}
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </main>

            <Affiliates />
            <CoursesSection />


            {/* IMPROVED CAROUSEL SECTION */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-[#836953]/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                            <svg className="w-4 h-4 text-[#836953]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            <span className="text-sm font-medium text-[#836953]">Latest Insights</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Recent <span className="text-[#836953]">Stories</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            Discover the latest insights, tutorials, and expert perspectives from our community
                        </p>

                        <div className="relative mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-[#836953] to-transparent rounded-full mt-6"></div>
                    </div>

                    {/* Carousel Container with Loading States */}
                    <div className="relative">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="w-8 h-8 border-2 border-[#836953] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading stories...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                <p className="text-gray-500 mb-4">Unable to load recent stories</p>
                                <a
                                    href="/blog"
                                    className="inline-flex items-center gap-2 text-[#836953] hover:text-[#836953]/80 transition-colors"
                                >
                                    <span>View All Stories</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        ) : blogs.length > 0 ? (
                            <>
                                <RecentPostsCarousel blogs={blogs} />

                                {/* Call-to-Action */}
                                <div className="text-center mt-8">
                                    <a
                                        href="/blog"
                                        className="inline-flex items-center gap-2 bg-[#836953] hover:bg-[#836953]/90 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                                    >
                                        <span>Explore All Stories</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                                <p className="text-gray-500">No stories available yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

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