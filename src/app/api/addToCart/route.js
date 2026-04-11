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
    const productCollection = db.collection('products');
    const foundProduct = await productCollection.findOne({"_id":new ObjectId(id)});
    
    try{
        cartCollection.insertOne({
            user:user,
            pname:foundProduct.pname,
            price:foundProduct.cost,
            productImage:foundProduct.image
        })
        return Response.json({data:"added"})
    }
    catch(e){
        return Response.json({data:"notAdded"})
    }
    

}

