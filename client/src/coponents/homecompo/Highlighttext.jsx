import React from 'react'

const Highlighttext = ( {text} ) => {
  return (
    <div className=' text-[32px] font-bold  texthover bg-gradient-to-r from-blue-50 to-blue-200 bg-clip-text text-transparent ' >
         {text}
    </div>
  )
}

export default Highlighttext