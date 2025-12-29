import clientPromise from "@/lib/mongo";

export async function POST(request) {
    const body = await request.json();

    // 1. EXTRACT Password from the body (Check if your frontend uses 'password' or 'Password')
    const { handle, links, desc, pics, password } = body;

    const client = await clientPromise;
    const db = client.db("TreeLink");
    const collection = db.collection("Links");

    // 2. CHECK if the handle exists AND the password matches
    const existingRecord = await collection.findOne({ handle });

    if (!existingRecord) {
        return Response.json({ success: false, message: "Handle not found" });
    }

    if (String(existingRecord.Password) !== String(password)) {
        return Response.json({ success: false, message: "Invalid Password" });
    }

    // 3. PERFORM the update (Variable name must match what you extracted above)
    const result = await collection.updateOne(
        { handle },
        {
            $set: {
                links,
                desc,
                pics,
                Password: password // Maps lowercase input to capital key in DB
            }
        }
    );

    return Response.json({ success: true, message: "Updated successfully" });
}