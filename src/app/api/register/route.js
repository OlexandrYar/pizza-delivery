export async function GET(req,res) {
    const {searchParams} = new URL(req.url);
    const fname = searchParams.get('fname');
    const lname = searchParams.get('lname');
    const username = searchParams.get('username');
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    const address = searchParams.get('address');

    const {MongoClient} = require('mongodb');

    const url = "mongodb://root:example@localhost:27017/";
    const client = new MongoClient(url);

    const dbName = 'app';

    await client.connect();
    const db =client.db(dbName);
    const collection = db.collection('users');
    const findEmail = await collection.findOne({"email":email});
    const findUsername = await collection.findOne({"username":username});


    if (findEmail || findUsername){
        return Response.json({data:"notCreated"});
    }
    else{
        try{
            await collection.insertOne({
                username:username,
                email:email,
                pass:password,
                firstname:fname,
                secondname:lname,
                address:address
            });
            return Response.json({data:"created"});
        }
        catch(e){
            return Response.json({data:"notCreated"});
        }
        
    }
}