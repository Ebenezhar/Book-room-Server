const { request } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
let mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const dotenv = require('dotenv').config();
const URL = process.env.DB;


app.post('/room', async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("rooms_users");
        await db.collection('rooms').insertOne(req.body);
        await connection.close();
        res.json({ message: 'File Created successfully' });
    } catch (error) {
        console.log(error)
    }
})

app.get('/rooms', async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db('rooms_users');
        const rooms = await db.collection('rooms').find().toArray();
        res.json(rooms);
        await connection.close();
    } catch (error) {
        console.log(error)
    }

})

app.get('/room/:rid', async function (req, res) {
    try {
        console.log(req.params.room);
        const connection = await mongoClient.connect(URL);
        const db = connection.db('rooms_users');
        const room = await db.collection('rooms').findOne({ _id: mongodb.ObjectId(req.params.rid)});
        res.json(room);
        await connection.close();
    } catch (error) {
        console.log(error)
    }

})

// app.put('/room/:rid', async function (req, res) {
//     try {
//         const connection = await mongoClient.connect(URL);
//         const db = connection.db('rooms_users')
//         const room = await db.collection('rooms');
//         await connection.close();
//     } catch (error) {
//         console.log(error);
//     }
// })

app.delete('/room/:rid', async function(req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db('rooms_users');
        await db.collection('rooms').deleteOne({_id : mongodb.ObjectId(req.params.rid)});
        await connection.close();
        res.json({message: 'Room is deleted successfully'})
    } catch (error) {
        console.log(error);   
    }   
})

app.listen(3001);