import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheckCircle } from "react-icons/fa";
import Courseinformation from './Courseinformation';
import Coursebuilder from './Coursebuilder';
import COursepublish from './Coursepublish';

const Rendersteps = () => {
  const { step } = useSelector((state) => state.course);
        
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    }
  ]
 
  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      <div className="max-w-4xl mx-auto p-4">
        {/* Progress Steps */}
        <div className="mb-8">
          {/* Step indicators with connecting lines */}

          <div className="flex items-center justify-between mb-6 relative">

            {steps.map((item, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">

                <div className={`w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-[22px] font-bold border-2 transition-all duration-300
                  ${step === item.id ?
                    "bg-yellow-800 text-yellow-50 border-yellow-400"
                    :
                    step > item.id ?
                    " text-yellow-200 bg-yellow-700 border-green-500"
                    :
                    "bg-richblack-700 text-richblack-900 border-yellow-400"}`}>
                  {step > item.id ? <FaCheckCircle className=' text-richblack-5 rounded-full ' size={20} /> : item.id}
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors duration-300 text-center
                  ${step === item.id ? "text-yellow-50" : 
                    step > item.id ? "text-green-400" : "text-richblack-25"}`}>
                  {item.title}
                </span>
              </div>
            ))}
            
            {/* Progress line - single line spanning entire width */}
            <div className="absolute top-5 left-9 right-0 h-0.5 bg-richblack-600 z-0">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: ` ${((step - 1) / (steps.length - 1)) * 100}% ` }}
              ></div>
            </div>
          </div>
          
          {/* Step titles breadcrumb style */}
          <div className="flex items-center justify-center">
            {steps.map((item, index) => (
              <React.Fragment key={index}>
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  step === item.id ? "text-yellow-50" : 
                  step > item.id ? "text-green-400" : "text-richblack-400"
                }`}>
                  {item.title}
                </span>
                {index < steps.length - 1 && (
                  <span className="mx-3 text-richblack-500">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Render current step */}
        <div className="transition-all duration-300">
          {step === 1 && <Courseinformation />}
          {step === 2 && <Coursebuilder />}
          {step === 3 && <COursepublish />}
        </div>
      </div>
    </div>
  )
}

export default Rendersteps;



// import React from 'react'
// import { useSelector } from 'react-redux'
// import { FaCheckCircle } from "react-icons/fa";
// import Courseinformation from './Courseinformation';
// import Coursebuilder from './Coursebuilder';
// import COursepublish from './Coursepublish';

// const Rendersteps = () => {
//   const { step } = useSelector((state) => state.course);
           
//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//       shortTitle: "Info"
//     },
//     {
//       id: 2,
//       title: "Course Builder", 
//       shortTitle: "Builder"
//     },
//     {
//       id: 3,
//       title: "Publish",
//       shortTitle: "Publish"
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-richblack-900 text-richblack-5">
//       <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 lg:p-6">
//         {/* Progress Steps */}
//         <div className="mb-6 sm:mb-8">
//           {/* Step indicators with connecting lines - Desktop & Tablet */}
//           <div className="hidden sm:block">
//             <div className="flex items-center justify-between mb-4 sm:mb-6 relative">
//               {steps.map((item, index) => (
//                 <div key={index} className="flex flex-col items-center relative z-10">
//                   <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm sm:text-lg lg:text-xl font-bold border-2 transition-all duration-300
//                     ${step === item.id ?
//                       "bg-yellow-800 text-yellow-50 border-yellow-400"
//                       :
//                       step > item.id ?
//                       "text-yellow-200 bg-yellow-700 border-green-500"
//                       :
//                       "bg-richblack-700 text-richblack-300 border-richblack-500"}`}>
//                     {step > item.id ? <FaCheckCircle className="text-green-400" size={16} /> : item.id}
//                   </div>
//                   <span className={`text-xs sm:text-sm mt-2 font-medium transition-colors duration-300 text-center max-w-[80px] sm:max-w-none
//                     ${step === item.id ? "text-yellow-50" :
//                        step > item.id ? "text-green-400" : "text-richblack-300"}`}>
//                     <span className="hidden sm:inline">{item.title}</span>
//                     <span className="sm:hidden">{item.shortTitle}</span>
//                   </span>
//                 </div>
//               ))}
                       
//               {/* Progress line - single line spanning entire width */}
//               <div className="absolute top-4 sm:top-5 lg:top-6 left-4 sm:left-5 lg:left-6 right-4 sm:right-5 lg:right-6 h-0.5 bg-richblack-600 z-0">
//                 <div
//                   className="h-full bg-green-500 transition-all duration-300"
//                   style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Progress Indicator */}
//           <div className="block sm:hidden mb-6">
//             <div className="flex items-center justify-center mb-4">
//               <div className="flex items-center space-x-2">
//                 {steps.map((item, index) => (
//                   <React.Fragment key={index}>
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
//                       ${step === item.id ?
//                         "bg-yellow-800 text-yellow-50 border-yellow-400"
//                         :
//                         step > item.id ?
//                         "text-yellow-200 bg-yellow-700 border-green-500"
//                         :
//                         "bg-richblack-700 text-richblack-300 border-richblack-500"}`}>
//                       {step > item.id ? <FaCheckCircle className="text-green-400" size={14} /> : item.id}
//                     </div>
//                     {index < steps.length - 1 && (
//                       <div className={`w-8 h-0.5 transition-colors duration-300 ${
//                         step > item.id ? "bg-green-500" : "bg-richblack-600"
//                       }`}></div>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>
            
//             {/* Current step title for mobile */}
//             <div className="text-center">
//               <span className="text-lg font-semibold text-yellow-50">
//                 Step {step}: {steps[step - 1]?.title}
//               </span>
//             </div>
//           </div>
                   
//           {/* Step titles breadcrumb style - Hidden on mobile */}
//           <div className="hidden sm:flex items-center justify-center">
//             {steps.map((item, index) => (
//               <React.Fragment key={index}>
//                 <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
//                   step === item.id ? "text-yellow-50" :
//                    step > item.id ? "text-green-400" : "text-richblack-400"
//                 }`}>
//                   {item.title}
//                 </span>
//                 {index < steps.length - 1 && (
//                   <span className="mx-2 sm:mx-3 text-richblack-500">/</span>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* Render current step */}
//         <div className="transition-all duration-300 w-full">
//           <div className="w-full max-w-none">
//             {step === 1 && (
//               <div className="w-full">
//                 <Courseinformation />
//               </div>
//             )}
//             {step === 2 && (
//               <div className="w-full">
//                 <Coursebuilder />
//               </div>
//             )}
//             {step === 3 && (
//               <div className="w-full max-w-2xl mx-auto">
//                 <COursepublish />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Rendersteps;