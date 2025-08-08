



import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

import "./home.css"
import CTAbutton from '../coponents/homecompo/CTAbutton';
import Highlighttext from '../coponents/homecompo/Highlighttext';
import bannervideo from "../assets/Images/banner.mp4"
import { TypeAnimation } from 'react-type-animation'
import Timelinesection from '../coponents/homecompo/Timelinesection';
import Learnlanguage from '../coponents/homecompo/Learnlanguage';
import instructor  from "../assets/Images/Instructor.png"
import Reviewandratingslider from '../coponents/homecompo/Reviewandratingslider';
import Navtabs from '../coponents/homecompo/Navtabs';
import Footer from '../coponents/Footer';

const Home = () => {
  return (
    <div className="bg-richblack-900">

      <div className="flex flex-col min-h-screen w-full items-center bg-richblack-900 pb-6 sm:pb-10 overflow-x-hidden">

        {/* Section 1 - Hero Section - Fully Responsive */}
        <div className='flex flex-col items-center w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8'>

          {/* Instructor CTA - Mobile Optimized */}
          <div className='shadow-md shadow-richblack-400 hover:shadow-pink-100 transition-all duration-300 text-xs sm:text-sm lg:text-base bg-richblack-800 rounded-lg text-center flex items-center justify-center mt-8 sm:mt-12 lg:mt-16 w-fit px-4 py-2 sm:px-6 sm:py-3 hover:scale-105'>
            <Link to={"/signup"}>
              <button className='flex items-center hover:text-yellow-50 transition-all duration-300 justify-center text-white gap-2'>
                <p className='hover:underline font-medium'>Become an Instructor</p>
                <FaArrowRight className='text-xs sm:text-sm transition-transform hover:translate-x-1' />
              </button>
            </Link>
          </div>

          {/* Main Heading - Mobile Optimized */}
          <div className='flex flex-col items-center mt-4 sm:mt-6 lg:mt-8 gap-1 sm:gap-2 text-center'>
            <h1 className='text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight px-2'>
              Empower Your Future With
            </h1> 
            <Highlighttext text="Coding Skills" />
          </div>

          {/* Subheading - Mobile Optimized */}
          <p className='mt-3 sm:mt-4 lg:mt-6 text-richblack-200 font-medium max-w-4xl text-center px-3 sm:px-4 text-sm sm:text-base lg:text-lg leading-relaxed'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, 
            and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
          </p>

          {/* CTA Buttons - Centered and Responsive */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 lg:mt-8 w-full justify-center items-center'>
            <CTAbutton linkto="/signup" active={true}>Learn more</CTAbutton>
            <CTAbutton linkto="/signup" active={false}>Book A Demo</CTAbutton>
          </div>
        </div>

        {/* Video Section - Mobile Optimized */}
        <div className='mt-6 sm:mt-8 lg:mt-12 w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-8'>
          <div className='relative group'>
            <video 
              className='mx-auto w-full h-40 sm:h-52 md:h-64 lg:h-80 xl:h-96 rounded-lg sm:rounded-xl shadow-xl shadow-richblack-400/20 object-cover transition-transform duration-300 group-hover:scale-[1.02]'
              src={bannervideo}
              muted
              autoPlay  
              loop
              playsInline
            ></video>
            {/* Gradient overlay */}
            <div className='absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-t from-richblack-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </div>
        </div>

        {/* Code Section 1 - Mobile Optimized */}
        <div className='mt-8 sm:mt-12 lg:mt-16 w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-8'>
          <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10'>
            
            {/* Left Content */}
            <div className='w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 rounded-xl bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <h2 className='text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-4'>
                Unlock your <span className='spantext'>coding potential</span> with our online courses.
              </h2>
              
              <p className='mb-6 sm:mb-8 text-richblack-200 text-sm sm:text-base lg:text-lg leading-relaxed'>
                Our courses are designed and taught by industry experts who have years of 
                experience in coding and are passionate about sharing their knowledge with you.
              </p>

              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 justify-center sm:justify-start items-center sm:items-start'>
                <CTAbutton active={true} linkto="/signup">
                  Try it Yourself
                </CTAbutton>
                <CTAbutton active={false} linkto="/login">
                  Learn More
                </CTAbutton>
              </div>
            </div>

            {/* Right Content - Animated Code */}
            <div className='w-full lg:w-1/2 rounded-xl overflow-hidden bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 shadow-lg'>
              <div className='flex h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 relative'>
                {/* Line Numbers */}
                <div className='text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-yellow-400 pr-2 sm:pr-3 lg:pr-4 pl-2 sm:pl-3 pt-3 sm:pt-4 text-right select-none font-mono text-xs sm:text-sm'>
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className='h-3 sm:h-4 lg:h-5 text-xs sm:text-sm'>{i + 1}</div>
                  ))}
                </div>

                {/* Animated Code */}
                <div className='flex code-animation pt-3 sm:pt-4 pr-3 sm:pr-4 lg:pr-6 overflow-hidden'>
                  <TypeAnimation
                    sequence={[
                      '<!DOCTYPE html>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n</head>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n</head>\n<body>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="/one">One</a>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="/one">One</a>\n    <a href="/two">Two</a>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="/one">One</a>\n    <a href="/two">Two</a>\n    <a href="/three">Three</a>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="/one">One</a>\n    <a href="/two">Two</a>\n    <a href="/three">Three</a>\n  </nav>\n',
                      1000,
                      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>This is myPage</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="/one">One</a>\n    <a href="/two">Two</a>\n    <a href="/three">Three</a>\n  </nav>\n</body>\n</html>',
                      3000,
                      '',
                      1000
                    ]}
                    speed={15}
                    style={{
                      whiteSpace: 'pre',
                      fontFamily: "'Fira Code', 'Courier New', monospace",
                      fontSize: 'clamp(0.65rem, 1.5vw, 0.95rem)',
                      lineHeight: 'clamp(1.3, 1.8vw, 1.6)',
                      color: 'white',
                      flex: 1
                    }}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-richblack-800 to-transparent'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Section 2 - Mobile Optimized */}
        <div className='mt-8 sm:mt-12 lg:mt-16 w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-8'>
          <div className='flex flex-col-reverse lg:flex-row-reverse gap-6 sm:gap-8 lg:gap-10'>
            
            {/* Text Content */}
            <div className='w-full lg:w-1/2 rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <h2 className='text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-4'>
                Start <span className='spantext'>coding in Seconds</span> with our Excellent Courses 
              </h2>     
              
              <p className='mb-6 sm:mb-8 text-richblack-200 text-sm sm:text-base lg:text-lg leading-relaxed'>
                Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
              </p>

              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 justify-center sm:justify-start items-center sm:items-start'>
                <CTAbutton active={true} linkto="/signup">
                  Continue Lesson
                </CTAbutton>
                <CTAbutton active={false} linkto="/login">
                  Learn More
                </CTAbutton>
              </div>
            </div>

            {/* Animated Code Content */}
            <div className='w-full lg:w-1/2 rounded-xl overflow-hidden bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 shadow-lg'>
              <div className='flex h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] relative'>
                {/* Line Numbers */}
                <div className='text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-yellow-400 pr-2 sm:pr-3 lg:pr-4 pl-2 sm:pl-3 pt-3 sm:pt-4 text-right select-none font-mono text-xs sm:text-sm'>
                  {[...Array(18)].map((_, i) => (
                    <div key={i} className='h-4 sm:h-5 lg:h-6 text-xs sm:text-sm'>{i + 1}</div>
                  ))}
                </div>

                {/* Animated Code */}
                <div className='flex code-animation pt-3 sm:pt-4 pr-3 sm:pr-4 lg:pr-6 overflow-hidden'>
                  <TypeAnimation
                    sequence={[
                      'import React from "react";\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n\nfunction App() {\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="app">\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="app">\n      <h1>Counter: {count}</h1>\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="app">\n      <h1>Counter: {count}</h1>\n      <button\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="app">\n      <h1>Counter: {count}</h1>\n      <button\n        onClick={() => setCount(count + 1)}\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="app">\n      <h1>Counter: {count}</h1>\n      <button\n        onClick={() => setCount(count + 1)}\n      >\n        Click me!\n      </button>\n',
                      800,
                      'import React from "react";\nimport { useState } from "react";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="app">\n      <h1>Counter: {count}</h1>\n      <button\n        onClick={() => setCount(count + 1)}\n      >\n        Click me!\n      </button>\n    </div>\n  );\n}\n\nexport default App;',
                      3000,
                      '',
                      1000
                    ]}
                    speed={20}
                    style={{
                      whiteSpace: 'pre',
                      fontFamily: "'Fira Code', 'Courier New', monospace",
                      fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
                      lineHeight: 'clamp(1.3, 1.8vw, 1.5)',
                      color: 'white',
                      flex: 1
                    }}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-richblack-800 to-transparent'></div>
              </div>
            </div>
          </div>
        </div>
         
        {/* Heading Section - Mobile Optimized */}
        <div className='flex flex-col sm:flex-row gap-2 font-bold mt-8 sm:mt-12 lg:mt-16 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center justify-center px-4'>
          <span>Unlock</span> <Highlighttext text={"Power of Code"} />
        </div>

        <div className='text-richblack-100 text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 font-bold text-center px-4 max-w-2xl mx-auto'>
          Learn to Build Anything You can Imagine
        </div>  
       
        {/* Navigation Tabs - Mobile Optimized */}
        <div className='flex justify-center items-center mt-6 sm:mt-8 lg:mt-10 px-4 w-full'>
          <Navtabs/>
        </div>
      </div>

      {/* Section 2 - Mobile Optimized */}
      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='bg_img h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] flex justify-center items-center'>
          <div className='w-[95%] sm:w-11/12 max-w-maxContent flex justify-center items-center mx-auto'>
            {/* CTA Buttons - Mobile Optimized */}
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-center justify-center'>
              <CTAbutton linkto={"/signup"} active={true}>
                <div className='flex justify-center items-center gap-2 text-sm sm:text-base lg:text-lg'>
                  Explore Full Catalog <FaArrowRight className="transition-transform hover:translate-x-1"/>
                </div>
              </CTAbutton>

              <CTAbutton linkto={"/login"} active={false}>
                <div className='text-sm sm:text-base lg:text-lg'>
                  Learn More
                </div>
              </CTAbutton>
            </div>
          </div>
        </div>

        {/* Skills Section - Mobile Optimized */}
        <div className='flex flex-col lg:flex-row w-[90%] lg:w-[80%] xl:w-[70%] mx-auto mt-8 sm:mt-12 lg:mt-16 gap-8 lg:gap-12 px-4 sm:px-6'>
          <div className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold w-full lg:w-[50%] text-center lg:text-left leading-tight'>
            Get the skills you need for a <span className='text-blue-200'>job that is in demand</span> 
          </div>

          <div className='w-full lg:w-[50%] flex flex-col items-center lg:items-start gap-6'>
            <div className='font-bold text-base sm:text-lg lg:text-xl text-center lg:text-left leading-relaxed'>
              The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
            </div>
        
            <div className='flex justify-center lg:justify-start w-full'>
              <CTAbutton active={true} linkto={"/login"}>
                <div className='text-sm sm:text-base lg:text-lg'>Learn More</div>
              </CTAbutton>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className='w-[90%] sm:w-[85%] lg:w-[80%] mx-auto p-4 sm:p-6 lg:p-8 mt-12 sm:mt-16 lg:mt-20'>
          <Timelinesection/>
        </div>
   
        {/* Learn Language Section */}
        <div className='flex justify-center items-center mt-12 sm:mt-16 lg:mt-20 px-4'>     
          <Learnlanguage/>  
        </div>  
      </div>
        
      {/* Instructor Section - Mobile Optimized */}
      <div className='w-full min-h-screen bg-richblack-900 py-12 sm:py-16 lg:py-20'>
        <div className='w-[90%] lg:w-[80%] xl:w-[70%] mx-auto flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 xl:gap-16'>
         
          {/* Image Section */}
          <div className='w-full lg:w-[55%] flex justify-center'>
            <img 
              src={instructor} 
              className='shadow-2xl w-full max-w-[500px] shadow-blue-200/30 rounded-2xl hover:scale-[1.02] transition-transform duration-300'
              alt="instructor" 
            />
          </div>

          {/* Content Section */}
          <div className='flex flex-col w-full lg:w-[45%] px-4 lg:px-0 text-center lg:text-left gap-6'>
            <div className='text-white font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight'>
              Become An <Highlighttext text={"Instructor"} />
            </div>

            <div className='font-bold text-richblack-100 text-base sm:text-lg lg:text-xl leading-relaxed'>
              Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>

            <div className='flex justify-center lg:justify-start'>
              <CTAbutton active={true} linkto={"/signup"}>
                <div className='flex justify-center items-center gap-2 text-sm sm:text-base lg:text-lg'>
                  Start Teaching Today 
                  <FaArrowRight className="transition-transform hover:translate-x-1"/>
                </div>
              </CTAbutton>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className='flex justify-center bg-richblack-900 items-center mt-16 sm:mt-20 lg:mt-24 px-4'>
          <Reviewandratingslider/>
        </div>
      </div>
   
      {/* Footer */}
      <div className='mt-16 sm:mt-20 bg-richblack-900'>
        <Footer/>
      </div>
     
    </div>
  )
}

export default Home 