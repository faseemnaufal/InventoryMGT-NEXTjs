import React from 'react'

export default function InventorySummaryCard({item}) {
  return (
    <div
                         className="mb-4 rounded-lg border border-slate-200 
                            hover:border-blue-400 bg-white px-4 py-2
                            cursor-pointer flex items-center justify-between gap-3
                            transition-all duration-300">
                            <h2 className='uppercase text-slate-500 text-sm'>
                                {item.title}
                            </h2>
                            <h4 className='text-2xl'>{item.number}</h4>
                        </div>
  )
}
