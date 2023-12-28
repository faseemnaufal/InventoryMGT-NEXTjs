import { BaggageClaim, BarChart4, Cable, ChevronLeft, Files, Home, PlusCircle, ShoppingBag, ShoppingBasket, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import SubscriptionCard from './SubscriptionCard'
import SidebarDropdownLink from './SidebarDropdownLink'
  

export default function Sidebar() {

    const inventoryLinks=[
        {
            title: "Items",
            href:"/dashboard/inventory"
        },
        {
            title: "Item Groups",
            href:"/dashboard/inventory"
        },
        {
            title: "Inventory Adjustments",
            href:""
        },
    ]
    const salesLinks=[
        {
            title: "Customers",
            href:"#"
        },
        {
            title: "Sales Orders",
            href:"#"
        },
        {
            title: "Packages",
            href:""
        },
        {
            title: "Shipments",
            href:"#"
        },
        {
            title: "Invoices",
            href:"#"
        },
        {
            title: "Sales Receipts",
            href:"#"
        },
        {
            title: "Payment Received",
            href:"#"
        },
        {
            title: "Sales Returns",
            href:"#"
        },
        {
            title: "Credit Notes",
            href:"#"
        },
    ]

  return (
    <div className='w-60 min-h-screen bg-slate-800 text-slate-50 justify-between fixed'>
        {/* Top Part */}
        <div className="flex flex-col">
            {/* logo */}
            <Link href="#" className="flex space-x-2 items-center bg-slate-950 py-3 px-2">
                <ShoppingCart />
                <span className='text-xl font-semibold'>Inventory</span>
            </Link>
            {/* links */}

            <nav className='flex flex-col gap-3 px-3 py-6'>
                <Link href="/dashboard/home/overview" className='flex items-center space-x-2 bg-blue-600
                text-slate-50 p-2 rounded-md'>
                    <Home className='w-4 h-4'/>
                    <span>Home</span>
                </Link>

                <SidebarDropdownLink 
                items={inventoryLinks} title="Inventory"
                icon={BaggageClaim}/>    

                <SidebarDropdownLink 
                items={salesLinks} title="Sales"
                icon={ShoppingBag}/>           
                
                
                <button className='p-2 flex items-center space-x-2' href=''>
                    <ShoppingBasket className='w-4 h-4'/>
                    <span>Purchases</span>
                </button>
                <Link href="#" className='p-2 flex items-center space-x-2'>
                    <Cable className='w-4 h-4'/>
                    <span>Integrations</span>
                </Link>
                <Link href="#" className='p-2 flex items-center space-x-2'>
                    <BarChart4 className='w-4 h-4'/>
                    <span>Reports</span>
                </Link>
                <Link href="#" className='p-2 flex items-center space-x-2'>
                    <Files className='w-4 h-4'/>
                    <span>Documents</span>
                </Link> 
            </nav>
            <SubscriptionCard />
        </div>
        {/* Bottom Part */}
        <div className="flex flex-col ">
                <button className="flex space-x-2 items-center justify-center bg-slate-950 py-3 px-2">
                    <ChevronLeft />
                </button>
        </div>
        {/* subscription card */}
        {/* footer icon */}
    </div>
  )
}
