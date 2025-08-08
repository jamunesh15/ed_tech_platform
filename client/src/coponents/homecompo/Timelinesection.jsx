import React from 'react'
import Logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import timelinemadam from "../../assets/Images/TimelineImage.png"
import expr from "../../assets/Images/expr.png"
import "../../coponents/homecompo/timelinesection.css"
const Timelinesection = () => {
  const timeline = [
    {
      Logo: Logo1,
      heading: "Leadership",
      subheading: "Fully committed to the success company"
    },
    {
      Logo: Logo2,
      heading: "Responsibility",
      subheading: "Students will always be our top priority"
    },
    {
      Logo: Logo3,
      heading: "Flexibility",
      subheading: "The ability to switch is an important skills"
    },
    {
      Logo: Logo4,
      heading: "Solve the problem",
      subheading: "Code your way to a solution"
    }
  ]

  return (
    <div className="flex flex-col md:flex-row gap-16 items-center">
      {/* left div */}
      <div className="flex flex-col gap-10 w-full md:w-[45%]">
        {timeline.map((element, index) => {
          return (
            <div className="flex gap-6 items-start" key={index}>
              <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] p-3">
                <img src={element.Logo} alt={element.heading} className="w-full h-full object-contain" />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-richblack-800">{element.heading}</h3>
                <p className="text-richblack-700">{element.subheading}</p>
              </div>
              
              {index !== timeline.length - 1 && (
                <div className="h-[55px] w-[2px] bg-richblack-800 ml-[25px] mt-[50px] absolute"></div>
              )}
            </div>
          ) 
        })}
      </div>

      {/* right div */}
      <div className="relative w-full md:w-[55%]">
        {/* Main image container */}
        <div className="relative">
          <img 
            src={timelinemadam} 
            alt="Timeline" 
            className="w-full h-auto madam object-cover rounded-lg shadow-lg shadow-blue-300 "
          />
          
          {/* expr image positioned at the bottom center, half overlapping */}
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-[80%] md:w-[70%]">
            <img 
              src={expr} 
              alt="Experience" 
              className="w-full h-auto object-contain shadow-lg rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timelinesection