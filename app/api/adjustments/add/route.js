import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request){
    try {
        const {addStockQty, receivingWarehouseId, notes, referenceNumber, itemId, supplierId} = await request.json()

        //Get the Item
        const itemToUpdate = await db.item.findUnique({
            where: {
                id: itemId,
            },
        })
        // console.log(itemToUpdate)

        //Current Item Quantity
        const currentItemQty = itemToUpdate.quantity
        const newQty = parseInt(currentItemQty) + parseInt(addStockQty)
       
       
        //Modify the Item to the New Qty
        const updatedItem = await db.item.update({
            where: {
                id : itemId,
            },
            data: {
                quantity :newQty,
            },
        })

         //Get the wareHouse
         const warehouse = await db.warehouse.findUnique({
            where:{
                id: receivingWarehouseId,
            },
        })

        //Current Stock of the warehouse
        const currentWarehouseStock = warehouse.stockQty
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(addStockQty)
        //Update the Stock on the Warehouse
        const updatedWarehouse = await db.warehouse.update({
            where:{
                id:receivingWarehouseId,
            },
            data:{
                stockQty:newStockQty,
            },
        })

        

        const adjustment = await db.addStockAdjustment.create({
            data:{
                addStockQty : parseInt(addStockQty), 
                itemId, 
                receivingWarehouseId, 
                referenceNumber, 
                notes,
                supplierId,
            },
        })


        return NextResponse.json(adjustment)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create the Adjustment"
        },{
            status: 500
        })    
    }
}


export async function GET(request){
    try {
        const adjustments = await db.addStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc' //latest addStockAdjustment
            }
        })
        return NextResponse.json(adjustments)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the adjustments"
        },{
            status: 500
        })
        
    }
}


export async function DELETE(request){
    try {
        const id= request.nextUrl.searchParams.get("id")
        const deletedAdjustment = await db.addStockAdjustment.delete({
            where: {
                id, 
            },
        })
        return NextResponse.json(deletedAdjustment)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Delete the Adjustment"
        },{
            status: 500
        })
    }
}