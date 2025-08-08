

import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`flex flex-col w-full font-medium 
        max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[360px] xl:max-w-[380px]
        min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[260px]
        ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[8px_8px_0_0] sm:shadow-[10px_10px_0_0] md:shadow-[12px_12px_0_0] shadow-yellow-100"
          : "bg-richblack-800"
      } 
        text-richblack-25 rounded-lg overflow-hidden cursor-pointer 
        transition-all duration-200 hover:scale-[1.02] sm:hover:scale-[1.03] 
        mx-auto`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Main Content */}
      <div className="border-b-[2px] border-richblack-400 border-dashed 
        p-3 sm:p-4 md:p-5 lg:p-6 
        flex flex-col gap-2 sm:gap-3 flex-grow">
        
        {/* Heading */}
        <div
          className={`${
            currentCard === cardData?.heading ? "text-richblack-800" : "text-richblack-5"
          } 
            font-semibold 
            text-lg sm:text-xl md:text-xl lg:text-xl
            line-clamp-2 leading-tight`}
        >
          {cardData?.heading}
        </div>

        {/* Description */}
        <div className="text-richblack-400 
          text-xs sm:text-sm md:text-sm 
          line-clamp-3 sm:line-clamp-3 md:line-clamp-4
          leading-relaxed">
          {cardData?.description}
        </div>
      </div>

      {/* Footer Info */}
      <div
        className={`flex justify-between items-center
          ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } 
          px-3 sm:px-4 md:px-5 lg:px-6 
          py-2 sm:py-3 md:py-3 
          font-medium`}
      >
        {/* Level Info */}
        <div className="flex items-center gap-1 sm:gap-2 
          text-xs sm:text-sm md:text-sm">
          <HiUsers className="text-sm sm:text-base md:text-base flex-shrink-0" />
          <p className="truncate">{cardData?.level}</p>
        </div>

        {/* Lessons Info */}
        <div className="flex items-center gap-1 sm:gap-2 
          text-xs sm:text-sm md:text-sm">
          <ImTree className="text-sm sm:text-base md:text-base flex-shrink-0" />
          <p className="truncate">{cardData?.lessionNumber} Lessons</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;