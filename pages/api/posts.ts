import { NextApiRequest, NextApiResponse } from "next"
import { connectToDtabase } from "../../lib/mongodb"

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
) {
    let { db } = await connectToDtabase();

    const posts = await db.collection('posts').find().toArray();

    res.status(200).json({posts})
}