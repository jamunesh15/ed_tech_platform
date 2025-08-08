// // Dashboard.js
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import Sidebar from '../coponents/dashboardcompo/Sidebar'
// import { Outlet } from 'react-router-dom'
// import { HiMenuAlt3 } from 'react-icons/hi'
// import { IoClose } from 'react-icons/io5'
// import { MdDashboard } from 'react-icons/md'

// const Dashboard = () => {
//   const {loading: authloading} = useSelector((state) => state.auth)
//   const {loading: profileloading} = useSelector((state) => state.profile)
//   const { user } = useSelector((state) => state.profile)
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen)
//   }

//   const closeSidebar = () => {
//     setIsSidebarOpen(false)
//   }
  
//   if (authloading || profileloading) {
//     return (
//       <div className='flex justify-center items-center min-h-screen text-lg sm:text-xl md:text-2xl lg:text-[30px] text-white font-bold bg-richblack-900'>
//         Loading....
//       </div>
//     )
//   }

//   return (
//     <div className="flex bg-richblack-900 min-h-[calc(100vh-3.5rem)] relative">
      
//       {/* Mobile Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-30 backdrop-blur-sm"
//           onClick={closeSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed lg:static inset-y-0 left-0 z-40 w-[300px] sm:w-[320px] 
//         transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
//         lg:translate-x-0 transition-transform duration-300 ease-in-out
//         lg:min-w-[220px] lg:w-[250px] shadow-2xl lg:shadow-none
//       `}>
//         <Sidebar onLinkClick={closeSidebar} />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto w-full lg:ml-0">
//         <div className="mx-auto w-[95%] sm:w-11/12 max-w-[1000px] py-6 sm:py-8 lg:py-10 pt-12 lg:pt-10">
//           {/* Dashboard Menu Button - Above content */}
//           <button
//             onClick={toggleSidebar}
//             className="lg:hidden flex items-center gap-2 px-4 py-3 mb-4 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 text-richblack-900 hover:from-yellow-50 hover:to-yellow-100 transition-all duration-300 shadow-xl border-2 border-yellow-400/20"
//             aria-label="Toggle dashboard menu"
//           >
//             <MdDashboard className="text-xl" />
//             <span className="text-sm font-bold">Dashboard</span>
//             {isSidebarOpen ? (
//               <IoClose className="text-xl" />
//             ) : (
//               <HiMenuAlt3 className="text-xl" />
//             )}     
//           </button>
          
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../coponents/dashboardcompo/Sidebar';
import { Outlet } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.profile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-richblack-900 text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-richblack-900 min-h-[calc(100vh-3.5rem)] relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-30 backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-[260px] sm:w-[280px] md:w-[300px] 
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          lg:min-w-[220px] lg:w-[250px] bg-richblack-800 shadow-2xl lg:shadow-none
        `}
      >
        <Sidebar onLinkClick={closeSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full lg:ml-0">
        <div className="mx-auto w-[95%] sm:w-11/12 max-w-[1000px] py-4 sm:py-6 md:py-8 lg:py-10 pt-8 sm:pt-10 lg:pt-12">
          {/* Dashboard Menu Button - Above content */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 mb-4 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 text-richblack-900 hover:from-yellow-50 hover:to-yellow-200 transition-all duration-300 shadow-md border border-yellow-400/20"
            aria-label="Toggle dashboard menu"
            aria-expanded={isSidebarOpen}
          >
            <MdDashboard className="text-lg sm:text-xl" />
            <span className="text-xs sm:text-sm font-bold">Dashboard</span>
            {isSidebarOpen ? (
              <IoClose className="text-lg sm:text-xl" />
            ) : (
              <HiMenuAlt3 className="text-lg sm:text-xl" />
            )}
          </button>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;