// CTAbutton.js
import React from 'react'
import { Link } from 'react-router-dom'

const CTAbutton = ({ children, active, linkto }) => {
    return (
        <Link to={linkto}>

            <div className={`text-center px-6 py-3 rounded-md font-bold  text-[16px]
                ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"}
                hover:scale-95 transition-all duration-200 hover:underline `}>
                {children}
            </div>
        </Link>
    )
}

export default CTAbutton    