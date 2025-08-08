// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { IoChevronBackCircleSharp } from "react-icons/io5";
// import { FaChevronCircleDown } from "react-icons/fa";
// const Lecturesidebar = ( { setreviewModal} ) => {
  
//     const [openSections , setOpenSections] = useState(new Set());
//     const [activeVideo , setactiveVideo] = useState("");

//     const navigate  = useNavigate();
//     const dispatch = useDispatch();
//     const {sectionId , SubsectionId} = useParams();
   
//    const location = useLocation();

//     const { courseSectionData ,
//          courseEntireData  ,
//           totalNoOfLectures ,
//            completedLectures 
//         } = useSelector((state)=>state.viewcourse);   

//         // Toggle function for sections
//         const toggleSection = (sectionId) => {
//             setOpenSections(prev => {
//                 const newSet = new Set(prev);
//                 if (newSet.has(sectionId)) {
//                     newSet.delete(sectionId);
//                 } else {
//                     newSet.add(sectionId);
//                 }
//                 return newSet;
//             });
//         };

//         useEffect(()=>{

//       ; (()=>{

//      if(!courseSectionData.length){
//         return;
//      }

//      const currentsectionindex  = courseSectionData.findIndex((data)=>data._id === sectionId);
//      const currentSubsectionIndex = courseSectionData[currentsectionindex]?.Subsection.findIndex(
//         (data)=>data._id === SubsectionId);

         
//         const activeSubsectionId = courseSectionData[currentsectionindex]?.Subsection?.[currentSubsectionIndex]._id;

//         // Ensure the current section is open
//         const currentSectionId = courseSectionData?.[currentsectionindex]?._id;
//         if (currentSectionId) {
//             setOpenSections(prev => new Set([...prev, currentSectionId]));
//         }
        
//         // Update active video to match URL parameters
//         setactiveVideo(SubsectionId);

   
//       })

//         } , [ courseEntireData ,courseSectionData , location.pathname, sectionId, SubsectionId ] )
 
//   return (
//     <div className="h-full bg-richblack-800 text-richblack-5 p-4"> 
     
//    <div className=' flex flex-col gap-4 ' >
//           {/* buttons */}

//           <div className=' flex gap-3 items-center ' >
//             <button 
//                onClick={()=>navigate("/dashboard/enrolled-courses") }
//                className="text-richblack-300 hover:text-richblack-5 text-xl"
//             >
//                 <IoChevronBackCircleSharp/>
//             </button>

//             <button className=' text-center px-3 py-2 font-medium text-richblack-900 hover:underline hover:scale-95 bg-yellow-200 rounded-lg transition-all duration-200   ' 
//               onClick={()=>setreviewModal(true)}
//             >
//               Add Review
//             </button>
//           </div>


//     {/* course heading and lectures */}
//           <div className="border-t border-richblack-700 pt-4">
//             <p className="text-lg font-semibold text-richblack-5"> {courseEntireData?.courseName} </p>
//             <p className="text-sm text-richblack-300"> {completedLectures?.length || 0} / {totalNoOfLectures} lectures completed </p>
//           </div>

//    {/* sections and subsections game */}
//    <div className="border-t border-richblack-700 pt-4">
   
//    <div className="space-y-2">
//     {courseSectionData.map((section , index)=>(
            
//             <div key={index} className={`flex flex-col gap-2 rounded-lg p-3 ${section._id === sectionId ? ' bg-richblack-500 border-2 border-yellow-200' : 'bg-richblack-700'}`}>

//                 {/* section detials */}
//                 <div className='flex justify-between items-center cursor-pointer' 
//                      onClick={()=>toggleSection(section._id)}>
//                     <p className={`font-medium ${section._id === sectionId ? 'text-richblack-25' : 'text-richblack-5'}`}> {section.sectionName} </p>
//                     <button className={`transition-transform duration-200 ${openSections.has(section._id) ? 'rotate-180' : 'rotate-0'} ${section._id === sectionId ? 'text-richblack-700 hover:text-richblack-900' : 'text-richblack-300 hover:text-richblack-5'}`}>
//                         <FaChevronCircleDown/>
//                     </button>
//                 </div>


//                 {/* subsecrion detials */}
//                 <div>
//                        {
//                         openSections.has(section._id) && (
                         
