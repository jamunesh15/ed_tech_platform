import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseDetails } from '../Services/operations/courseDetails'
import CourseHeader from '../components/ViewCourse/CourseHeader'
import CourseContent from '../components/ViewCourse/CourseContent'
import WhatYouWillLearn from '../components/ViewCourse/WhatYouWillLearn'
import AuthorSection from '../components/ViewCourse/AuthorSection'
import { toast } from 'react-hot-toast'

const ViewCourse = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const result = await getCourseDetails(courseId)
        setCourseData(result)
      } catch (error) {
        toast.error("Failed to fetch course details")
        navigate('/catalog')
      } finally {
        setLoading(false)
      }
    }

    fetchCourseDetails()
  }, [courseId, navigate])

  if(loading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-50"></div>
    </div>
  }

  if(!courseData) {
    return null
  }

  return (
    <div className="min-h-screen bg-richblack-900">
      <CourseHeader 
        title={courseData.courseName}
        description={courseData.courseDescription}
        thumbnail={courseData.thumbnail}
        price={courseData.price}
        instructor={courseData.instructor}
        rating={courseData.ratingAndReviews}
      />
      
      <div className="mx-auto max-w-4xl px-4 py-8">
        <WhatYouWillLearn 
          learningObjectives={courseData.whatYouWillLearn}
        />
        
        <CourseContent 
          courseContent={courseData.courseContent}
        />
        
        <AuthorSection 
          instructor={courseData.instructor}
        />
      </div>
    </div>
  )
}

export default ViewCourse
