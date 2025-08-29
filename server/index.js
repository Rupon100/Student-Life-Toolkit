const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

require("dotenv").config();
const port = process.env.PORT || 4080;

// mongodb

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cne3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // collection create
    const classesCollection = client.db("StudyEase").collection("classes");
    const budgetCollection = client.db("StudyEase").collection("budgets");
    const plannerCollection = client.db("StudyEase").collection("plans");

    // -------------------------------- classes ----------------------------

    // post classes
    app.post("/classes", async (req, res) => {
      const classInfo = req.body;
      console.log("Body for request: ", classInfo);
      const result = await classesCollection.insertOne(classInfo);
      res.status(200).send(result);
    });

    // get all classes
    app.get("/classes/:email", async (req, res) => {
      const email = req.params.email;

      const dayOrder = {
        Mon: 0,
        Tue: 1,
        Wed: 2,
        Thu: 3,
        Fri: 4,
        Sat: 5,
        Sun: 6,
      };

      const result = await classesCollection
        .aggregate([
          {
            $match: { user: email },
          },
          {
            $addFields: {
              dayIndex: {
                $switch: {
                  branches: Object.entries(dayOrder).map(([d, i]) => ({
                    case: { $eq: ["$day", d] },
                    then: i,
                  })),
                  default: 7,
                },
              },
            },
          },
          { $sort: { dayIndex: 1, startTime: 1 } }, // sort by day first, then startTime
        ])
        .toArray();

      res.status(200).send(result);
    });

    // delete an class
    app.delete("/class/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await classesCollection.deleteOne(filter);
      res.send(result);
    });

    // update class
    app.patch("/class/:id", async (req, res) => {
      const id = { _id: new ObjectId(req.params.id) };
      console.log(id);

      const { day, startTime, endTime } = req.body;

      console.log(req.body);

      const updateDoc = {
        $set: {
          day: day,
          startTime: startTime,
          endTime: endTime,
        },
      };

      const options = { upsert: true };

      const result = await classesCollection.updateOne(id, updateDoc, options);
      res.send(result);
    });

    // ----------------------- budget tracker apis-------------------------

    // add budget
    app.post("/budget", async (req, res) => {
      const body = req.body;
      console.log(body);
      const result = await budgetCollection.insertOne(body);
      res.send(result);
    });

    // get all budget
    app.get("/budget/:email", async (req, res) => {
      const email = { user: req.params.email };
      const result = await budgetCollection.find(email).toArray();
      res.send(result);
    });

    app.get("/budget-graph/:email", async (req, res) => {
      const email = req.params.email;

      try {
        const totals = await budgetCollection
          .aggregate([
            { $match: { user: email } },

            // Convert amount to number first
            {
              $addFields: {
                amountNum: { $toDouble: "$amount" },
              },
            },

            // Now group
            {
              $group: {
                _id: null,
                totalExpense: {
                  $sum: {
                    $cond: [
                      { $eq: ["$incomeType", "expense"] },
                      "$amountNum",
                      0,
                    ],
                  },
                },
                totalSaving: {
                  $sum: {
                    $cond: [
                      { $eq: ["$incomeType", "saving"] },
                      "$amountNum",
                      0,
                    ],
                  },
                },
              },
            },
          ])
          .toArray();

        res.send(
          totals[0] || { totalIncome: 0, totalExpense: 0, totalSaving: 0 }
        );
      } catch (error) {
        console.error("Aggregation error:", error);
        res.status(500).send({ message: "Something went wrong" });
      }
    });



    // -------------------study planner---------------------
    app.post('/plan', async(req, res) => {
      const body = req.body;
      const result = await plannerCollection.insertOne(body);
      res.send(result);
    });

    app.get('/plan/:email', async(req, res) => {
      const result = await plannerCollection.find({user: req?.params?.email}).toArray();
      res.send(result);
    })

    app.put('/plan', async(req, res) => {
      const { id, value} = req.body;
      console.log(id, ' -> ', value);

      const filter = { _id: new ObjectId(id) };
      const options = {upsert: true};
      const updateDoc = {
        $set: {
          status: value
        }
      }


      const result = await plannerCollection.updateOne(filter, updateDoc, options);
      res.send(result);

    })


    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send({ message: "wow crud is working here" });
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
