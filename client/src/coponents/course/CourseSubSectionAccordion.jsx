
// import React from "react";
// import { AiOutlineDown } from "react-icons/ai";
// import { HiOutlineVideoCamera } from "react-icons/hi";

// function CourseSubSectionAccordion({ subSec }) {
//   return (
//     <div>
//       <div className="flex justify-between py-3 hover:bg-richblack-800 px-4 rounded-md transition-colors duration-300">
//         <div className="flex items-center gap-3">
//           <span>
//             <HiOutlineVideoCamera className="text-caribbeangreen-100 text-lg" />
//           </span>
//           <p className="text-richblack-50 font-medium">{subSec?.title}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseSubSectionAccordion;


// import React from "react";
// import { AiOutlineDown } from "react-icons/ai";
// import { HiOutlineVideoCamera } from "react-icons/hi";

// function CourseSubSectionAccordion({ subSec }) {
//   return (
//     <div>
//       <div className="flex justify-between py-3 hover:bg-richblack-800 px-4 rounded-md transition-colors duration-300">
//         <div className="flex items-center gap-3">
//           <span>
//             <HiOutlineVideoCamera className="text-caribbeangreen-100 text-lg" />
//           </span>
//           <p className="text-richblack-50 font-medium">{subSec?.title}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseSubSectionAccordion;



import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";

function CourseSubSectionAccordion({ subSec }) {

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-2 sm:py-3 hover:bg-richblack-800 focus-within:bg-richblack-800 px-3 sm:px-4 rounded-md transition-all duration-300 cursor-pointer group">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <span className="flex-shrink-0">
            <HiOutlineVideoCamera className="text-caribbeangreen-100 text-base sm:text-lg group-hover:text-caribbeangreen-50 transition-colors duration-300" />
          </span>
          <p className="text-richblack-50 font-medium text-sm sm:text-base truncate sm:truncate-none group-hover:text-white transition-colors duration-300">
            {subSec?.title}
          </p>
        </div>
        
        {/* Optional: Add duration or additional info if available */}

        {subSec?.duration && (
          <div className="flex-shrink-0  ml-2">
            <span className="text-xs  sm:text-sm text-richblack-300 group-hover:text-richblack-100 transition-colors duration-300">
              {subSec.duration}
            </span>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion;