// import React, { useEffect, useState } from 'react'
// import Lecturesidebar from '../coponents/viewlectue/Lecturesidebar'
// import LectureOutlet from '../coponents/viewlectue/LectureOutlet';
// import Coursereviewmodal from '../coponents/viewlectue/Coursereviewmodal';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../redux/viewCourseSlice';
// import { getFullDetailsOfCourse } from '../Services/operations/courseDetailsAPI';


// const Viewlecture = () => {
  
//     const [reviewModal, setreviewModal] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const {courseId} = useParams();
//     const {token} = useSelector((state)=>state.auth);
//     const {course} = useSelector((state)=>state.course);
//     const {profile}=  useSelector((state)=>state.profile);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const courseSpecificdetails = async()=>{
//         try {
//             const courseData = await getFullDetailsOfCourse(courseId , token);

//             if (!courseData || !courseData.courseDetails) {
//                 console.error("No course data received");
//                 return;
//             }

//             if (!courseData.courseDetails.courseContent || courseData.courseDetails.courseContent.length === 0) {
//                 console.error("No course content found");
//                 return;
//             }

//             dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
//             dispatch(setEntireCourseData( courseData.courseDetails ));
//             dispatch(setCompletedLectures(courseData.completedVideos));

//             let lectures = 0;
//              courseData.courseDetails?.courseContent?.forEach((section)=>{
//                 lectures += section.Subsection.length;
//              })

//              dispatch(setTotalNoOfLectures(lectures));

//              const currentPath = window.location.pathname;
//              const courseContent = courseData.courseDetails.courseContent;
             
//              if (!courseContent || !Array.isArray(courseContent) || courseContent.length === 0) {
//                  console.error("No valid course content found");
//                  return;
//              }
             
//              const firstSection = courseContent[0];
//              if (!firstSection || !firstSection._id) {
//                  console.error("First section is invalid");
//                  return;
//              }
             
//              const firstLecture = firstSection.Subsection?.[0];
//              if (!firstLecture || !firstLecture._id) {
//                  console.error("First lecture is invalid");
//                  return;
//              }
             
//              const targetPath = `/view-lecture/${courseId}/section/${firstSection._id}/sub-section/${firstLecture._id}`;
             
//              if (currentPath !== targetPath) {
//                  navigate(targetPath, { replace: true });
//              }
//         } catch (error) {
//             console.error("Error loading course details:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(()=>{
//         if (courseId && token) {
//             courseSpecificdetails();
//         }
//     }, [courseId, token])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading course...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-richblack-900">
       
//        {/* outer div */}
//      <div className="flex h-screen">
//    {/* side bar */}
//    <div className="w-80 flex-shrink-0 bg-richblack-800 overflow-y-auto">
//      <Lecturesidebar setreviewModal={setreviewModal} />
//    </div>

//    {/* lecture video */}
//    <div className="flex-1 bg-richblack-900 overflow-y-auto">
//        <LectureOutlet/>
//    </div>

//    </div>

//    { reviewModal && <Coursereviewmodal setreviewModal={setreviewModal} /> }

//     </div>
//   )
// }

// export default Viewlecture



// import React, { useEffect, useState } from 'react'
// import Lecturesidebar from '../coponents/viewlectue/Lecturesidebar'
// import LectureOutlet from '../coponents/viewlectue/LectureOutlet';
// import Coursereviewmodal from '../coponents/viewlectue/Coursereviewmodal';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../redux/viewCourseSlice';
// import { getFullDetailsOfCourse } from '../Services/operations/courseDetailsAPI';

// const Viewlecture = () => {
  
//     const [reviewModal, setreviewModal] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const {courseId} = useParams();
//     const {token} = useSelector((state)=>state.auth);
//     const {course} = useSelector((state)=>state.course);
//     const {profile}=  useSelector((state)=>state.profile);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const courseSpecificdetails = async()=>{
//         try {
//             const courseData = await getFullDetailsOfCourse(courseId , token);

//             if (!courseData || !courseData.courseDetails) {
//                 console.error("No course data received");
//                 return;
//             }

//             if (!courseData.courseDetails.courseContent || courseData.courseDetails.courseContent.length === 0) {
//                 console.error("No course content found");
//                 return;
//             }

//             dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
//             dispatch(setEntireCourseData( courseData.courseDetails ));
//             dispatch(setCompletedLectures(courseData.completedVideos));

//             let lectures = 0;
//              courseData.courseDetails?.courseContent?.forEach((section)=>{
//                 lectures += section.Subsection.length;
//              })

//              dispatch(setTotalNoOfLectures(lectures));

//              const currentPath = window.location.pathname;
//              const courseContent = courseData.courseDetails.courseContent;
             
//              if (!courseContent || !Array.isArray(courseContent) || courseContent.length === 0) {
//                  console.error("No valid course content found");
//                  return;
//              }
             
//              const firstSection = courseContent[0];
//              if (!firstSection || !firstSection._id) {
//                  console.error("First section is invalid");
//                  return;
//              }
             
//              const firstLecture = firstSection.Subsection?.[0];
//              if (!firstLecture || !firstLecture._id) {
//                  console.error("First lecture is invalid");
//                  return;
//              }
             
//              const targetPath = `/view-lecture/${courseId}/section/${firstSection._id}/sub-section/${firstLecture._id}`;
             
//              if (currentPath !== targetPath) {
//                  navigate(targetPath, { replace: true });
//              }
//         } catch (error) {
//             console.error("Error loading course details:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(()=>{
//         if (courseId && token) {
//             courseSpecificdetails();
//         }
//     }, [courseId, token])

//     // Close sidebar when clicking outside on mobile
//     const closeSidebar = () => {
//         setSidebarOpen(false);
//     }

//     // Handle escape key to close sidebar
//     useEffect(() => {
//         const handleEscape = (e) => {
//             if (e.key === 'Escape' && sidebarOpen) {
//                 setSidebarOpen(false);
//             }
//         };
        
//         document.addEventListener('keydown', handleEscape);
//         return () => document.removeEventListener('keydown', handleEscape);
//     }, [sidebarOpen]);

//     // Prevent body scroll when sidebar is open on mobile
//     useEffect(() => {
//         if (sidebarOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'unset';
//         }
        
//         // Cleanup on unmount
//         return () => {
//             document.body.style.overflow = 'unset';
//         };
//     }, [sidebarOpen]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-yellow-50 mx-auto mb-4"></div>
//           <div className="text-white text-base sm:text-xl">Loading course...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-richblack-900 relative">
       
//       {/* Mobile Header with Menu Button */}
//       <div className="lg:hidden bg-richblack-800 border-b border-richblack-700 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="text-white p-2 rounded-lg hover:bg-richblack-700 transition-colors duration-200"
//           aria-label="Open sidebar"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//         <h1 className="text-white font-semibold text-lg truncate ml-4">Course Content</h1>
//       </div>

//       {/* Main Content Container */}
//       <div className="flex h-[calc(100vh-60px)] lg:h-screen relative">
        
//         {/* Mobile Overlay */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//             onClick={closeSidebar}
//           />
//         )}

//         {/* Sidebar */}
//         <div className={`
//           fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
//           w-80 sm:w-96 lg:w-80 xl:w-96 2xl:w-[400px]
//           flex-shrink-0 bg-richblack-800 
//           transform transition-transform duration-300 ease-in-out lg:transform-none
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//           overflow-y-auto
//           lg:border-r lg:border-richblack-700
//         `}>
//           {/* Mobile Close Button */}
//           <div className="lg:hidden flex items-center justify-between p-4 border-b border-richblack-700">
//             <h2 className="text-white font-semibold text-lg">Course Content</h2>
//             <button
//               onClick={closeSidebar}
//               className="text-white p-2 rounded-lg hover:bg-richblack-700 transition-colors duration-200"
//               aria-label="Close sidebar"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Sidebar Content */}
//           <div className="h-full">
//             <Lecturesidebar setreviewModal={setreviewModal} />
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 bg-richblack-900 overflow-y-auto min-w-0">
//           {/* Mobile Sidebar Toggle Button (Floating) */}
//           {!sidebarOpen && (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden fixed bottom-6 left-4 z-30 bg-yellow-50 text-richblack-900 p-3 rounded-full shadow-lg hover:bg-yellow-100 transition-all duration-200 hover:scale-105"
//               aria-label="Open course menu"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           )}

//           {/* Lecture Content */}
//           <div className="h-full p-2 sm:p-4 lg:p-6">
//             <LectureOutlet />
//           </div>
//         </div>
//       </div>

//       {/* Review Modal */}
//       {reviewModal && <Coursereviewmodal setreviewModal={setreviewModal} />}
//     </div>
//   )
// }

// export default Viewlecture


// import React, { useEffect, useState } from 'react'
// import Lecturesidebar from '../coponents/viewlectue/Lecturesidebar'
// import LectureOutlet from '../coponents/viewlectue/LectureOutlet';
// import Coursereviewmodal from '../coponents/viewlectue/Coursereviewmodal';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../redux/viewCourseSlice';
// import { getFullDetailsOfCourse } from '../Services/operations/courseDetailsAPI';

// const Viewlecture = () => {
  
//     const [reviewModal, setreviewModal] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const {courseId} = useParams();
//     const {token} = useSelector((state)=>state.auth);
//     const {course} = useSelector((state)=>state.course);
//     const {profile}=  useSelector((state)=>state.profile);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const courseSpecificdetails = async()=>{
//         try {
//             const courseData = await getFullDetailsOfCourse(courseId , token);

//             if (!courseData || !courseData.courseDetails) {
//                 console.error("No course data received");
//                 return;
//             }

//             if (!courseData.courseDetails.courseContent || courseData.courseDetails.courseContent.length === 0) {
//                 console.error("No course content found");
//                 return;
//             }

//             dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
//             dispatch(setEntireCourseData( courseData.courseDetails ));
//             dispatch(setCompletedLectures(courseData.completedVideos));

//             let lectures = 0;
//              courseData.courseDetails?.courseContent?.forEach((section)=>{
//                 lectures += section.Subsection.length;
//              })

//              dispatch(setTotalNoOfLectures(lectures));

//              const currentPath = window.location.pathname;
//              const courseContent = courseData.courseDetails.courseContent;
             
//              if (!courseContent || !Array.isArray(courseContent) || courseContent.length === 0) {
//                  console.error("No valid course content found");
//                  return;
//              }
             
//              const firstSection = courseContent[0];
//              if (!firstSection || !firstSection._id) {
//                  console.error("First section is invalid");
//                  return;
//              }
             
//              const firstLecture = firstSection.Subsection?.[0];
//              if (!firstLecture || !firstLecture._id) {
//                  console.error("First lecture is invalid");
//                  return;
//              }
             
//              const targetPath = `/view-lecture/${courseId}/section/${firstSection._id}/sub-section/${firstLecture._id}`;
             
//              if (currentPath !== targetPath) {
//                  navigate(targetPath, { replace: true });
//              }
//         } catch (error) {
//             console.error("Error loading course details:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(()=>{
//         if (courseId && token) {
//             courseSpecificdetails();
//         }
//     }, [courseId, token])

//     // Close sidebar when clicking outside on mobile
//     const closeSidebar = () => {
//         setSidebarOpen(false);
//     }

//     // Handle escape key to close sidebar
//     useEffect(() => {
//         const handleEscape = (e) => {
//             if (e.key === 'Escape' && sidebarOpen) {
//                 setSidebarOpen(false);
//             }
//         };
        
//         document.addEventListener('keydown', handleEscape);
//         return () => document.removeEventListener('keydown', handleEscape);
//     }, [sidebarOpen]);

//     // Prevent body scroll when sidebar is open on mobile
//     useEffect(() => {
//         if (sidebarOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'unset';
//         }
        
//         // Cleanup on unmount
//         return () => {
//             document.body.style.overflow = 'unset';
//         };
//     }, [sidebarOpen]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-yellow-50 mx-auto mb-4"></div>
//           <div className="text-white text-base sm:text-xl">Loading course...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-richblack-900 relative">
       
//       {/* Mobile Header */}
//       <div className="lg:hidden bg-richblack-800 border-b border-richblack-700 px-4 py-3 flex items-center justify-center sticky top-0 z-30">
//         <h1 className="text-white font-semibold text-lg">Course Content</h1>
//       </div>

//       {/* Main Content Container */}
//       <div className="flex h-[calc(100vh-60px)] lg:h-screen relative">
        
//         {/* Mobile Overlay */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//             onClick={closeSidebar}
//           />
//         )}

//         {/* Sidebar */}
//         <div className={`
//           fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
//           w-80 sm:w-96 lg:w-80 xl:w-96 2xl:w-[400px]
//           flex-shrink-0 bg-richblack-800 
//           transform transition-transform duration-300 ease-in-out lg:transform-none
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//           overflow-y-auto
//           lg:border-r lg:border-richblack-700
//         `}>
//           {/* Mobile Close Button */}
//           <div className="lg:hidden flex items-center justify-between p-4 border-b border-richblack-700">
//             <h2 className="text-white font-semibold text-lg">Course Content</h2>
//             <button
//               onClick={closeSidebar}
//               className="text-white p-2 rounded-lg hover:bg-richblack-700 transition-colors duration-200"
//               aria-label="Close sidebar"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Sidebar Content */}
//           <div className="h-full">
//             <Lecturesidebar setreviewModal={setreviewModal} />
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 bg-richblack-900 overflow-y-auto min-w-0">
//           {/* Enhanced Mobile Menu Button */}
//           {!sidebarOpen && (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden fixed bottom-6 left-4 z-30 bg-gradient-to-r from-yellow-400 to-yellow-500 text-richblack-900 p-4 rounded-full shadow-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:scale-110 active:scale-95 group"
//               aria-label="Open course menu"
//             >
//               <div className="relative">
//                 <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8M4 18h12" />
//                 </svg>
                
//                 {/* Pulse animation ring */}
//                 <div className="absolute -inset-2 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
//               </div>
              
//               {/* Tooltip */}
//               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1 bg-richblack-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
//                 Course Menu
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-richblack-700"></div>
//               </div>
//             </button>
//           )}

//           {/* Lecture Content */}
//           <div className="h-full p-2 sm:p-4 lg:p-6">
//             <LectureOutlet />
//           </div>
//         </div>
//       </div>

//       {/* Review Modal */}
//       {reviewModal && <Coursereviewmodal setreviewModal={setreviewModal} />}
//     </div>
//   )
// }

// export default Viewlecture


import React, { useEffect, useState } from 'react'
import Lecturesidebar from '../coponents/viewlectue/Lecturesidebar'
import LectureOutlet from '../coponents/viewlectue/LectureOutlet';
import Coursereviewmodal from '../coponents/viewlectue/Coursereviewmodal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../redux/viewCourseSlice';
import { getFullDetailsOfCourse } from '../Services/operations/courseDetailsAPI';

const Viewlecture = () => {
  
    const [reviewModal, setreviewModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const {course} = useSelector((state)=>state.course);
    const {profile}=  useSelector((state)=>state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const courseSpecificdetails = async()=>{
        try {
            const courseData = await getFullDetailsOfCourse(courseId , token);

            if (!courseData || !courseData.courseDetails) {
                console.error("No course data received");
                return;
            }

            if (!courseData.courseDetails.courseContent || courseData.courseDetails.courseContent.length === 0) {
                console.error("No course content found");
                return;
            }

            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData( courseData.courseDetails ));
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0;
             courseData.courseDetails?.courseContent?.forEach((section)=>{
                lectures += section.Subsection.length;
             })

             dispatch(setTotalNoOfLectures(lectures));

             const currentPath = window.location.pathname;
             const courseContent = courseData.courseDetails.courseContent;
             
             if (!courseContent || !Array.isArray(courseContent) || courseContent.length === 0) {
                 console.error("No valid course content found");
                 return;
             }
             
             const firstSection = courseContent[0];
             if (!firstSection || !firstSection._id) {
                 console.error("First section is invalid");
                 return;
             }
             
             const firstLecture = firstSection.Subsection?.[0];
             if (!firstLecture || !firstLecture._id) {
                 console.error("First lecture is invalid");
                 return;
             }
             
             const targetPath = `/view-lecture/${courseId}/section/${firstSection._id}/sub-section/${firstLecture._id}`;
             
             if (currentPath !== targetPath) {
                 navigate(targetPath, { replace: true });
             }
        } catch (error) {
            console.error("Error loading course details:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if (courseId && token) {
            courseSpecificdetails();
        }
    }, [courseId, token])

    // Close sidebar when clicking outside on mobile
    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    // Handle escape key to close sidebar
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && sidebarOpen) {
                setSidebarOpen(false);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [sidebarOpen]);

    // Prevent body scroll when sidebar is open on mobile
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [sidebarOpen]);

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-yellow-50 mx-auto mb-4"></div>
          <div className="text-white text-base sm:text-xl">Loading course...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 relative">
       
      {/* Mobile Header with Yellow Menu Button */}
      <div className="lg:hidden bg-richblack-800 border-b border-richblack-700 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-richblack-900 p-2.5 rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="Open course menu"
        >
          <div className="relative">
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8M4 18h12" />
            </svg>
          </div>
        </button>
        
        <h1 className="text-white font-semibold text-lg flex-1 text-center">Course Content</h1>
        
        {/* Spacer to center the title */}
        <div className="w-10"></div>
      </div>

      {/* Main Content Container */}
      <div className="flex h-[calc(100vh-60px)] lg:h-screen relative">
        
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-80 sm:w-96 lg:w-80 xl:w-96 2xl:w-[400px]
          flex-shrink-0 bg-richblack-800 
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
          lg:border-r lg:border-richblack-700
        `}>
          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-richblack-700">
            <h2 className="text-white font-semibold text-lg">Course Content</h2>
            <button
              onClick={closeSidebar}
              className="text-white p-2 rounded-lg hover:bg-richblack-700 transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="h-full">
            <Lecturesidebar setreviewModal={setreviewModal} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-richblack-900 overflow-y-auto min-w-0">
          {/* Enhanced Mobile Menu Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden fixed bottom-6 left-4 z-30 bg-gradient-to-r from-yellow-400 to-yellow-500 text-richblack-900 p-4 rounded-full shadow-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:scale-110 active:scale-95 group"
              aria-label="Open course menu"
            >
              <div className="relative">
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8M4 18h12" />
                </svg>
                
                {/* Pulse animation ring */}
                <div className="absolute -inset-2 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1 bg-richblack-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Course Menu
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-richblack-700"></div>
              </div>
            </button>
          )}

          {/* Lecture Content */}
          <div className="h-full p-2 sm:p-4 lg:p-6">
            <LectureOutlet />
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && <Coursereviewmodal setreviewModal={setreviewModal} />}
    </div>
  )
}

export default Viewlecture