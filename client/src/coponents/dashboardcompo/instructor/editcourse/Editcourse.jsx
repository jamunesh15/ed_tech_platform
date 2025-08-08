import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Rendersteps from '../Rendersteps';
import { getFullDetailsOfCourse } from '../../../../Services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../redux/courseSlice';

const Editcourse = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {courseId} = useParams();

    const [loading , setloading] = useState(false)

    const {token} = useSelector((state)=>state.auth)

    const  { course} = useSelector((state)=>state.course)

    if(loading){
        <div className=' flex justify-center text-center items-center text-[30px] text-white ' >

            Loading...
        </div>
    }

    useEffect(()=>{
      
        const populatecoursedetails = async()=>{
            setloading(true);
            const result = await getFullDetailsOfCourse(courseId , token);

            if(result?.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
                setloading(false);
            }
        }

        populatecoursedetails()

    } ,  [])


  return (


    <div className='flex min-h-[calc(100vh-3.5rem)]'>
     
  <div className=' flex flex-col ' > 
    
    <h1 className=' text-white ' >Edit Course</h1>
      
      <div>
        {
            course ? ( <Rendersteps/> ) : ( <p className=' text-white text-center ' >Course Not Found</p> )
        }
      </div>

  </div>

    </div>


  )
}

export default Editcourse