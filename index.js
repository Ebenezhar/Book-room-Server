const express = require('express');
const app = express();
app.use(express.json());
let mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const dotenv = require('dotenv').config();
const URL = process.env.DB;


// 1. Creating Room

app.post('/hall', async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("halls_users");
        await db.collection('halls').insertOne(req.body);
        await connection.close();
        res.json({ message: 'File Created successfully' });
    } catch (error) {
        console.log(error)
    }
})

app.get('/halls', async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db('halls_users');
        const halls = await db.collection('halls').find().toArray();
        res.json(halls);
        await connection.close();
    } catch (error) {
        console.log(error)
    }

})


//2. Booking a Room 
app.post('/customer', async function (req, res) {
    try {
        let date = new Date();
        req.body.Date = date;
        const connection = await mongoClient.connect(URL);
        const db = connection.db("halls_users");
        await db.collection('users').insertOne(req.body);
        await connection.close();
        res.json({ message: 'File Created successfully' });
    } catch (error) {
        console.log(error)
    }
})

app.get('/customers', async function (req, res) {
    try {

        const connection = await mongoClient.connect(URL);
        const db = connection.db('halls_users');
        const customers = await db.collection('customers').find().toArray();
        res.json(customers);
        await connection.close();
    } catch (error) {
        console.log(error)
    }
})

//3.List all Rooms with Booked data

app.get('/bookedHalls', async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db('halls_users');
        const halls = await db.collection('halls').aggregate([
            {
              '$match': {
                'isBooked': true
              }
            }, {
              '$unwind': {
                'path': '$customersIds'
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'customersIds', 
                'foreignField': '_id', 
                'as': 'CustomerDet'
              }
            }, {
              '$unwind': {
                'path': '$CustomerDet'
              }
            }, {
              '$group': {
                '_id': '$name', 
                'customersName': {
                  '$push': '$CustomerDet.name'
                }, 
                'Date': {
                  '$push': '$CustomerDet.Date'
                }, 
                'StartTime': {
                  '$push': '$CustomerDet.startTime'
                }, 
                'EndTime': {
                  '$push': '$CustomerDet.endTime'
                }
              }
            }
          ]).toArray();
        res.json(halls);
        await connection.close();
    } catch (error) {
        console.log(error)
    }

})

//4. List all customers with Booked data

app.get('/bookedCustomers', async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db('halls_users');
        const halls = await db.collection('users').aggregate([
            {
              '$lookup': {
                'from': 'halls', 
                'localField': 'roomId', 
                'foreignField': '_id', 
                'as': 'roomDet'
              }
            }, {
              '$unwind': {
                'path': '$roomDet'
              }
            }, {
              '$project': {
                'name': 1, 
                'contact': 1, 
                'startTime': 1, 
                'endTime': 1, 
                'roomDet': {
                  '_id': 1, 
                  'name': 1
                }
              }
            }
          ]).toArray();
        res.json(halls);
        await connection.close();
    } catch (error) {
        console.log(error)
    }

})


app.listen(3001);