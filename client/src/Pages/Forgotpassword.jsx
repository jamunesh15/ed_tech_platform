import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go"
import toast from 'react-hot-toast'
import { getResetpasswordToken } from '../Services/operations/authAPI'

const Forgotpassword = () => {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter your email address")
      return
    }
    dispatch(getResetpasswordToken(email, setEmailSent))
  }

  return (
    <div className='bg-richblack-900 min-h-screen flex justify-center items-center px-4'>
      <div className='flex flex-col w-full max-w-md mx-auto'>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-50"></div>
            <p className="text-richblack-100 mt-4">Loading...</p>
          </div>
        ) : (
          <div className="bg-richblack-800 rounded-lg p-8 border border-richblack-700 shadow-xl">
            <h1 className='text-richblack-5 text-3xl font-bold mb-4'>
              {!emailSent ? "Reset your password" : "Check email"}
            </h1>
            
            <p className='text-richblack-100 mb-6 leading-relaxed'>
              {!emailSent 
                ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
                : `We have sent the reset email to ${email}`
              }
            </p>

            <form className='space-y-6' onSubmit={handleSubmit}>
              {!emailSent ? (
                <div className="flex flex-col gap-2">
                  <label className='text-richblack-5 text-sm font-medium'>
                    Email Address <span className='text-pink-200'>*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder='Enter Your Email Address'
                    value={email}
                    className='w-full bg-richblack-700 text-richblack-5 p-3 rounded-lg border border-richblack-600 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 outline-none transition-all'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-richblack-200">
                    Didn't receive the email? Check your spam folder or click below to resend.
                  </p>
                </div>
              )}
             
              <button 
                type='submit' 
                className='w-full bg-yellow-50 text-richblack-900 py-3 rounded-lg font-bold text-center hover:bg-yellow-100 hover:scale-95 transition-all duration-200'
              >
                {!emailSent ? "Reset Password" : "Resend Email"}
              </button>
            </form>
            
            <Link 
              className='flex items-center gap-2 text-richblack-300 mt-6 hover:text-white hover:underline transition-all' 
              to={"/login"}
            >
              <GoArrowLeft />   
              <span>Back to login</span>
            </Link>
          </div>
        )}
      </div>  
    </div>
  )
}

export default Forgotpassword
