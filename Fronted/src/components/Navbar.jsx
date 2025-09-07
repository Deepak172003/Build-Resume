import React from "react"

const Navbar = () =>{
  return (
    <div className='h-16 pg-white/70 backdrop-blur-xl border-b border-violet-100/50 py-2.5 px-4 md:px-0 sticky top-0 z-50'>
      <div className='max-w-6x1 mx-auto flex items-centre justify-between gap-5'>
        <link to='/' className="flex items-center gap-3">
        <div className="flex items-center pb-6 gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2x1 flex items-center justifiy-center shadow-lg shadow-violet-200">
            <LayoutTemplate className="w-5 text-white"/>
          </div>
          <span className="text-xl sm:t2x1 font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text- transparent">
            ResumeXpert
          </span>
        </div>
        
        </link>
        <profileInfoCard/>
      </div>
    </div>
  )
}

export default Navbar