import {ObjectId} from "mongodb";

export async function GET(req,res){
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    const {MongoClient} = require("mongodb");
    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);

    const dbName = 'app';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('products');

    const item = await collection.findOne({"_id":new ObjectId(id)});

    console.log('Found documents =>', item);

    return Response.json({item});
}