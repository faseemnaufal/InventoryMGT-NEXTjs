import { HelpCircle, LayoutGrid, List, MoreHorizontal, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function FixedHeader({newLink}) {
  return (
    <div className='flex justify-between items-center bg-white py-5 px-4'>
      <button className='text-2xl'>All Items</button>
      <div className="flex gap-4">
        {/* new */}
        <Link href={newLink} className='p-1 rounded-sm bg-blue-600
          flex items-center px-3 space-x-2 text-white'>
          <Plus className=' w-4 h-4'/>
          <span className>New</span>
        </Link>
        {/* layout */}
        <div className="flex rounded-md overflow-hidden">
          <button className='bg-gray-300 p-2 border-r
          border-gray-400'>
            <List className='w-4 h-4'/>
          </button>
          <button className='bg-gray-100 p-2'>
            <LayoutGrid className='w-4 h-4'/>
          </button>
        </div>
        {/* more */}
        <button className='bg-gray-100 p-2 rounded-md'>
          <MoreHorizontal className='w-4 h-4'/>
        </button>
        {/* help */}
        <button className='bg-orange-600 text-white p-2 rounded-md'>
          <HelpCircle className='w-5 h-5'/>
        </button>
      </div>
    </div>
  )
}
