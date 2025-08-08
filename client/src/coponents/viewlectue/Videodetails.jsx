import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCustomerService } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../Services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../redux/viewCourseSlice';

import { MdOutlinePlayCircle } from "react-icons/md";

const Videodetails = () => {

 const {courseId , sectionId , SubsectionId} = useParams();
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const playerRef = useRef();
 const {token}  = useSelector((state)=>state.auth);
 const {user} = useSelector((state)=>state.profile);
  const {  courseSectionData  , completedLectures } = useSelector((state)=>state.viewcourse);
  const location  = useLocation();

  const [videoData , setvideoData] = useState([]);
  const [videoEnded , setvideoEnded] = useState(false);
  const [loading , setloading] = useState(false);

  useEffect(()=>{
    
    const videoSpecificDetails = async()=>{
      if(!courseSectionData || !courseSectionData.length){
        return;
      }
      if( !courseId || !sectionId || !SubsectionId){
        navigate("/dashboard/enrolled-courses");
        return;
      }

      const filteredData = courseSectionData.filter((course)=>course._id === sectionId);
      const filteredVideo = filteredData[0]?.Subsection?.filter((video)=>video._id === SubsectionId);
      
      setvideoData(filteredVideo[0]);
      setvideoEnded(false);
    }

    videoSpecificDetails();

  },[ courseSectionData , courseId , sectionId , SubsectionId , navigate  , location.pathname]);

  const isFirstvideo = () =>{
     
  const currentSectionindex = courseSectionData.findIndex((data)=>data._id === sectionId);

  const currentSubsectionIndex = courseSectionData[currentSectionindex]?.Subsection.findIndex((data)=>data._id === SubsectionId);

  if( currentSectionindex == 0 && currentSubsectionIndex === 0  ){
    return true;
  }
  else{
    return false;
  }

  }   

  const isLastvideo = ()=>{
     
     const currentSectionindex = courseSectionData.findIndex((data)=>data._id === sectionId);

  const currentSubsectionIndex = courseSectionData[currentSectionindex]?.Subsection.findIndex((data)=>data._id === SubsectionId);

  const totalLectures = courseSectionData[currentSectionindex]?.Subsection.length;

  if( currentSectionindex === courseSectionData.length - 1 && currentSubsectionIndex === totalLectures - 1 ){
    return true;
  }
  else{
    return false;

  }
   

  }

  const handlePreviousvideo = ()=>{
     
 const currentSectionindex = courseSectionData.findIndex((data)=>data._id === sectionId);

  const currentSubsectionIndex = courseSectionData[currentSectionindex]?.Subsection.findIndex((data)=>data._id === SubsectionId);

  const totalLectures = courseSectionData[currentSectionindex]?.Subsection.length;


  if( currentSubsectionIndex !== 0){
    // same section previous video // previous video is present
    const previoussubsectionId = courseSectionData[currentSectionindex]?.Subsection?.[currentSubsectionIndex - 1]._id;  

    navigate(`/view-lecture/${courseId}/section/${sectionId}/sub-section/${previoussubsectionId}`);
  }
  else{
    // diffrent section ladtvideo
    const previoussectionId = courseSectionData[currentSectionindex - 1]._id;

    const previousSubsectionlength = courseSectionData[currentSectionindex - 1]?.Subsection.length;

    const previousSubsectionId = courseSectionData[currentSectionindex - 1]?.Subsection[previousSubsectionlength -1 ]._id;

    navigate(`/view-lecture/${courseId}/section/${previoussectionId}/sub-section/${previousSubsectionId}`);
  }



  }

  const handleNextvideo =  ()=>{

    const currentSectionindex = courseSectionData.findIndex((data)=>data._id === sectionId);

  const currentSubsectionIndex = courseSectionData[currentSectionindex]?.Subsection.findIndex((data)=>data._id === SubsectionId);

  const totalLectures = courseSectionData[currentSectionindex]?.Subsection.length;

  if(  currentSubsectionIndex  != totalLectures - 1 ){

   // next video is present
   const nextsubsectionId =  courseSectionData[currentSectionindex]?.Subsection?.[currentSubsectionIndex + 1]._id;

   navigate(`/view-lecture/${courseId}/section/${sectionId}/sub-section/${nextsubsectionId}`)


  }
  else{
   
    // next section first video 

    const nextsectionId = courseSectionData[currentSectionindex + 1]._id;

    const nextsubsectionId = courseSectionData[currentSectionindex + 1]?.Subsection[0]._id;

    // is video pe chale jao
   navigate(`/view-lecture/${courseId}/section/${nextsectionId}/sub-section/${nextsubsectionId}`)


  }
   
  }

    const handleLectureCompletion = async()=>{
     
     setloading(true);


     try {
        
      const res = await markLectureAsComplete( { courseId:courseId , subsectionId : SubsectionId },token ) ;

      if(res){
        dispatch(updateCompletedLectures(SubsectionId))
      }

     } catch (error) {
       
      

     }

     setloading(false);

 }

  return (
    <div className="bg-richblack-900 min-h-screen w-full text-white">
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        
        {/* Video Section */}
        <div className="flex flex-col items-center space-y-4">
          
          {!videoData ? (
            <div className="flex items-center justify-center h-80 bg-richblack-800 rounded-xl border border-richblack-700 w-full">
              <div className="text-center">
                <MdOutlinePlayCircle className="mx-auto text-6xl text-richblack-400 mb-4" />
                <p className="text-xl text-richblack-300">No Video Found</p>
                <p className="text-sm text-richblack-500 mt-2">Please select a valid lecture</p>
              </div>
            </div>
          ) : (
            <div className="w-full">
              {/* Video Player */}
              <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                <video
                  ref={playerRef}
                  src={videoData?.videoUrl}
                  controls
                  controlsList="nodownload"
                  autoPlay
                  disablePictureInPicture
                  className="w-full aspect-video"
                  onEnded={() => setvideoEnded(true)}
                  onError={(err) => console.error('Video Error:', err)}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video End Controls */}
              {videoEnded && (
                <div className="mt-4 p-6 bg-richblack-800 rounded-xl border border-richblack-700">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold text-richblack-5 mb-6">
                      🎉 Lecture Complete!
                    </h3>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                      {!completedLectures.includes(SubsectionId) && (
                        <button 
                          className="bg-caribbeangreen-200 hover:bg-green-700 text-richblack-800  hover:underline text-[20px ] font-bold  px-5 py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 text-sm"
                          onClick={handleLectureCompletion}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              Marking...
                            </>
                          ) : (
                            <>
                              ✓ Mark as Completed
                            </>
                          )}
                        </button>
                      )}

                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm"
                        onClick={() => {
                          if(playerRef.current){
                            playerRef.current.currentTime = 0;
                            setvideoEnded(false);
                          }
                        }}
                      >
                        🔄 Rewatch
                      </button>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-3 pt-4 border-t border-richblack-600">
                      {!isFirstvideo() && (
                        <button
                          className="bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 text-sm"
                          onClick={handlePreviousvideo}
                        >
                          ← Previous Lecture
                        </button>
                      )}

                      {!isLastvideo() && (
                        <button
                          className="bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 text-sm"
                          onClick={handleNextvideo}
                        >
                          Next Lecture →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lecture Information */}
        {videoData && (
          <div className="bg-richblack-800 rounded-xl p-5 border border-richblack-700">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-richblack-5 leading-tight">
                {videoData?.title}
              </h1>
              
              {videoData?.description && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-richblack-300 text-base leading-relaxed">
                    {videoData.description}
                  </p>
                </div>
              )}

              {/* Lecture Progress Indicator */}
              <div className="flex items-center gap-4 pt-3 border-t border-richblack-600">
                <div className="flex items-center gap-2">
                  {completedLectures.includes(SubsectionId) ? (
                    <>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 font-medium text-sm">Completed</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-400 font-medium text-sm">In Progress</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Navigation */}
        {!videoEnded && videoData && (
          <div className="bg-richblack-800 rounded-xl p-4 border border-richblack-700">
            <div className="flex justify-between items-center">
              <div className="text-richblack-300 text-sm font-medium">
                Lecture Navigation
              </div>
              <div className="flex gap-3">
                {!isFirstvideo() && (
                  <button
                    className="bg-richblack-700 hover:bg-richblack-600 text-richblack-100 px-4 py-2 rounded-lg transition-all duration-200 text-sm flex items-center gap-2"
                    onClick={handlePreviousvideo}
                  >
                    ← Previous
                  </button>
                )}

                {!isLastvideo() && (
                  <button
                    className="bg-richblack-700 hover:bg-richblack-600 text-richblack-100 px-4 py-2 rounded-lg transition-all duration-200 text-sm flex items-center gap-2"
                    onClick={handleNextvideo}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Videodetails