export async function GET(req,res){
    const {MongoClient} = require("mongodb");
    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);
    const {searchParams} = new URL(req.url);
    const user = searchParams.get('user');

    const dbName = 'app';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('cart');

    const findResult = await collection.find({user:user}).toArray();
    console.log(findResult);
    return Response.json(findResult);
}