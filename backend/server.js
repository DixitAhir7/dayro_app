/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const app = express();
require('@dotenvx/dotenvx').config();
const compression = require('compression');
const APP_PORT = process.env.PORT;
const { connecttoPg, connectCluster, connecDb } = require('./config/dayroDb');
const cookieParser = require('cookie-parser');
const { verifytoken } = require('./middlewares/verifytoken');
// middlewares
const successmsg = require('./middlewares/successmsg');
const errorHandler = require('./middlewares/errorHandler');
// routes
const authRoute = require('./apis/auth/authRoute');
const beartistRoute = require('./apis/artists/beartists/beartistRoute');
const askasiRoute = require('./apis/aiapis/askairoute');
const userRoute = require('./apis/user/userRoute');
const bookartistapiRoute = require('./apis/artists/bookartistsapis/bookartistRoute')
const { JS_ORIGIN } = process.env;
const fs = require('fs');
const bookedArtistRoute = require('./apis/artists/bookartistformbyuser/bookFormRoute');
const paymentRoute = require('./apis/paymentapis/orderpayments/paymentroute');
const { default: mongoose } = require('mongoose');
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const socket = new Server(server);

socket.on('connection', (socket) => {
    socket.on('notifyartist', (msg) => {
        socket.emit('notifyartist', msg)
    });
});

socket.on('disconnect', () => {
    console.log('User disconnected');
});


mongoose.set('timestamps.createdAt.immutable', true);
app.use(compression());

// temporory origin for testing
app.use(cors({
    origin: JS_ORIGIN,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json({ strict: true }));

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));


// server.close('')

// process.on('SIGINT', () => {
//     console.log("idk what the heck is this");
//     process.exit(0)
// })

app.use(successmsg);
app.use(errorHandler);


// whoever open this could be devloper
app.get('/', async (req, res) => {
    const response = `someone entered this url could be devloper: ${new Date()}\n`
    fs.appendFile('devlog.txt', response, () => {
        return res.write("welcome to dayro");
    });
});

// worked as excepted

// AUTH route
app.use('/auth', authRoute);
app.use('/user', verifytoken, userRoute);

// ARTIST ROUTES
app.use('/artist', [beartistRoute, bookedArtistRoute, bookartistapiRoute]);

// PAYMENT routes
app.use('/payment', paymentRoute);

app.use('/ai', askasiRoute);

connecDb();
// connectCluster();
// connecttoPg();

app.listen(APP_PORT, (err) => {
    if (err) {
        console.error(err)
    }
    return console.log("server started")
});