import { ObjectId } from 'mongodb';

export async function GET(req,res) {
    const {searchParams} = new URL(req.url);

    
    const id = searchParams.get('id');
    const user = searchParams.get('user');

    const {MongoClient} = require('mongodb');

    const url = "mongodb://root:example@localhost:27017/";
    const client = new MongoClient(url);

    const dbName = 'app';

    await client.connect();
    const db =client.db(dbName);
    const cartCollection = db.collection('cart');
    const foundProduct = await cartCollection.findOne({"_id":new ObjectId(id)});

    if(foundProduct&&foundProduct.user===user){
        cartCollection.deleteOne({"_id":new ObjectId(id)});
        return Response.json({data:"deleted"});
    }
    else{
        return Response.json({data:"notDeleted"});
    }
    

}

