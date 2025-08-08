import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { sendOtp, signUp } from '../Services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const Verifyemail = () => {
    const { signupData, loading } = useSelector((state) => state.auth)
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!signupData) {
            navigate("/signup")
        }
    }, [signupData, navigate])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        
        if (!signupData) {
            toast.error("Signup data missing")
            return navigate("/signup")
        }
        
        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit OTP")
            return
        }
        
        const {
            accountType,
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
            contactNumber = "" // Make sure it's included even if empty
        } = signupData

        dispatch(signUp(
            firstname,
            lastname,
            email,
            password,
            confirmpassword, 
            accountType,
            contactNumber, // Now properly passed even if empty
            otp,
            navigate
        ))
    }

    return (
        <div className='bg-richblack-900 min-h-screen flex items-center justify-center'>
            <div className='flex w-full max-w-[500px] flex-col items-center bg-richblack-800 p-8 rounded-lg'>
                {loading ? (
                    <div className='text-white font-bold text-[35px] text-center'>LOADING...</div>
                ) : (
                    <div className='w-full'>
                        <h1 className='font-bold text-richblack-5 text-[30px] text-center'>Verify Email</h1>
                        <p className='text-richblack-100 mt-4 text-center'>
                            A verification code has been sent to you. Enter the code below
                        </p>

                        <form onSubmit={handleOnSubmit} className='mt-6 w-full'>
                            <div className='flex justify-center'>
                                      <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            placeholder="-"
                                              style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                               
                  }}
                   className="w-[48px] lg:w-[50px] border-0 bg-richblack-700 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                        />
                                    )}
                                    containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "6px",
                                    }}
                                />
                            </div>

                            <button
                                type='submit'
                                className='mt-6 w-full text-center px-6 py-3  font-bold text-[16px] bg-yellow-50 text-richblack-900 hover:scale-95 transition-all duration-200'
                            >
                                Verify And Register
                            </button>
                        </form>

                        <div className="flex justify-between mt-6">
                            <button 
                                onClick={() => navigate("/signup")}
                                className='text-richblack-5 hover:underline flex gap-2 items-center'
                            >
                                <FaArrowLeftLong />
                                Back to Signup
                            </button>
                            <button 
                                onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                                className='text-blue-100 hover:underline flex gap-2 items-center'
                            >
                                <HiArrowPathRoundedSquare />
                                Resend it
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Verifyemail