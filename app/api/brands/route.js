import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request){
    try {
        const {title} = await request.json()
        
        const brand = await db.brand.create({
            data: {
                title
            }
        })
        console.log(brand)
        return NextResponse.json(brand)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a Brand"
        },{
            status: 500
        })    
    }
}

export async function GET(request){
    try {
        const brands = await db.brand.findMany({
            orderBy: {
                createdAt: 'desc' //latest brands
            }
        })
        return NextResponse.json(brands)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the Brands"
        },{
            status: 500
        })
        
    }
}

export async function DELETE(request){
    try {
        const id= request.nextUrl.searchParams.get("id")
        const deletedBrand = await db.brand.delete({
            where: {
                id 
            },
        })
        return NextResponse.json(deletedBrand)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Delete Brand"
        },{
            status: 500
        })
    }
}