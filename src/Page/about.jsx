import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Users, Award, Heart, Star, Calendar, Trophy, BookOpen } from 'lucide-react';
import LocationSection from "../sections/map-section.jsx";

// Note: LocationSection should be imported from a separate component file
// import LocationSection from '../components/LocationSection';

// For this demo, we'll include a placeholder comment
// In your actual implementation, remove the LocationSection component code from here
// and import it from '../components/LocationSection.jsx' or similar

// Animation hook for intersection observer
const useInView = (threshold = 0.1) => {
    const [isInView, setIsInView] = useState(false);
    const [elementRef, setElementRef] = useState(null);

    useEffect(() => {
        if (!elementRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold }
        );

        observer.observe(elementRef);
        return () => observer.disconnect();
    }, [elementRef, threshold]);

    return [setElementRef, isInView];
};

const awards = [
    "/20 BEST CHOICE BUSINESS 2024.png",
    "/BEST CHOICE BUSINESS 2024.png",
    "/BEST FRANCHISE 2022.png",
    "/BUSINESS OPPORTUNITY 2022.jpg",
    "/BUSINESS OPPORTUNITY 2023.png",
    "/INDONESIA CREATIVITY & BEST LEADER AWARD 2023.png",
    "/LOGO MOST INNOVATIVE BO 2024.png",
    "/MOST PROMISING BRAND 2019.png",
    "/TOP Best Choice.png",
    "/TOP FRANCHISE 2021.png",
    "/TOP 20 BUSINESS OPPORTUNITY 2023.png",
];

// Counter animation hook
const useCounter = (end, duration = 2000, isActive = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        let startTime;
        const startCount = 0;

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
            const currentCount = startCount + (end - startCount) * easeOutQuart;

            setCount(Math.floor(currentCount));

            if (percentage < 1) {
                requestAnimationFrame(updateCount);
            }
        };

        requestAnimationFrame(updateCount);
    }, [end, duration, isActive]);

    return count;
};

// Animated stats card component
const AnimatedStatsCard = ({ icon: Icon, number, suffix = '', label, description, delay = 0, isVisible }) => {
    const animatedNumber = useCounter(parseInt(number), 2000, isVisible);
    const displayNumber = suffix === '%' ? animatedNumber : animatedNumber;

    return (
        <div
            className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center border-t-4 transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{
                borderTopColor: '#836953',
                transitionDelay: `${delay}ms`
            }}
        >
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center transform transition-transform duration-500 hover:scale-110"
                 style={{ backgroundColor: '#836953' }}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl font-light mb-2" style={{ color: '#836953' }}>
                {displayNumber}{suffix}
            </div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">{label}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{description}</p>
        </div>
    );
};

