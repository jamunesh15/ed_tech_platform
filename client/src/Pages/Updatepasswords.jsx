import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import toast from 'react-hot-toast'
import { resetpassword } from '../Services/operations/authAPI'

const Updatepasswords = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.auth)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   
    const [formData, setFormData] = useState({
         password: "",
         confirmpassword: ""
    })

    const { password, confirmpassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value    
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!password.trim()) {
            toast.error("Please enter a password")
            return
        }
        
        if (!confirmpassword.trim()) {
            toast.error("Please confirm your password")
            return
        }
        
        if (password !== confirmpassword) {
            toast.error("Passwords do not match")
            return
        }
        
        const token = location.pathname.split("/").at(-1)
        dispatch(resetpassword(password, confirmpassword, token))
        navigate("/login")
    }

    return (
        <div className='bg-richblack-900 min-h-screen flex justify-center items-center px-4'>
            <div className='w-full max-w-md mx-auto'>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-50"></div>
                        <p className="text-richblack-100 mt-4">Loading...</p>
                    </div>
                ) : (
                    <div className="bg-richblack-800 rounded-lg p-8 border border-richblack-700 shadow-xl">
                        <h1 className='text-richblack-5 font-bold text-3xl mb-4'>
                            Choose New Password
                        </h1>
                        <p className='text-richblack-100 mb-6 leading-relaxed'>
                            Almost done. Enter your new password and you're all set.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* New Password Field */}
                            <div className="flex flex-col gap-2">
                                <label className='text-richblack-5 text-sm font-medium'>
                                    New Password <span className='text-pink-200'>*</span>
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={handleOnChange}
                                        className='w-full bg-richblack-700 text-richblack-5 p-3 rounded-lg border border-richblack-600 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 outline-none transition-all pr-10'
                                        placeholder='Enter new Password'
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-100"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible className="text-xl" /> : <AiOutlineEye className="text-xl" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="flex flex-col gap-2">
                                <label className='text-richblack-5 text-sm font-medium'>
                                    Confirm New Password <span className='text-pink-200'>*</span>
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmpassword"
                                        value={confirmpassword}
                                        onChange={handleOnChange}
                                        className='w-full bg-richblack-700 text-richblack-5 p-3 rounded-lg border border-richblack-600 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 outline-none transition-all pr-10'
                                        placeholder='Confirm New Password'
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-100"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <AiOutlineEyeInvisible className="text-xl" /> : <AiOutlineEye className="text-xl" />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type='submit' 
                                className='w-full bg-yellow-50 text-richblack-900 py-3 rounded-lg font-bold text-center hover:bg-yellow-100 hover:scale-95 transition-all duration-200'
                            >
                                Reset Password
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

export default Updatepasswords