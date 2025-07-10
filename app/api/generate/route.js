
import clientPromise from "@/lib/mongo";

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("TreeLink")
    const collection = db.collection("Links")
    const doc = await collection.findOne({surl:body.handle})
    if(doc){
        return Response.json({success:false,message:"This handle already exist"})
    }
    await collection.insertOne({
        handle: body.handle,
        links: body.links,
        pics:body.pics,
        desc:body.desc,
        Password:body.Password,
    })
    return Response.json({success:true,message:"Your Link tree is generated"})
    
    
}