// Animated timeline card component
const TimelineCard = ({ icon: Icon, year, title, description, delay = 0, isVisible }) => (
    <div
        className={`text-center transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
    >
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 flex items-center justify-center transform transition-transform duration-500 hover:scale-110 hover:rotate-12"
             style={{ backgroundColor: '#836953' }}>
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-medium mb-3" style={{ color: '#836953' }}>{year} - {title}</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2">{description}</p>
    </div>
);

const AboutPage = () => {
    const [visionRef, visionInView] = useInView(0.2);
    const [statsRef, statsInView] = useInView(0.2);
    const [ceoRef, ceoInView] = useInView(0.2);
    const [storyRef, storyInView] = useInView(0.2);
    const [awardsRef, awardsInView] = useInView(0.2);

    return (
        <div className="min-h-screen bg-white overflow-x-hidden"
             style={{ paddingTop: "100px" }}>

            {/* Vision Section */}
            <section
                ref={visionRef}
                className="py-12 sm:py-20 relative"
                style={{ backgroundColor: '#836953' }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-light text-white mb-6 sm:mb-8 transform transition-all duration-1000 ${
                                visionInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}>
                                Our Vision
                            </h2>
                            <p className={`text-lg sm:text-xl md:text-2xl text-white opacity-90 leading-relaxed mb-6 sm:mb-8 transform transition-all duration-1000 delay-200 ${
                                visionInView ? 'translate-y-0 opacity-90' : 'translate-y-8 opacity-0'
                            }`}>
                                To empower individuals with the artistry and technical skills needed to excel in the beauty industry,
                                fostering creativity while maintaining the highest standards of professionalism and innovation.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 text-left">
                                <div className={`transform transition-all duration-1000 delay-400 ${
                                    visionInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                                }`}>
                                    <h3 className="text-xl sm:text-2xl font-light text-white mb-3 sm:mb-4">Our Mission</h3>
                                    <p className="text-white opacity-80 leading-relaxed text-sm sm:text-base">
                                        We are committed to providing comprehensive, hands-on beauty education that transforms passion
                                        into expertise. Through personalized instruction and industry-relevant curriculum, we prepare
                                        our students to become confident, skilled beauty professionals.
                                    </p>
                                </div>
                                <div className={`transform transition-all duration-1000 delay-600 ${
                                    visionInView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                                }`}>
                                    <h3 className="text-xl sm:text-2xl font-light text-white mb-3 sm:mb-4">Our Values</h3>
                                    <ul className="text-white opacity-80 space-y-2 text-sm sm:text-base">
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Excellence in education and technique
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Individual attention and mentorship
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Ethical and sustainable practices
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Continuous learning and innovation
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Cards Section */}
            <section ref={statsRef} className="py-12 sm:py-16 -mt-6 sm:-mt-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                        <AnimatedStatsCard
                            icon={Users}
                            number="500"
                            suffix="+"
                            label="Graduates"
                            description="Successfully certified"
                            delay={0}
                            isVisible={statsInView}
                        />
                        <AnimatedStatsCard
                            icon={Trophy}
                            number="95"
                            suffix="%"
                            label="Job Placement"
                            description="Within 6 months"
                            delay={200}
                            isVisible={statsInView}
                        />
                        <AnimatedStatsCard
                            icon={Calendar}
                            number="6"
                            label="Years Experience"
                            description="In beauty education"
                            delay={400}
                            isVisible={statsInView}
                        />
                        <AnimatedStatsCard
                            icon={Star}
                            number="4.9"
                            label="Student Rating"
                            description="Average satisfaction"
                            delay={600}
                            isVisible={statsInView}
                        />
                    </div>
                </div>
            </section>

            {/* CEO Letter Section */}
            <section ref={ceoRef} className="py-12 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className={`bg-gradient-to-br from-gray-100 to-gray-200 h-64 sm:h-96 lg:h-auto flex items-center justify-center transform transition-all duration-1000 ${
                                ceoInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                            }`}>
                                <div className="text-center">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-105">
                                        <p className="text-gray-600 text-xs sm:text-sm">CEO Photo</p>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-medium" style={{ color: '#836953' }}>Sarah Johnson</h3>
                                    <p className="text-gray-600 text-sm sm:text-base">Founder & CEO</p>
                                </div>
                            </div>

                            <div className={`p-6 sm:p-8 lg:p-12 transform transition-all duration-1000 delay-300 ${
                                ceoInView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                            }`}>
                                <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6" style={{ color: '#836953' }}>
                                    A Message from Our Founder
                                </h2>
                                <div className="prose prose-sm sm:prose-lg text-gray-600 leading-relaxed">
                                    <p className="mb-4 text-sm sm:text-base">
                                        "When I founded this academy six years ago, I had a simple yet profound vision: to create
                                        a space where beauty enthusiasts could transform their passion into professional expertise."
                                    </p>

                                    <p className="mb-4 text-sm sm:text-base">
                                        "Having worked in the beauty industry for over 15 years, I witnessed the gap between
                                        traditional beauty education and what the modern industry truly demands. Our curriculum
                                        bridges this gap by combining timeless techniques with contemporary trends and business acumen."
                                    </p>

                                    <p className="mb-4 text-sm sm:text-base">
                                        "Every student who walks through our doors brings unique dreams and aspirations. Our role
                                        is not just to teach techniques, but to nurture confidence, creativity, and the entrepreneurial
                                        spirit needed to thrive in this dynamic field."
                                    </p>

                                    <p className="text-sm sm:text-base">
                                        "I'm proud of the community we've built and the success stories of our graduates. Together,
                                        we're not just learning about beauty – we're creating it."
                                    </p>

                                    <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                                        <div className="text-base sm:text-lg font-medium" style={{ color: '#836953' }}>Sarah Johnson</div>
                                        <div className="text-gray-500 text-xs sm:text-sm">Licensed Beauty Professional & Educator</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <LocationSection lat={-7.8213449} lng={110.3656522} />

            {/* Our Story Section */}
            <section ref={storyRef} className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
                        storyInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                        <h2 className="text-3xl sm:text-4xl font-light mb-4" style={{ color: '#836953' }}>Our Story</h2>
                        <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto px-4">
                            From humble beginnings to becoming Yogyakarta's premier beauty education destination
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                        <TimelineCard
                            icon={BookOpen}
                            year="2018"
                            title="Founded"
                            description="Started with a dream to provide quality beauty education in Yogyakarta, beginning with just 10 students and a small studio."
                            delay={0}
                            isVisible={storyInView}
                        />
                        <TimelineCard
                            icon={Award}
                            year="2021"
                            title="Certified"
                            description="Received official accreditation and expanded our facilities to accommodate growing demand for professional beauty education."
                            delay={200}
                            isVisible={storyInView}
                        />
                        <TimelineCard
                            icon={Heart}
                            year="2024"
                            title="Community"
                            description="Now a thriving community of over 500 graduates, with partnerships across Indonesia's beauty industry and continuing education programs."
                            delay={400}
                            isVisible={storyInView}
                        />
                    </div>
                </div>
            </section>

            <section ref={awardsRef} className="w-full bg-gray-50 py-12">
                <div className="max-w-6xl mx-auto text-center px-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-8" style={{ color: "#836953" }}>
                        Our Awards & Recognition
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6">
                        {awards.map((src, i) => (
                            <div
                                key={i}
                                className="w-16 flex-shrink-0"
                            >
                                <img
                                    src={src}
                                    alt={`Award ${i + 1}`}
                                    className={`h-16 w-auto object-contain mx-auto transform transition-all duration-700 ${
                                        awardsInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                    }`}
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;