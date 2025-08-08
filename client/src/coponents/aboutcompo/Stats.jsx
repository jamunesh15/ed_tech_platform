// import React from 'react'

// const Stats = () => {
//   const data = [
//     { count: "5K", label: "Active Students" },
//     { count: "10+", label: "Mentors" },
//     { count: "200+", label: "Courses" },
//     { count: "50+", label: "Awards" },
//   ]

//   return (
//     <div className='bg-richblack-700 mb-[20px] w-full rounded-[20px] shadow-inner shadow-pink-300  py-12'>

//       <div className='text-white flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 max-w-full mx-auto px-4'>

//         {data.map((element, index) => (

//           <div key={index} className='flex flex-col hover:scale-125 hover:cursor-pointer transition-all duration-300 items-center'>
//             <p className='text-2xl md:text-3xl lg:text-4xl font-bold text-richblack-5'>
//               {element.count}
//             </p>

//             <p className='text-sm md:text-base text-richblack-200 text-center'>
//               {element.label}
//             </p>

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Stats



import React from 'react';

const Stats = () => {
  const data = [
    { count: '5K', label: 'Active Students' },
    { count: '10+', label: 'Mentors' },
    { count: '200+', label: 'Courses' },
    { count: '50+', label: 'Awards' },
  ];

  return (
    <div className="w-full bg-richblack-700 py-8 sm:py-12 px-4 sm:px-6 rounded-2xl shadow-inner shadow-pink-300/50">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
        {data.map((element, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
            role="figure"
            aria-label={`${element.count} ${element.label}`}
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-richblack-5">
              {element.count}
            </p>
            <p className="text-sm sm:text-base text-richblack-200 mt-1">
              {element.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;