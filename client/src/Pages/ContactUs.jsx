import React from 'react'
import Contactform from '../coponents/aboutcompo/Contactform'
import Footer from '../coponents/Footer'
import { IoIosChatbubbles } from "react-icons/io";
import { FaEarthEurope } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import Reviewslider from '../coponents/common/Reviewslider';
import Reviewandratingslider from '../coponents/homecompo/Reviewandratingslider';

const ContactUs = () => {
  const posterdata = [
    {
      logo: <IoIosChatbubbles className="text-2xl sm:text-3xl" />,
      heading: 'Chat on Us',
      description: 'Our friendly team is here to help.',
      connect: 'jsheta15@gmail.com',
    },
    {
      logo: <FaEarthEurope className="text-2xl sm:text-3xl" />,
      heading: 'Visit Us',
      description: 'Come and say hello at our office HQ.',
      connect: '123 Learning Lane, Education City, EC 12345',
    },
    {
      logo: <IoCall className="text-2xl sm:text-3xl" />,
      heading: 'Call Us',
      description: 'Mon - Fri From 8am to 5pm',
      connect: '+91 9909246267',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 gap-6 sm:gap-8">
        {/* Left Side - Contact Info */}
        <div className="w-full lg:w-2/5 bg-richblack-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-center space-y-6 sm:space-y-8">
          {posterdata.map((element, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 sm:gap-3"
              role="article"
              aria-labelledby={`contact-heading-${index}`}
            >
              <div className="flex items-center gap-3 sm:gap-4 text-richblack-5">
                <div className="flex-shrink-0">{element.logo}</div>
                <h2
                  id={`contact-heading-${index}`}
                  className="text-lg sm:text-xl md:text-2xl font-semibold"
                >
                  {element.heading}
                </h2>
              </div>
              <div>
                <p className="text-richblack-100 text-sm sm:text-base leading-relaxed">
                  {element.description}
                </p>
                <p className="text-richblack-5 text-sm sm:text-base mt-1 font-medium">
                  {element.connect}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full lg:w-3/5 border border-richblack-300 rounded-2xl p-4 sm:p-6">
          <Contactform />
        </div>
      </div>

      {/* Review and Rating Section */}
      <div className="w-full py-8 sm:py-12">
        <Reviewandratingslider />
      </div>

      {/* Footer */}
      <footer className="w-full bg-richblack-800 py-8 sm:py-12 px-4 sm:px-6">
        <Footer />
      </footer>
    </div>
  );
};

export default ContactUs;