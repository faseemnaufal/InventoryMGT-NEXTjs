import DataTable from '@/components/dashboard/DataTable'
import FixedHeader from '@/components/dashboard/FixedHeader'
import { getData } from '@/lib/getData'
import React from 'react'

export default async function Adjustments() {
  const addAdjustmentsData = getData("adjustments/add")
  const transferAdjustmentsData = getData("adjustments/transfer")

  const [addAdjustments, transferAdjustments] = 
  await Promise.all([addAdjustmentsData, transferAdjustmentsData])

  const addColumns = ["referenceNumber", "addStockQty"]
  const transferColumns = ["referenceNumber", "transferStockQty"]
  return (
    <div>
      {/* Header */}
      <FixedHeader 
        title="Adjustments" 
        newLink="/dashboard/inventory/adjustments/new"
      />
      {/* Table */}
      <div className="my-4 p-8">
        <h2 className='py-4 text-xl'>Stock Increment Adjustments</h2>
        <DataTable data={addAdjustments} columns={addColumns}/>
      </div>
      <div className="my-4 p-8">
        <h2 className='py-4 text-xl'>Stock Transfer Adjustments</h2>
        <DataTable data={transferAdjustments} columns={transferColumns}/>
      </div>
    </div>
  )
}
