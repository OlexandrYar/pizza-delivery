import { ObjectId } from 'mongodb';

export async function GET(req,res) {
	const {searchParams} = new URL(req.url);
	const user = searchParams.get('user');
    const payment = searchParams.get('payment')
	const {MongoClient} = require('mongodb');
	const url = "mongodb://root:example@localhost:27017/";
	const client = new MongoClient(url);
	const dbName = 'app';
	await client.connect();
	const db = client.db(dbName);
	const cartCollection = db.collection('cart');
	const orderCollection = db.collection('orders');
	const foundItems = await cartCollection.find({"user":user}).toArray();
	if(foundItems.length === 0){
		return Response.json({data:"notAdded"})
	}
	try{
		const totalPrice = foundItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
		const products = foundItems.map(({ user: _, ...rest }) => rest);
		await orderCollection.insertOne({
			user:user,
			products:products,
			price:totalPrice,
			payment:payment
		})
		await cartCollection.deleteMany({"user":user});
		return Response.json({data:"added"})
	}
	catch(e){
		return Response.json({data:"notAdded"})
	}
}