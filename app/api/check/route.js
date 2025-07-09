
import clientPromise from "@/lib/mongo";

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("TreeLink")
    const collection = db.collection("Links")
    const doc = await collection.findOne({ handle: body.handle })
    if (doc) {
        return Response.json({ success: false})
    } else {
        return Response.json({ success: true})


    }



}