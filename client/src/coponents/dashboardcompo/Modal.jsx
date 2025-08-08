// import React from 'react'

// const Modal = ({ children, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div 
//         className="absolute inset-0" 
//         onClick={onClose}
//       ></div>
//       <div className="bg-richblack-800 p-6 rounded-lg z-10 min-w-[400px]">
//         {children}
//       </div>
//     </div>
//   )
// }

// export default Modal


// import React from 'react';

// const Modal = ({ children, onClose }) => {
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="modal-title"
//     >
//       <div
//         className="absolute inset-0"
//         onClick={onClose}
//         aria-hidden="true"
//       ></div>
//       <div className="bg-richblack-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg min-w-[300px] sm:min-w-[350px] md:min-w-[400px] max-w-[90%] sm:max-w-[80%] md:max-w-[500px] z-10">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;





import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, onClose }) => {
  // Use the body as the portal target to render the modal outside the sidebar
  const modalRoot = document.getElementById('modal-root') || document.body;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="bg-richblack-800 p-6 rounded-lg z-10 min-w-[400px]">
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;