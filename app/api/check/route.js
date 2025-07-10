
import clientPromise from "@/lib/mongo";
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json()
        const client = await clientPromise
        const db = client.db("TreeLink")
        const collection = db.collection("Links")
        const doc = await collection.findOne({ handle: body.handle })
        if (doc) {
            return NextResponse.json({ success: false })
        } else {
            return NextResponse.json({ success: true })


        }


    }catch (error) {
        console.error("Error checking handle:", error);
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
    


}