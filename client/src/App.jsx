import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './coponents/common/Navbar'

import Error from './Pages/Error'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Forgotpassword from './Pages/Forgotpassword'
import Updatepasswords from './Pages/Updatepasswords'
import Verifyemail from './Pages/Verifyemail'
import OpenRoute from './coponents/auth/Openroute'
import ProfileDropdown from './coponents/auth/Profiledropdown'
import About from './Pages/About'
import ContactUs from './Pages/ContactUs'
import Myprofile from './coponents/dashboardcompo/Myprofile'
import PrivateRoute from './coponents/PrivateRoute'
import Dashboard from './Pages/Dashboard'
import Settings from './coponents/settings/Settings'
import Enrolledcourses from './coponents/dashboardcompo/Enrolledcourses'
import Cart from './coponents/dashboardcompo/Cart/Cart'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import Mycourse from './coponents/dashboardcompo/instructor/Mycourse'
import Addcourse from './coponents/dashboardcompo/instructor/Addcourse'
import Editcourse from './coponents/dashboardcompo/instructor/editcourse/Editcourse'
import Catalog from './Pages/Catalog'
import CourseDetails from './Pages/CourseDetails'
import Viewlecture from './Pages/Viewlecture'
import Videodetails from './coponents/viewlectue/Videodetails'
import Instructordashboard from './coponents/settings/Instructordashboard'
import StudentProgress from './coponents/settings/StudentProgress'





const App = () => { 

   const {user} = useSelector((state)=>state.profile)
      
  return (
    <div>
      <Navbar/>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>} />
        <Route path="/signup" element={
          <OpenRoute>
            <Signup/>
            </OpenRoute>
          } />

        <Route path="/login"
         element={
         <OpenRoute>
          <Login/>
          </OpenRoute>
         } />

        <Route path='/forgot-password'
         element={

         <OpenRoute>
          <Forgotpassword/>
          </OpenRoute>
          }
           />

        <Route path='/resetpassword/:id'
         element={
         <OpenRoute>
          <Updatepasswords/>
          </OpenRoute>
         } />

        <Route path="/course/:courseId" 
         element={
         <CourseDetails/>
         } />

        <Route path="/error" 
         element={<Error />} />

        <Route path='/verifyemail'
         element={
         <OpenRoute>
          <Verifyemail/>
          </OpenRoute>
         } />

        <Route path='/about' 
        element={<About/>} />

        <Route path='/ContactUs' 
        element={<ContactUs/>} />

        {/* Dashboard Routes */}
        {/* nested route */}
        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          
          <Route path="/dashboard/my-profile" element={<Myprofile />} />
          <Route path='/dashboard/settings' element={  <Settings/> }  />
     

     {
      user?.accountType === ACCOUNT_TYPE.STUDENT && 
      <>
          <Route path='/dashboard/enrolled-courses' element={ <Enrolledcourses/> }  />
           <Route  path='/dashboard/wishlist' element={ <Cart/> }  />
           <Route path='/dashboard/cart'  element={ <Cart/> } />
           <Route path='/dashboard/progress' element={ <StudentProgress/> } />
       </>
     }

     {
      user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
      <>
      
          <Route path='/dashboard/my-courses' element={ <Mycourse/> } />
          <Route path='/dashboard/addcourse'  element={ <Addcourse/> }  />
          <Route path='/dashboard/edit-course/:courseId' element={ <Editcourse/> } />
          <Route  path='/dashboard/instructor'  element={<Instructordashboard/>} />

      </>
     }
                
 </Route>

 
 <Route
 path='/view-lecture/:courseId'
 element={
   <PrivateRoute>
      <Viewlecture />
  </PrivateRoute>
 }
 />

 <Route
 path='/view-lecture/:courseId/section/:sectionId/sub-section/:SubsectionId'
 element={
   <PrivateRoute>
      <Viewlecture />
  </PrivateRoute>
 }
 />

 {/* Test route to debug */}
 <Route
 path='/test-video'
 element={<div style={{color: 'white', fontSize: '24px', padding: '20px'}}>TEST ROUTE WORKS!</div>}
 />
 




 <Route   path='/catalog/:catalogName'   element={ <Catalog/>  }  />

      </Routes>
    </div>
  )
}

export default App