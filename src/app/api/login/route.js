export async function GET(req,res) {
    const {searchParams} = new URL(req.url);

    
    const email = searchParams.get('email');
    const password = searchParams.get('pass');

    const {MongoClient} = require('mongodb');

    const url = "mongodb://root:example@localhost:27017/";
    const client = new MongoClient(url);

    const dbName = 'app';

    await client.connect();
    const db =client.db(dbName);
    const collection = db.collection('users');
    const findAccount = await collection.findOne({"email":email});


    if (findAccount && findAccount.pass === password){
        return Response.json({data:"valid"});
    }
    else{
        return Response.json({data:"invalid"});
    }
}

