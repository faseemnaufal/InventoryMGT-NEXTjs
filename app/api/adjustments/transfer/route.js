import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request){
    try {
        const {
            transferStockQty, itemId, 
            givingWarehouseId, 
            receivingWarehouseId, 
            referenceNumber, notes
        } = await request.json()



        //the giving warehouse
        const givingWarehouse = await db.warehouse.findUnique({
            where: {
                id: givingWarehouseId,
            }
        })

        //Get current stock
        const currentGivingWarehouseStock = givingWarehouse.stockQty


        if(parseInt(currentGivingWarehouseStock) > parseInt(transferStockQty)) 
        {
            const newStockForGivingWarehouse = 
            parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty)

            //Update stock
            const updatedGivingWarehouse = await db.warehouse.update({
                where: {
                    id: givingWarehouseId,
                },
                data:{
                    stockQty: newStockForGivingWarehouse,
                }
            })



            //Get the receiving warehouse
            const receivingWarehouse = await db.warehouse.findUnique({
                where: {
                    id: receivingWarehouseId
                }
            })

            //Get current stock
            const currentReceivingWarehouseStock = receivingWarehouse.stockQty

            const newStockForReceivingWarehouse = parseInt(currentReceivingWarehouseStock) 
            + parseInt(transferStockQty)

            //Update stock
            const updatedReceivingWarehouse = await db.warehouse.update({
                where: {
                    id: receivingWarehouseId,
                },
                data:{
                    stockQty: newStockForReceivingWarehouse,
                }
            })

            
            const adjustment = await db.transferStockAdjustment.create({
                data:{
                    transferStockQty : parseInt(transferStockQty), 
                    itemId, 
                    givingWarehouseId, 
                    receivingWarehouseId, 
                    referenceNumber, 
                    notes
                }
            })
            console.log(adjustment)
            return NextResponse.json(adjustment)
        }else{
            return NextResponse.json(
                {
                    data:null,
                    message: "Giving warehouse doesn't have enough stock"
                },
                {status:409}
            )
        }
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
        const adjustments = await db.transferStockAdjustment.findMany({
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
        const deletedAdjustment = await db.transferStockAdjustment.delete({
            where: {
                id 
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