





// import { useEffect, useRef, useState } from "react";
// import { AiOutlineDown } from "react-icons/ai";

// import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

// export default function CourseAccordionBar({ course, isActive, handleActive }) {
//   const contentEl = useRef(null);

//   const [active, setActive] = useState(false);
//   useEffect(() => {
//     setActive(isActive?.includes(course._id));
//   }, [isActive]);

//   const [sectionHeight, setSectionHeight] = useState(0);
//   useEffect(() => {
//     setSectionHeight(active ? contentEl.current.scrollHeight : 0);
//   }, [active]);

//   return (
//     <div className="overflow-hidden border border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
//       <div>
//         <div
//           className="flex cursor-pointer items-start justify-between bg-richblack-800 bg-opacity-20 px-7 py-5 transition-[0.3s] hover:bg-richblack-700"
//           onClick={() => handleActive(course._id)}
//         >
//           <div className="flex items-center gap-3">
//             <i className={isActive.includes(course._id) ? "rotate-180" : "rotate-0"}>
//               <AiOutlineDown className="text-yellow-100" />
//             </i>
//             <p className="text-lg font-medium">{course?.sectionName}</p>
//           </div>
//           <div className="space-x-4">
//             <span className="text-yellow-100">{`${course.Subsection.length || 0} lecture(s)`}</span>
//           </div>
//         </div>
//       </div>
//       <div
//         ref={contentEl}
//         className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-300 ease-in-out"
//         style={{ height: sectionHeight }}
//       >
//         <div className="text-richblack-50 flex flex-col gap-3 px-7 py-5 font-medium">
//           {course?.Subsection?.map((subSec, i) => (
//             <CourseSubSectionAccordion key={i} subSec={subSec} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null);
  
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(isActive?.includes(course._id));
  }, [isActive]);

  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active]);

  return (
    <div className="overflow-hidden border border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      <div>
        <div
          className="flex cursor-pointer items-start justify-between bg-richblack-800 bg-opacity-20 px-3 py-4 sm:px-5 md:px-7 md:py-5 transition-[0.3s] hover:bg-richblack-700"
          onClick={() => handleActive(course._id)}
        >
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <i className={isActive.includes(course._id) ? "rotate-180" : "rotate-0"}>
              <AiOutlineDown className="text-yellow-100 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </i>
            <p className="text-sm sm:text-base md:text-lg font-medium truncate sm:truncate-none">
              {course?.sectionName}
            </p>
          </div>
          <div className="flex-shrink-0 ml-2">
            <span className="text-xs sm:text-sm md:text-base text-yellow-100 whitespace-nowrap">
              {`${course.Subsection?.length || 0} lecture${course.Subsection?.length !== 1 ? 's' : ''}`}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-300 ease-in-out"
        style={{ height: sectionHeight }}
      >
        <div className="text-richblack-50 flex flex-col gap-2 sm:gap-3 px-3 py-4 sm:px-5 md:px-7 md:py-5 font-medium">
          {course?.Subsection?.map((subSec, i) => (
            <CourseSubSectionAccordion key={i} subSec={subSec} />
          ))}
        </div>
      </div>
    </div>
  );
}