import { AlignJustify, Bell, ChevronDown, History, LayoutGrid, Plus, Settings, Users } from 'lucide-react'
import React from 'react'
import SearchInput from './SearchInput'
import Image from 'next/image'
import { set } from 'react-hook-form'

export default function Header({setShowSidebar}) {
 
  function handleClick(){
    console.log("Btn clicked")
    
  }

  return (
    <div className='bg-gray-100 h-12 flex items-center justify-between px-8
    border-b border-slate-200'>
      <button className='lg:hidden' onClick={()=>setShowSidebar(true)}>
        <AlignJustify className='w-6 h-6'/>
      </button>
      <div className='flex gap-3'>
        {/* Recent Activities */}
        <button className='hidden lg:block'>
          <History className='w-6 h-6'/>
        </button>
        {/* Search */}
        <SearchInput />
      </div>
      <div className='items-center gap-3 hidden lg:flex'>
        {/* Plus icon */}
        <div className="pr-2 border-r border-gray-300">
          <button className='p-1 rounded-lg bg-blue-600'>
            <Plus className='text-slate-50 w-4 h-4'/>
          </button>
        </div>
        <div className="flex border-r border-gray-300 space-x-2">
          <button className='p-1 rounded-lg hover:bg-slate-200'>
            <Users className='text-slate-900 w-4 h-4'/>
          </button>
          <button className='p-1 rounded-lg hover:bg-slate-200'>
            <Bell className='text-slate-900 w-4 h-4'/>
          </button>
          <button className='p-1 rounded-lg hover:bg-slate-200'>
            <Settings className='text-slate-900 w-4 h-4'/>
          </button>
        </div>
        {/*  */}
        <div className="flex gap-3">
          <button className='flex items-center'>
            <span>Faseem</span>
            <ChevronDown className='w-4 h-4'/>
          </button>
          <button>
            <Image src='/user.png' alt="user image"  width={496} height={516} className='rounded-full w-8 h-8 border border-slate-800'/>
          </button>
          <button>
            <LayoutGrid className='w-6 h-6 text-slate-900'/>
          </button>
        </div>
        {/*  */}
      </div>
      <button className='lg:hidden'>
            <Image src='/user.png' alt="user image"  width={496} height={516} className='rounded-full w-8 h-8 border border-slate-800'/>
          </button>
    </div>
  )
}
