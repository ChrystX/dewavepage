import React from 'react';
import { MapPin, Phone, Clock, Users, Award, Heart, Star, Calendar, Trophy, BookOpen } from 'lucide-react';
import FAQ from "../components/about-faq.jsx";
import LocationSection from "../sections/map-section.jsx";

const AboutPage = () => {
    const googleMapsApiKey = import.meta.env?.VITE_GOOGLE_MAPS_API_KEY;
    const mapLat = -7.8213449;
    const mapLng = 110.3656522;

    const mapUrl = googleMapsApiKey
        ? `https://maps.googleapis.com/maps/api/staticmap?center=${mapLat},${mapLng}&zoom=15&size=400x300&maptype=roadmap&markers=color:red|${mapLat},${mapLng}&key=${googleMapsApiKey}`
        : null;

    return (
        <div className="min-h-screen bg-white"
             style={{ paddingTop: "128px" }} >
            {/* Vision Section */}
            <section className="py-20" style={{ backgroundColor: '#836953' }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">Our Vision</h2>
                            <p className="text-xl md:text-2xl text-white opacity-90 leading-relaxed mb-8">
                                To empower individuals with the artistry and technical skills needed to excel in the beauty industry,
                                fostering creativity while maintaining the highest standards of professionalism and innovation.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8 text-left">
                                <div>
                                    <h3 className="text-2xl font-light text-white mb-4">Our Mission</h3>
                                    <p className="text-white opacity-80 leading-relaxed">
                                        We are committed to providing comprehensive, hands-on beauty education that transforms passion
                                        into expertise. Through personalized instruction and industry-relevant curriculum, we prepare
                                        our students to become confident, skilled beauty professionals.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-light text-white mb-4">Our Values</h3>
                                    <ul className="text-white opacity-80 space-y-2">
                                        <li>• Excellence in education and technique</li>
                                        <li>• Individual attention and mentorship</li>
                                        <li>• Ethical and sustainable practices</li>
                                        <li>• Continuous learning and innovation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Cards Section */}
            <section className="py-16 -mt-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4" style={{ borderTopColor: '#836953' }}>
                            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#836953' }}>
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-3xl font-light mb-2" style={{ color: '#836953' }}>500+</div>
                            <p className="text-gray-600 font-medium">Graduates</p>
                            <p className="text-sm text-gray-500 mt-1">Successfully certified</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4" style={{ borderTopColor: '#836953' }}>
                            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#836953' }}>
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-3xl font-light mb-2" style={{ color: '#836953' }}>95%</div>
                            <p className="text-gray-600 font-medium">Job Placement</p>
                            <p className="text-sm text-gray-500 mt-1">Within 6 months</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4" style={{ borderTopColor: '#836953' }}>
                            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#836953' }}>
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-3xl font-light mb-2" style={{ color: '#836953' }}>6</div>
                            <p className="text-gray-600 font-medium">Years Experience</p>
                            <p className="text-sm text-gray-500 mt-1">In beauty education</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4" style={{ borderTopColor: '#836953' }}>
                            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#836953' }}>
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-3xl font-light mb-2" style={{ color: '#836953' }}>4.9</div>
                            <p className="text-gray-600 font-medium">Student Rating</p>
                            <p className="text-sm text-gray-500 mt-1">Average satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            <LocationSection apiKey={googleMapsApiKey} lat={mapLat} lng={mapLng} />

            {/* CEO Letter Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className="bg-gray-100 h-96 lg:h-auto flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <p className="text-gray-600">CEO Photo</p>
                                    </div>
                                    <h3 className="text-xl font-medium" style={{ color: '#836953' }}>Sarah Johnson</h3>
                                    <p className="text-gray-600">Founder & CEO</p>
                                </div>
                            </div>

                            <div className="p-8 lg:p-12">
                                <h2 className="text-3xl font-light mb-6" style={{ color: '#836953' }}>A Message from Our Founder</h2>
                                <div className="prose prose-lg text-gray-600 leading-relaxed">
                                    <p className="mb-4">
                                        "When I founded this academy six years ago, I had a simple yet profound vision: to create
                                        a space where beauty enthusiasts could transform their passion into professional expertise."
                                    </p>

                                    <p className="mb-4">
                                        "Having worked in the beauty industry for over 15 years, I witnessed the gap between
                                        traditional beauty education and what the modern industry truly demands. Our curriculum
                                        bridges this gap by combining timeless techniques with contemporary trends and business acumen."
                                    </p>

                                    <p className="mb-4">
                                        "Every student who walks through our doors brings unique dreams and aspirations. Our role
                                        is not just to teach techniques, but to nurture confidence, creativity, and the entrepreneurial
                                        spirit needed to thrive in this dynamic field."
                                    </p>

                                    <p>
                                        "I'm proud of the community we've built and the success stories of our graduates. Together,
                                        we're not just learning about beauty – we're creating it."
                                    </p>

                                    <div className="mt-6">
                                        <div className="text-lg font-medium" style={{ color: '#836953' }}>Sarah Johnson</div>
                                        <div className="text-gray-500">Licensed Beauty Professional & Educator</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-light mb-4" style={{ color: '#836953' }}>Our Story</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            From humble beginnings to becoming Yogyakarta's premier beauty education destination
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#836953' }}>
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-medium mb-3" style={{ color: '#836953' }}>2018 - Founded</h3>
                            <p className="text-gray-600">
                                Started with a dream to provide quality beauty education in Yogyakarta,
                                beginning with just 10 students and a small studio.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#836953' }}>
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-medium mb-3" style={{ color: '#836953' }}>2021 - Certified</h3>
                            <p className="text-gray-600">
                                Received official accreditation and expanded our facilities to accommodate
                                growing demand for professional beauty education.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#836953' }}>
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-medium mb-3" style={{ color: '#836953' }}>2024 - Community</h3>
                            <p className="text-gray-600">
                                Now a thriving community of over 500 graduates, with partnerships across
                                Indonesia's beauty industry and continuing education programs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />

        </div>
    );
};

export default AboutPage;