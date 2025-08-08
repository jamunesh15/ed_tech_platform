


import React from 'react'
import progress from "../../assets/Images/Know_your_progress.png"
import compare from "../../assets/Images/Compare_with_others.png"
import lesson from "../../assets/Images/Plan_your_lessons.png"
import CTAbutton from './CTAbutton'

const Learnlanguage = () => {
  return (
    <div className='flex flex-col justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16 items-center px-4 sm:px-6 md:px-8'>
      {/* heading */}
      <div className='flex flex-row text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold gap-1 sm:gap-2 md:gap-3 text-center'>
        <span className='text-center w-full'>Your swiss knife for Learning Any Language</span>
      </div>
      
      {/* subheading */}
      <div className='w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto text-sm sm:text-base md:text-lg font-medium mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center text-gray-600'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>
      
      {/* images */}
      <div className='flex flex-col lg:flex-row w-full justify-center items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 gap-4 sm:gap-6 md:gap-8 lg:gap-4 xl:gap-6'>
        <div className='flex justify-center'>
          <img 
            src={progress}
            className='h-[280px] w-[240px] sm:h-[320px] sm:w-[270px] md:h-[360px] md:w-[300px] lg:h-[380px] lg:w-[320px] xl:h-[420px] xl:w-[350px] object-contain'
            alt="Know your progress"
          />
        </div>
        
        <div className='flex justify-center'>
          <img 
            src={compare}
            className='h-[280px] w-[240px] sm:h-[320px] sm:w-[270px] md:h-[360px] md:w-[300px] lg:h-[380px] lg:w-[320px] xl:h-[420px] xl:w-[350px] object-contain'
            alt="Compare with others"
          />
        </div>
        
        <div className='flex justify-center'>
          <img 
            src={lesson}
            className='h-[280px] w-[240px] sm:h-[320px] sm:w-[270px] md:h-[360px] md:w-[300px] lg:h-[380px] lg:w-[320px] xl:h-[420px] xl:w-[350px] object-contain'
            alt="Plan your lessons"
          />
        </div>
      </div>
      
      {/* button */}
      <div className='mt-6 sm:mt-8 md:mt-10 lg:mt-12 mb-6 sm:mb-8 md:mb-10 lg:mb-12'>
        <CTAbutton active={true} linkto={"/login"}>
          Learn More
        </CTAbutton>
      </div>
    </div>
  )
}

export default Learnlanguage