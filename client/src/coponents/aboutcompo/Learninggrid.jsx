// import React from 'react'
// import Highlighttext from '../homecompo/Highlighttext';
// import CTAbutton from '../homecompo/CTAbutton';

// const Learninggrid = () => {
//   const LearningGridArray = [
//     {
//       order: -1,
//       heading: "World-Class Learning for",
//       highlightText: "Anyone, Anywhere",
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
//       BtnText: "Learn More",
//       BtnLink: "/",
//     },
//     {
//       order: 1,
//       heading: "Curriculum Based on Industry Needs",
//       description:
//         "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
//     },
//     {
//       order: 2,
//       heading: "Our Learning Methods",
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring",
//     },
//     {
//       order: 3,
//       heading: "Certification",
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring",
//     },
//     {
//       order: 4,
//       heading: `Rating "Auto-grading"`,
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring",
//     },
//     {
//       order: 5,
//       heading: "Ready to Work",
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring",
//     },
//   ];

//   return (
//     <div>
//       <div className='grid lg:grid-cols-4 grid-rows-2'>
//         {LearningGridArray.map((element, index) => {

//           return (
//             <div  
//               key={index} 
//               className={`
//                 ${element.order === -1 ? "md:col-span-2  p-4 bg-transparent" : ""}
//                 ${element.order > 0 && index % 2 === 1 ? "bg-richblack-800" : "bg-richblack-700"}
//                 ${element.order === 3 ? "md:col-start-2" : ""}
//                 ${element.order !== -1 ?  "h-[260px] hover:scale-105 transition-all duration-200 hover:border-caribbeangreen-300 hover:border-[3px] hover:rounded-[15px] p-8"  : "" }
                
//               `}
//             >
//               {element.order === -1 ? (
//                 <div className='flex flex-col gap-4'>
//                   <h1 className='text-4xl text-richblack-5   font-bold'>
//                     {element.heading}
//                     <Highlighttext text={element.highlightText} />
//                   </h1>
//                   <p className='text-richblack-300'>{element.description}</p>
//                   <button className=' w-[150px] ' >
//                   <CTAbutton  active={true} linkto={"/signup"} >
//                     Learn More
//                   </CTAbutton>
//                   </button>
//                 </div>
//               ) : 
//               (
//                 <div className='flex flex-col gap-2'>
//                   <h3 className='text-lg hover:text-blue-50 transition-all  text-richblack-5 font-bold'>{element.heading}</h3>
//                   <p className='text-richblack-200'>{element.description}</p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Learninggrid;



import React from 'react';
import Highlighttext from '../homecompo/Highlighttext';
import CTAbutton from '../homecompo/CTAbutton';

const Learninggrid = () => {
  const LearningGridArray = [
    {
      order: -1,
      heading: 'World-Class Learning for',
      highlightText: 'Anyone, Anywhere',
      description:
        'Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.',
      BtnText: 'Learn More',
      BtnLink: '/',
    },
    {
      order: 1,
      heading: 'Curriculum Based on Industry Needs',
      description:
        'Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.',
    },
    {
      order: 2,
      heading: 'Our Learning Methods',
      description:
        'Studynotion partners with more than 275+ leading universities and companies to bring flexible learning experiences.',
    },
    {
      order: 3,
      heading: 'Certification',
      description:
        'Earn recognized certifications from top institutions to boost your career.',
    },
    {
      order: 4,
      heading: 'Rating "Auto-grading"',
      description:
        'Our auto-grading system provides instant feedback to enhance your learning.',
    },
    {
      order: 5,
      heading: 'Ready to Work',
      description:
        'Gain practical skills to prepare you for real-world job challenges.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {LearningGridArray.map((element, index) => (
          <div
            key={index}
            className={`
              p-4 sm:p-6 rounded-xl transition-all duration-300
              ${
                element.order === -1
                  ? 'sm:col-span-2 bg-transparent'
                  : element.order % 2 === 1
                  ? 'bg-richblack-800'
                  : 'bg-richblack-700'
              }
              ${
                element.order !== -1
                  ? 'h-60 sm:h-64 hover:scale-[1.02] hover:shadow-lg hover:shadow-caribbeangreen-300/50'
                  : ''
              }
              ${element.order === 3 ? 'lg:col-start-2' : ''}
            `}
          >
            {element.order === -1 ? (
              <div className="flex flex-col gap-4 sm:gap-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-richblack-5">
                  {element.heading} <Highlighttext text={element.highlightText} />
                </h1>
                <p className="text-richblack-300 text-sm sm:text-base">
                  {element.description}
                </p>
                <div className="w-fit">
                  <CTAbutton active={true} linkto={element.BtnLink}>
                    {element.BtnText}
                  </CTAbutton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:gap-3 h-full">
                <h3 className="text-lg sm:text-xl font-semibold text-richblack-5 hover:text-blue-50 transition-colors duration-200">
                  {element.heading}
                </h3>
                <p className="text-richblack-200 text-sm sm:text-base">
                  {element.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learninggrid;