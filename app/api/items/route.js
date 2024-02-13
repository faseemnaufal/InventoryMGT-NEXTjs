import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request){
    try {
        const itemData = await request.json()
        //Get the wareHouse
        const warehouse = await db.warehouse.findUnique({
            where:{
                id:itemData.warehouseId
            },
        })
        //Current Stock of the warehouse
        const currentWarehouseStock = warehouse.stockQty
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(itemData.qty)
        //Update the Stock on the Warehouse
        const updatedWarehouse = await db.warehouse.update({
            where:{
                id:itemData.warehouseId
            },
            data:{
                stockQty:newStockQty
            }
        })

        const item = await db.item.create({
            data: {
                title: itemData.title,
                categoryId: itemData.categoryId,
                sku: itemData.sku,
                barcode: itemData.barcode,
                quantity: parseInt(itemData.qty),
                unitId: itemData.unitId,
                brandId: itemData.brandId,
                supplierId: itemData.supplierId,
                buyingPrice: parseFloat(itemData.buyingPrice),
                sellingPrice: parseFloat(itemData.sellingPrice),
                reOrderPoint: parseInt(itemData.reOrderPoint),
                warehouseId: itemData.warehouseId,
                imageUrl: itemData.imageUrl,
                weight: parseFloat(itemData.weight),
                dimensions: itemData.dimensions,
                taxRate: parseFloat(itemData.taxRate),
                description: itemData.description,
                notes: itemData.notes,
            }
        })
        return NextResponse.json(item)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create Item"
        },{
            status: 500
        })    
    }
}


export async function GET(request){
    try {
        const items = await db.item.findMany({
            orderBy: {
                createdAt: 'desc' //latest Item
            },
            include: {
                category: true, //returns all fields for all categories
                warehouse: true, //Returns all suppliers
            },
        })
        return NextResponse.json(items)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the Item"
        },{
            status: 500
        })
        
    }
}


export async function DELETE(request){
    try {
        const id= request.nextUrl.searchParams.get("id")
        const deletedItem = await db.item.delete({
            where: {
                id 
            },
        })
        return NextResponse.json(deletedItem)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Delete Item"
        },{
            status: 500
        })
    }
}