const mongoose = require('mongoose');
const { MongoClient } = require('mongodb')
const { Client } = require('pg');
const MONGOOSE_PORT = process.env.MONGOOSE_PORT;
const asyncHandler = require('express-async-handler');
const {
    PG_PASSWORD,
    PG_USER,
    PG_PORT,
    PG_HOST,
    PG_DB,
    ATLAS_CONNECTION
} = process.env;


const connectAtlas = new MongoClient(ATLAS_CONNECTION);

const client = new Client({
    user: PG_USER,  
    password: PG_PASSWORD,
    port: PG_PORT,
    host: PG_HOST,
    database: PG_DB
});


// it has to be at top
const connectCluster = async () => {
    try {
        await connectAtlas.connect();
        await connectAtlas.db("admin").command({ ping: 1 })
        console.log('atlas connected')
    } catch (error) {
        console.warn(`error while connecting atlas ${error}`)
    }
};
// const collection = connectAtlas.db('sampla_mflix').collection('embedded_movies');

const os = require('os');
const sysProcess = os.cpus();

// sysProcess.forEach(c =>console.log(c.speed));

// main connection of database
const connecDb = asyncHandler((async () => {
    try {
        await mongoose.connect(ATLAS_CONNECTION, { appName: "dayro", autoIndex: false });
        console.log('mongo connected');
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            // try restart connecting to db
        }
        console.error(`error while connectign to database`, error);
    }
}));

const connecttoPg = async () => {
    try {
        await client.connect();
        console.log('pg connected')
    } catch (error) {
        console.log(`error while connecting to pg ${error}`)
    }
};

module.exports = {
    connecDb,
    connecttoPg,
    connectCluster,
};