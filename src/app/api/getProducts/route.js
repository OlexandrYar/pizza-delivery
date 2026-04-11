export async function GET(req,res){
    const {MongoClient} = require("mongodb");
    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);

    const dbName = 'app';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('products');

    const findResult = await collection.find({}).toArray();

    return Response.json(findResult);
}