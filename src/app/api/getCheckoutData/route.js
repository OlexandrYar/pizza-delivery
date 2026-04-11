export async function GET(req,res){
    const {MongoClient} = require('mongodb');
    const url = "mongodb://root:example@localhost:27017/";
    const client = new MongoClient(url);
    const {searchParams} = new URL(req.url);
    const user = searchParams.get('user');

    const dbName = 'app';
    await client.connect();
    const db = client.db(dbName);

    const usersCollection = db.collection('users');
    const cartCollection = db.collection('cart');

    const foundUser = await usersCollection.findOne({"email":user});
    const cartItems = await cartCollection.find({"user":user}).toArray();

    const products = cartItems.map((item) => ({pname: item.pname, price: item.price}));

    return Response.json({address: foundUser.address, products: products});
}
