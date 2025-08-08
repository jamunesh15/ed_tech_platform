// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import CTAbutton from '../homecompo/CTAbutton'

// import { contactusEndpoint } from '../../Services/apis'
// import { apiconnector } from '../../Services/apiconnector'
// import countrycode from "../../data/countrycode.json"
// import Highlighttext from '../homecompo/Highlighttext'

// const Contactform = () => {
//   const [loading, setloading] = useState(false)

//   const { 
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitSuccessful }
//   } = useForm()

//   useEffect(() => {
//     if (isSubmitSuccessful) {
//       reset({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phonenumber: "",
//         message: ""
//       })
//     }
//   }, [reset, isSubmitSuccessful])

//   const onSubmit = async(data)=>{
//     console.log("logged in DATA---->  "  ,data);

//     try {
//   setloading(true)
//      const response = await apiconnector( "POST" , contactusEndpoint.CONTACT_US_API , data )
//      console.log("CONTACT US API RESPONSE   ", response.data.data);
//      setloading(false)
     
      
//     } catch (error) {
//        console.log("Error while contacting host  ",error);
       
//     }
    
//   }

//   return (
//     <div className='w-full max-w-[800px] mx-auto   p-6'>
//       <h1 className='font-bold text-richblack-5 text-center text-4xl mb-2'> <Highlighttext text={"Get In Touch"} /> </h1>
//       <p className='text-richblack-200 text-center mb-8'>We'd love to hear from you, Please fill out this form.</p>

//       <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
//         {/* Name fields - first and last name */}
//         <div className='flex flex-col sm:flex-row gap-6'>
//           <div className='flex-1'>
//             <label htmlFor="firstName" className='block text-richblack-5 mb-2'>First Name</label>
//             <input
//               type="text"
//               name='firstName'
//               id='firstName'
//               placeholder='Enter first name'
//               className='w-full bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300  focus:outline-none focus:ring-2 focus:ring-yellow-50'
//               {...register("firstName", { required: true })}  
//             />
//             {errors.firstName && (
//               <span className='text-yellow-50 text-sm'>Please enter your first name</span>
//             )}
//           </div>

//           <div className='flex-1'>
//             <label htmlFor="lastName" className='block text-richblack-5 mb-2'>Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               id="lastName"
//               placeholder='Enter last name'
//               className='w-full bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50'
//               {...register("lastName")}
//             />
//           </div>
//         </div>

//         {/* Email field */}
//         <div>
//           <label htmlFor="email" className='block text-richblack-5 mb-2'>Email Address</label>
//           <input
//             type="email"
//             id='email'
//             name='email'
//             placeholder='Enter email address'
//             className='w-full bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50'
//             {...register("email", { required: true })}
//           />
//           {errors.email && (
//             <span className='text-yellow-50 text-sm'>Please enter your email</span>
//           )}
//         </div>

//         {/* Phone number field */}
//          <div>
//   <label htmlFor="phoneNumber" className='block  text-richblack-5 mb-2'>Phone Number</label>
//   <div className='flex gap-1'>
//     <select 
//       className='flex w-[75px] text-white border-b-[2px] rounded-[10px]  bg-richblack-800 p-3   border-richblack-400 focus:outline-none'
//       {...register("countryCode")}
//     >
//       {countrycode.map((element, index) => (
//         <option key={index} value={element.code}>
//           {element.code} - {element.country}
//         </option>
//       ))}
//     </select>
//     <input
//       type="tel"
//       id='phonenumber'
//       name='phonenumber'
//       placeholder='12345 67890'
//       className='w-full bg-richblack-800 rounded-[10px] p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50'
//       {...register("phonenumber")}
//     />
//   </div>
// </div>
//         {/* Message field */}
//         <div>
//           <label htmlFor="message" className='block text-richblack-5 mb-2'>Message</label>
//           <textarea
//             name="message"
//             id="message"
//             cols={20}
//             rows={7}
//             placeholder='Enter your message here...'
//             className='w-full h-[150px] bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50'
//             {...register("message", { required: true })}
//           ></textarea>
//           {errors.message && (
//             <span className='text-yellow-50 text-sm'>Please enter your message</span>
//           )}
//         </div>

//         {/* Submit button */}
//         <div className='flex justify-center'>
//           <button
//             type="submit"
//             className='bg-yellow-50 w-full text-richblack-900 px-8 py-3 rounded-lg font-bold hover:scale-95 transition-all hover:underline duration-200 hover:bg-yellow-100 '
//             disabled={loading}
//           >
//             {loading ? 'Sending...' : 'Send Message'}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Contactform



import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CTAbutton from '../homecompo/CTAbutton';
import { contactusEndpoint } from '../../Services/apis';
import { apiconnector } from '../../Services/apiconnector';
import countrycode from '../../data/countrycode.json';
import Highlighttext from '../homecompo/Highlighttext';

const Contactform = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phonenumber: '',
        message: '',
        countryCode: countrycode[0].code, // Default to first country code
      });
    }
  }, [reset, isSubmitSuccessful]);

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    try {
      setLoading(true);
      const response = await apiconnector('POST', contactusEndpoint.CONTACT_US_API, data);
      console.log('Contact Us API Response:', response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error while contacting host:', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-richblack-5 text-center mb-4">
        <Highlighttext text="Get In Touch" />
      </h1>
      <p className="text-richblack-200 text-center mb-6 sm:mb-8 text-sm sm:text-base">
        We'd love to hear from you. Please fill out this form.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        {/* Name fields */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-richblack-5 mb-1 text-sm sm:text-base">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="w-full bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50 text-sm sm:text-base"
              {...register('firstName', { required: 'First name is required' })}
              aria-invalid={errors.firstName ? 'true' : 'false'}
            />
            {errors.firstName && (
              <span className="text-yellow-50 text-xs sm:text-sm mt-1" role="alert">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-richblack-5 mb-1 text-sm sm:text-base">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="w-full bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50 text-sm sm:text-base"
              {...register('lastName')}
            />
          </div>
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-richblack-5 mb-1 text-sm sm:text-base">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            className="w-full bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50 text-sm sm:text-base"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <span className="text-yellow-50 text-xs sm:text-sm mt-1" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Phone number field */}
        <div>
          <label htmlFor="phonenumber" className="block text-richblack-5 mb-1 text-sm sm:text-base">
            Phone Number
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <select
              className="w-full sm:w-24 bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50 text-sm sm:text-base"
              {...register('countryCode')}
              aria-label="Country code"
            >
              {countrycode.map((element, index) => (
                <option key={index} value={element.code}>
                  {element.code} - {element.country}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phonenumber"
              placeholder="12345 67890"
              className="w-full bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50 text-sm sm:text-base"
              {...register('phonenumber', {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number',
                },
              })}
              aria-invalid={errors.phonenumber ? 'true' : 'false'}
            />
          </div>
          {errors.phonenumber && (
            <span className="text-yellow-50 text-xs sm:text-sm mt-1" role="alert">
              {errors.phonenumber.message}
            </span>
          )}
        </div>

        {/* Message field */}
        <div>
          <label htmlFor="message" className="block text-richblack-5 mb-1 text-sm sm:text-base">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Enter your message here..."
            className="w-full h-32 bg-richblack-800 rounded-lg p-3 text-richblack-5 border-b border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50 text-sm sm:text-base resize-none"
            {...register('message', { required: 'Message is required' })}
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <span className="text-yellow-50 text-xs sm:text-sm mt-1" role="alert">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto bg-yellow-50 text-richblack-900 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-yellow-100 hover:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            aria-label="Send message"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contactform;