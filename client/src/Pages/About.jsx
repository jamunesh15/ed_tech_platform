


import React from 'react';
import HighlightText from '../coponents/homecompo/Highlighttext';
import about1 from '../assets/Images/aboutus1.webp';
import about2 from '../assets/Images/aboutus2.webp';
import about3 from '../assets/Images/aboutus3.webp';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';
import foundImg from '../assets/Images/FoundingStory.png';
import Stats from '../coponents/aboutcompo/Stats';
import Learninggrid from '../coponents/aboutcompo/Learninggrid';
import Contactform from '../coponents/aboutcompo/Contactform';
import Footer from '../coponents/Footer';
import Reviewandratingslider from '../coponents/homecompo/Reviewandratingslider';
import './about.css';

const About = () => {
  return (
    <div className="min-h-screen w-full bg-richblack-900 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-richblack-800 py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-richblack-5 leading-tight mb-4 sm:mb-6">
            Driving Innovation in Online Education for a{' '}
            <HighlightText text="Brighter Future" />
          </h1>
          <p className="text-richblack-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Studynotion is at the forefront of driving innovation in online education. We're
            passionate about creating a brighter future by offering cutting-edge courses,
            leveraging emerging technologies, and nurturing a vibrant learning community.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {[about1, about2, about3].map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl shadow-lg shadow-caribbeangreen-300 hover:shadow-yellow-200 transition-all duration-300"
              >
                <img
                  src={img}
                  className="w-full h-48 sm:h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
                  alt={`About us image ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full bg-richblack-900 py-8 sm:py-12 relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-richblack-800"></div>
        <blockquote className="max-w-4xl mx-auto relative px-4 sm:px-6 text-center">
          <RiDoubleQuotesL className="absolute -left-2 -top-2 text-richblack-100 text-xl sm:text-2xl" />
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-richblack-5">
            We are passionate about revolutionizing the way we learn. Our innovative
            platform combines technology, expertise, and community to create an
            unparalleled educational experience.
          </p>
          <RiDoubleQuotesR className="absolute -right-2 -bottom-2 text-richblack-100 text-xl sm:text-2xl" />
        </blockquote>
      </section>

      {/* Founding Story Section */}
      <section className="w-full bg-richblack-900 py-10 sm:py-16 px-4 sm:px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-richblack-800"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 sm:gap-12 items-center">
          <div className="md:w-1/2 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-300">
              Our Founding Story
            </h2>
            <div className="space-y-4 text-richblack-100 text-sm sm:text-base">
              <p className="leading-relaxed">
                Our e-learning platform was born out of a shared vision and passion for
                transforming education. It all began with a group of educators,
                technologists, and lifelong learners who recognized the need for accessible,
                flexible, and high-quality learning opportunities in a rapidly evolving
                digital world.
              </p>
              <p className="leading-relaxed">
                As experienced educators ourselves, we witnessed firsthand the limitations
                and challenges of traditional education systems. We believed that education
                should not be confined to the walls of a classroom or restricted by
                geographical boundaries.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative group">
              <img
                src={foundImg}
                className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-xl shadow-brown-500/50 group-hover:shadow-caribbeangreen-300/50 transition-all duration-300"
                alt="Founding team"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-caribbeangreen-400/10 rounded-2xl group-hover:bg-transparent transition-colors duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Stats />
      </section>

      {/* Learning Grid Section */}
      <section className="w-full py-8 sm:py-12">
        <Learninggrid />
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-8 sm:py-12">
        <Contactform />
      </section>

      {/* Review and Rating Section */}
      <section className="w-full py-8 sm:py-12">
        <Reviewandratingslider />
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-richblack-800 py-8 sm:py-12">
        <Footer />
      </footer>
    </div>
  );
};

export default About;