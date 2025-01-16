import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-slate-700 text-white py-4'>
        <div className="logo">
            <span className='font-bold text-2xl mx-9'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-9'>   
            <li className='hover:font-bold transition-all'>Home</li>
            <li className='hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </div>
  )
}

export default Navbar
