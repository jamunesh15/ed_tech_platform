


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { sidebarLinks } from '../../data/dashboard-links';
// import SidebarLinks from './Sidebarlinks';
// import { useNavigate } from 'react-router-dom';
// import { VscSignOut } from 'react-icons/vsc';
// import Modal from './Modal';
// import { logout } from '../../Services/operations/authAPI';
// import { VscSettingsGear } from 'react-icons/vsc';

// const Sidebar = ({ onLinkClick }) => {
//   const { user } = useSelector((state) => state.profile);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     console.log('User logged out');
//     dispatch(logout(navigate));
//     setShowLogoutModal(false); // Close modal after logout
//   };

//   return (
//     <div className="flex h-full min-w-[220px] w-full lg:w-[250px] flex-col gap-1 border-r border-r-richblack-700 bg-richblack-800 py-6 sm:py-8 lg:py-10 relative">
//       {/* Mobile Header */}
//       <div className="lg:hidden px-6 pb-4 border-b border-richblack-700 mb-4">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
//             {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
//           </div>
//           <div>
//             <p className="text-white font-semibold text-base">{user?.firstName} {user?.lastName}</p>
//             <p className="text-richblack-300 text-sm">{user?.accountType}</p>
//           </div>
//         </div>
//         <div className="mt-3 text-center">
//           <h3 className="text-yellow-400 font-semibold text-sm">Dashboard Menu</h3>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       {sidebarLinks.map((link) => {
//         if (link.type && user?.accountType !== link.type) return null;
//         return (
//           <SidebarLinks
//             key={link.id}
//             link={link}
//             iconName={link.icon}
//             onLinkClick={onLinkClick}
//           />
//         );
//       })}
      
//       <div className="w-full mb-[10px] mt-[20px] mx-3 h-[1px] bg-richblack-400"></div>

//       <SidebarLinks
//         link={{ name: 'Settings', path: '/dashboard/settings' }}
//         iconName="VscSettingsGear"
//         onLinkClick={onLinkClick}
//       />

//       {/* Logout Button */}
//       <div
//         onClick={() => {
//           setShowLogoutModal(true);
//           if (onLinkClick) onLinkClick();
//         }}
//         className="relative px-6 sm:px-8 py-3 sm:py-2 text-sm font-medium cursor-pointer text-richblack-300 hover:bg-red-800 hover:text-red-100 transition-all duration-200 mt-auto"
//       >
//         <div className="flex items-center gap-x-2">
//           <VscSignOut className="text-lg" />
//           <span className="text-sm sm:text-base">Logout</span>
//         </div>
//       </div>

//       {/* Logout Confirmation Modal */}
//       {showLogoutModal && (
//         <Modal
//           onClose={() => setShowLogoutModal(false)}
//           className="flex items-center justify-center min-h-screen"
//         >
//           <div className="bg-richblack-800 rounded-xl border border-richblack-700 p-4 sm:p-6 max-w-sm w-full text-richblack-100 shadow-lg">
//             <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">
//               Are you sure you want to logout?
//             </h2>
//             <div className="flex justify-end gap-2 sm:gap-3">
//               <button
//                 onClick={() => setShowLogoutModal(false)}
//                 className="px-3 sm:px-4 py-1 sm:py-2 rounded-md bg-richblack-700 hover:bg-richblack-600 transition-all text-sm sm:text-base"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="px-3 sm:px-4 py-1 sm:py-2 rounded-md bg-yellow-600 hover:bg-yellow-500 transition-all text-sm sm:text-base"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../../data/dashboard-links';
import SidebarLinks from './Sidebarlinks';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import Modal from './Modal';
import { logout } from '../../Services/operations/authAPI';
import { VscSettingsGear } from 'react-icons/vsc';

const Sidebar = ({ onLinkClick }) => {
  const { user } = useSelector((state) => state.profile);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('User logged out');
    dispatch(logout(navigate));
    setShowLogoutModal(false); // Close modal after logout
  };

  return (
    <div className="flex h-full min-w-[220px] w-full lg:w-[250px] flex-col gap-1 border-r-[1px] border-r-richblack-700 bg-richblack-800 py-6 sm:py-8 lg:py-10 relative">
      {/* Mobile Header */}
      <div className="lg:hidden px-6 pb-4 border-b border-richblack-700 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
            {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-white font-semibold text-base">{user?.firstName} {user?.lastName}</p>
            <p className="text-richblack-300 text-sm">{user?.accountType}</p>
          </div>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-yellow-400 font-semibold text-sm">Dashboard Menu</h3>
        </div>
      </div>

      {/* Navigation Links */}
      {sidebarLinks.map((link) => {
        if (link.type && user?.accountType !== link.type) return null;
        return (
          <SidebarLinks
            key={link.id}
            link={link}
            iconName={link.icon}
            onLinkClick={onLinkClick}
          />
        );
      })}
      
      <div className="w-full mb-[10px] mt-[20px] mx-3 h-[1px] bg-richblack-400"></div>

      <SidebarLinks
        link={{ name: 'Settings', path: '/dashboard/settings' }}
        iconName="VscSettingsGear"
        onLinkClick={onLinkClick}
      />

      {/* Logout Button */}
      <div
        onClick={() => {
          setShowLogoutModal(true);
          if (onLinkClick) onLinkClick();
        }}
        className="relative px-6 sm:px-8 py-3 sm:py-2 text-sm font-medium cursor-pointer text-richblack-300 hover:bg-red-800 hover:text-red-100 transition-all duration-200 mt-auto"
      >
        <div className="flex items-center gap-x-2">
          <VscSignOut className="text-lg" />
          <span className="text-sm sm:text-base">Logout</span>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <Modal onClose={() => setShowLogoutModal(false)}>
          <div className="text-richblack-100">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-md bg-richblack-700 hover:bg-richblack-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-500 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
// 




