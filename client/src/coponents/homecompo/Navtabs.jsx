




import React from 'react'
import { HomePageExplore } from "../../data/homepage-explore"
import { useState } from 'react';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto 
            py-8 sm:py-12 md:py-16 lg:py-20
            px-4 sm:px-6 md:px-8">
            
            {/* Tabs - Mobile: Horizontal Scroll, Desktop: Full Width */}
            <div className='w-full mb-8 sm:mb-10 md:mb-12 lg:mb-16'>
                
                {/* Mobile: Scrollable Tabs */}
                <div className='block sm:hidden'>
                    <div className='flex overflow-x-auto scrollbar-hide gap-3 px-2 pb-2'>
                        {tabsName.map((element, index) => (
                            <button
                                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium
                                    transition-all duration-200 whitespace-nowrap
                                    ${currentTab === element
                                        ? "bg-yellow-400 text-richblack-900 font-bold shadow-lg"
                                        : "bg-richblack-800 text-richblack-200 border border-richblack-600 hover:bg-richblack-700 hover:text-richblack-5"}`}
                                key={index}
                                onClick={() => setMyCards(element)}
                            >
                                {element}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tablet & Desktop: Centered Tabs */}
                <div className='hidden sm:flex justify-center'>
                    <div className='flex flex-wrap justify-center gap-3 md:gap-4 
                        bg-richblack-800 p-2 rounded-full border border-richblack-700
                        max-w-4xl'>
                        {tabsName.map((element, index) => (
                            <button
                                className={`px-4 md:px-6 py-2.5 md:py-3 rounded-full 
                                    text-sm md:text-base font-medium
                                    transition-all duration-200 whitespace-nowrap
                                    ${currentTab === element
                                        ? "bg-yellow-400 text-richblack-900 font-bold shadow-lg scale-105"
                                        : "text-richblack-200 hover:bg-richblack-700 hover:text-richblack-5"}`}
                                key={index}
                                onClick={() => setMyCards(element)}
                            >
                                {element}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Course Cards */}
            <div className='w-full max-w-6xl'>
                <div className='grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-3 
                    gap-6 sm:gap-7 md:gap-8
                    place-items-center'>
                    
                    {courses.map((element, index) => (
                        <CourseCard 
                            key={index}
                            cardData={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExploreMore;