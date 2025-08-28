const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors());

require('dotenv').config();
const port = process.env.PORT || 4080;


// mongodb

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cne3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
     

    // collection create 
    const classesCollection = client.db('StudyEase').collection('classes');

    // post classes
    app.post('/classes', async(req, res) => {
        const classInfo = req.body;
        console.log("Body for request: ", classInfo);
        const result = await classesCollection.insertOne(classInfo);
        res.status(200).
        send(result)
    })


    // get all classes
    app.get('/classes', async(req, res) => {
        const result = await classesCollection.find().toArray();
        res
        .status(200)
        .send(result);
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send({message: 'wow crud is working here'});
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})