//                         <div className="space-y-1 mt-2">
//                             {
//                                 section?.Subsection?.map((topic , index)=>(
//                                     <div  key={index} className={ ` flex gap-3 p-2 rounded cursor-pointer ${
//                                         SubsectionId === topic._id 
//                                         ? "bg-blue-800 text-richblack-25 border-2 border-yellow-400" 
//                                         : section._id === sectionId 
//                                         ? "bg-richblack-700 text-richblack-5 hover:bg-richblack-600" 
//                                         : "bg-richblack-600 text-richblack-5 hover:bg-richblack-500"
//                                     } ` } 
//                                        onClick={ (e)=> { 
//                                         e.stopPropagation();
//                                         navigate(`/view-lecture/${courseEntireData._id}/section/${section?._id}/sub-section/${topic?._id}`) 
//                                     }
//                                 }
//                                     >
                                      
//                                       <input type="checkbox" 
//                                        checked={completedLectures?.includes(topic._id)}
//                                        readOnly
//                                        className="to-blue-200"
//                                       />
//                                       <span className="text-sm"> {topic.title} </span>


//                                     </div>
//                                 ))
//                             }
//                         </div>

//                         )
//                        }

//                 </div>

//             </div>

//     ))}
//    </div>

//    </div>

//    </div>

//     </div>
//   )
// }

// export default Lecturesidebar

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { FaChevronCircleDown } from "react-icons/fa";

const Lecturesidebar = ({ setreviewModal }) => {
  
    const [openSections, setOpenSections] = useState(new Set());
    const [activeVideo, setactiveVideo] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sectionId, SubsectionId } = useParams();
   
    const location = useLocation();

    const { 
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures 
    } = useSelector((state) => state.viewcourse);   

    // Toggle function for sections
    const toggleSection = (sectionId) => {
        setOpenSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

    useEffect(() => {
        (() => {
            if (!courseSectionData.length) {
                return;
            }

            const currentsectionindex = courseSectionData.findIndex((data) => data._id === sectionId);
            const currentSubsectionIndex = courseSectionData[currentsectionindex]?.Subsection.findIndex(
                (data) => data._id === SubsectionId);

            const activeSubsectionId = courseSectionData[currentsectionindex]?.Subsection?.[currentSubsectionIndex]._id;

            // Ensure the current section is open
            const currentSectionId = courseSectionData?.[currentsectionindex]?._id;
            if (currentSectionId) {
                setOpenSections(prev => new Set([...prev, currentSectionId]));
            }
            
            // Update active video to match URL parameters
            setactiveVideo(SubsectionId);
        })()
    }, [courseEntireData, courseSectionData, location.pathname, sectionId, SubsectionId])
 
    return (
        <div className="h-full bg-richblack-800 text-richblack-5 flex flex-col"> 
            
            <div className="flex-1 overflow-y-auto">
                <div className="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-5">
                    
                    {/* Header Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                        <button 
                            onClick={() => navigate("/dashboard/enrolled-courses")}
                            className="flex items-center gap-2 text-richblack-300 hover:text-richblack-5 transition-colors duration-200 p-1 rounded-lg hover:bg-richblack-700 text-sm sm:text-base"
                            aria-label="Back to enrolled courses"
                        >
                            <IoChevronBackCircleSharp className="text-xl sm:text-2xl" />
                            <span className="sm:hidden">Back to Courses</span>
                        </button>

                        <button 
                            className="w-full sm:w-auto text-center px-3 sm:px-4 py-2 sm:py-2.5 font-medium text-richblack-900 hover:underline hover:scale-95 bg-yellow-200 hover:bg-yellow-300 rounded-lg transition-all duration-200 text-sm sm:text-base"
                            onClick={() => setreviewModal(true)}
                        >
                            Add Review
                        </button>
                    </div>

                    {/* Course Info */}
                    <div className="border-t border-richblack-700 pt-3 sm:pt-4 space-y-2">
                        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-richblack-5 leading-tight line-clamp-2">
                            {courseEntireData?.courseName}
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className="w-full bg-richblack-700 rounded-full h-2">
                                <div 
                                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                                    style={{ 
                                        width: `${totalNoOfLectures > 0 ? ((completedLectures?.length || 0) / totalNoOfLectures) * 100 : 0}%` 
                                    }}
                                ></div>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-richblack-300">
                            {completedLectures?.length || 0} / {totalNoOfLectures} lectures completed
                            {totalNoOfLectures > 0 && (
                                <span className="ml-2 text-yellow-400">
                                    ({Math.round(((completedLectures?.length || 0) / totalNoOfLectures) * 100)}%)
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Course Sections */}
                    <div className="border-t border-richblack-700 pt-3 sm:pt-4">
                        <div className="space-y-2 sm:space-y-3">
                            {courseSectionData.map((section, index) => (
                                <div 
                                    key={index} 
                                    className={`rounded-lg transition-all duration-200 ${
                                        section._id === sectionId 
                                            ? 'bg-richblack-600 border-2 border-yellow-400 shadow-lg' 
                                            : 'bg-richblack-700 border border-richblack-600 hover:bg-richblack-650'
                                    }`}
                                >
                                    {/* Section Header */}
                                    <div 
                                        className="flex justify-between items-center cursor-pointer p-3 sm:p-4 rounded-lg hover:bg-opacity-80 transition-all duration-200"
                                        onClick={() => toggleSection(section._id)}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-medium text-sm sm:text-base leading-tight ${
                                                section._id === sectionId ? 'text-yellow-100' : 'text-richblack-5'
                                            }`}>
                                                {section.sectionName}
                                            </p>
                                            <p className="text-xs text-richblack-400 mt-1">
                                                {section?.Subsection?.length || 0} lectures
                                            </p>
                                        </div>
                                        
                                        <button 
                                            className={`ml-3 p-1 rounded-full transition-all duration-300 ${
                                                openSections.has(section._id) ? 'rotate-180' : 'rotate-0'
                                            } ${
                                                section._id === sectionId 
                                                    ? 'text-yellow-400 hover:text-yellow-300' 
                                                    : 'text-richblack-400 hover:text-richblack-200'
                                            } hover:bg-richblack-600`}
                                            aria-label={openSections.has(section._id) ? 'Collapse section' : 'Expand section'}
                                        >
                                            <FaChevronCircleDown className="text-lg sm:text-xl" />
                                        </button>
                                    </div>

                                    {/* Subsections */}
                                    {openSections.has(section._id) && (
                                        <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-1 sm:space-y-2">
                                            {section?.Subsection?.map((topic, topicIndex) => (
                                                <div
                                                    key={topicIndex}
                                                    className={`flex items-center gap-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                                                        SubsectionId === topic._id
                                                            ? "bg-blue-600 text-white border-2 border-yellow-400 shadow-md"
                                                            : section._id === sectionId
                                                            ? "bg-richblack-700 text-richblack-100 hover:bg-richblack-600 border border-transparent hover:border-richblack-500"
                                                            : "bg-richblack-600 text-richblack-200 hover:bg-richblack-500 border border-transparent hover:border-richblack-400"
                                                    }`}
                                                    onClick={(e) => { 
                                                        e.stopPropagation();
                                                        navigate(`/view-lecture/${courseEntireData._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                    }}
                                                >
                                                    {/* Completion Checkbox */}
                                                    <div className="flex-shrink-0">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={completedLectures?.includes(topic._id)}
                                                            readOnly
                                                            className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 transition-colors duration-200 ${
                                                                completedLectures?.includes(topic._id)
                                                                    ? 'bg-green-500 border-green-500'
                                                                    : 'bg-transparent border-richblack-400'
                                                            }`}
                                                            style={{ accentColor: '#10B981' }}
                                                        />
                                                    </div>

                                                    {/* Lecture Title */}
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-xs sm:text-sm font-medium leading-tight line-clamp-2 group-hover:text-white transition-colors duration-200">
                                                            {topic.title}
                                                        </span>
                                                        
                                                        {/* Duration or additional info could go here */}
                                                        {topic.timeDuration && (
                                                            <p className="text-xs text-richblack-400 mt-1">
                                                                {topic.timeDuration}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Play Icon for Active Video */}
                                                    {SubsectionId === topic._id && (
                                                        <div className="flex-shrink-0">
                                                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-yellow-400 rounded-full flex items-center justify-center">
                                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-richblack-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M8 5v14l11-7z"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lecturesidebar