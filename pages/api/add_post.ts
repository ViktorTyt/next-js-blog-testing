import { NextApiRequest, NextApiResponse } from "next"
import { connectToDtabase } from "../../lib/mongodb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { db } = await connectToDtabase();

    var body = JSON.parse(req.body);

    const post = db.collection('posts').insertOne({
        title: body.title,
        author: body.author,
        content: body.content
    })

    res.status(200).json('posts')
}