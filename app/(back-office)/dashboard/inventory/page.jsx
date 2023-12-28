import FixedHeader from '@/components/dashboard/FixedHeader'
import OptionCard from '@/components/dashboard/OptionCard'
import { Boxes, Component, ScrollText, Shirt } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Inventory() {

  const optionCards=[
    {
      title: "Item groups",
      description: "Create multiple variants of the same item using Item Groups",
      link: "/new",
      linkTitle: "New Item Group",
      enabled: true,
      icon: Boxes,
    },
    {
      title: "Items",
      description: "Create standalone items and services that you buy and sell",
      link: "/new",
      linkTitle: "New Item",
      enabled: true,
      icon: Shirt,
    },
    {
      title: "Composite Items",
      description: "Bundle different items together and sell them as kits",
      link: "/new",
      linkTitle: "New Composite Item",
      enabled: false,
      icon: Component,
    },
    {
      title: "Price Lists",
      description: "Tweak your item prices for specific contacts or transactions",
      link: "/new",
      linkTitle: "New Item",
      enabled: false,
      icon: ScrollText,
    },
  ]
  return (
    <div>
      <FixedHeader newLink="/dashboard/inventory/items/new"/>
      <div className="grid grid-col-1 lg:grid-cols-2 px-16 py-8 gap-6">
        {
          optionCards.map((card,i)=>{
            return(
              <OptionCard key={i} optionData={card}/>
            )
          })
        }
        
      </div>
    </div>
  )
}


{/* <div className="shadow-md bg-white flex flex-col items-center
          justify-center gap-4 p-6 rounded">
          <h1>Item Groups</h1>
          <div className="">
            <Shirt className='w-36 h-36' strokeWidth="0.5px"/>
          </div>
          <p className="line-clamp-1">
            Create multiple variants of the same item
            using Item Groups
          </p>
          <Link href="#" className='py-2 rounded-sm bg-blue-600
            inline-flex items-center px-3 space-x-2 text-white'>
            New Item Group
          </Link>
          {/* <button className='py-2 rounded-sm bg-blue-600
            inline-flex items-center px-3 space-x-2 text-white'>Enable</button> */}
        // </div> */}