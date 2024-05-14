import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{params:{storeid:string}}){

    try{

        const {userId} = auth();
        const body = await req.json();
        
        const {name} = body;

        if(!userId){
            return new NextResponse("Unauthenticated", {status:401})
        }

        if(!name){
            return new NextResponse('Name is reuqired',{status:400})
        }

        if(!params.storeid){
            return new NextResponse('Store Id is required',{status:400})
        }

        const store = await prismadb.store.updateMany({
            where:{
                id:params.storeid,
                userId
            },
            data:{
                name:name
            }
        })

        return NextResponse.json(store)

    }catch(error){
        console.log('STORE_PATCH',error)
        return new NextResponse("Internal Error",{status:500})
    }
}





export async function DELETE(req:Request,{params}:{params:{storeid:string}}){

    try{

        const {userId} = auth();
     

        if(!userId){
            return new NextResponse("Unauthenticated", {status:401})
        }


        if(!params.storeid){
            return new NextResponse('Store Id is required',{status:400})
        }

        const store = await prismadb.store.deleteMany({
            where:{
                id:params.storeid,
                userId
            },
           
        })

        return NextResponse.json(store)

    }catch(error){
        console.log('STORE_DELETE',error)
        return new NextResponse("Internal Error",{status:500})
    }
}