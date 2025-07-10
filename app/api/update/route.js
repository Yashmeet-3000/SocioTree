// /pages/api/update.js

import clientPromise from "@/lib/mongo";

export async function POST(req) {
    const body = await req.json();
    const { handle, links, desc, pics } = body;
    const client = await clientPromise
    const db = client.db("TreeLink")
    const collection = db.collection("Links")
    const result = await collection.updateOne(
      { handle },
      { $set: { links, desc, pics,Password } }
    );
    if (result.matchedCount === 0) {
        return Response.json({ success: false, message: "Handle not found" });
    } else {
        return Response.json({ success: true, message: "Profile updated successfully" });

    }

}



