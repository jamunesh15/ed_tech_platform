import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink } from 'react-router-dom'
import { VscSettingsGear } from "react-icons/vsc";

const SidebarLinks = ({ link, iconName, onLinkClick }) => {
    const Icon = Icons[iconName]

    const handleClick = () => {
        // Close sidebar on mobile when link is clicked
        if (onLinkClick) {
            onLinkClick()
        }
    }

    return (
        <NavLink 
            to={link.path}
            onClick={handleClick}
            className={({ isActive }) => `relative px-6 sm:px-8 py-3 sm:py-2 hover:bg-yellow-800 hover:text-yellow-50 transition-all duration-200 text-sm font-medium ${
                isActive ? "bg-yellow-800 text-yellow-50 hover:bg-yellow-800 hover:text-yellow-50 transition-all duration-200" : "bg-opacity-0 text-richblack-300"
            }`}
        >
            {({ isActive }) => (
                <>
                    <span
                        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                            isActive ? "opacity-100" : "opacity-0"
                        }`}
                    ></span>
                    <div className='flex items-center gap-x-2'>
                        <Icon className='text-lg' />
                        <span className="text-sm sm:text-base">{link.name}</span>
                    </div>
                </>
            )}
        </NavLink>
    )
}

export default SidebarLinks