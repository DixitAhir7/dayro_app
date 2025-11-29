const { Queue } = require("bullmq");
const connection = require("../../config/connectionmq");
const bookForm = require("../../apis/artists/bookartistformbyuser/bookFormModel");
const Beartist = require("../../apis/artists/beartists/beartistmodel");
const ms = require("ms");

const queue = new Queue("apiQueue", {
    connection: connection
});


/**🧞‍♀️
 * when artist selects date range await this job till from,
 * try to keep logic in 1 job
*/

const startJobFrom = async (req, res) => {
    const userid = req.user.id;

    const findArtist = await Beartist.findOne({ user: userid })
    const f = findArtist.from;

    await queue.add('startjobonfrom', userid,
        {
            delay: f,
            attempts: 3
        }
    );
};

const whentoEnd = async (req, res) => {
    const userid = req.user.id;
    const findArtist = await Beartist.findOne({ user: userid });

    if (findArtist) {
        const t = findArtist.to;

        if (t && t !== null) {
            await queue.add("endjobonto", "today artist will be avalible", {
                delay: t,
                attempts: 3
            });
        }
    }
};

const emailQueue = new Queue("email_queue", {
    connection: connection
})


const sendEmail = async (req, res) => {
    const userid = req.user.id;
    const { bookformid } = req.body;

    await emailQueue.add('emailQueue',
        {
            userid,
            bookformid
        },
        { delay: 5000 }
    )
};

const Bookedartists = new Queue("bookedartist_queue", {
    connection: connection
});

/**
 * when user booked, call this and store it and delay untill occasion is completed
 * and refund to that user too
*/

const keepanEye = async (req, res) => {
    const userid = req.user.id;
    const { payment_id } = req.body;

    const findBookform = await bookForm.findOne({ user: userid });
    // console.log(findBookform);

    if (findBookform) {
        const findDate = Number(findBookform.occasionDate);

        // if (findDate < Date.now()) {
        //     // process refund to user
        //     refundpayment(payment_id);
        // };

        await Bookedartists.add("keepRunning",
            {
                userid,
                bookformid: findBookform._id,
                artistInfo: findBookform.artistInfo,
                payment_id
            },
            {
                delay: findDate,
                attempts: 2,
                removeOnComplete: true,
                removeOnFail: false
            }
        )
    } else {
        console.log("not booked any for this user")
    }
};

/**
 * if artist hasn't accepted or declined request for booking remind him/her,
 * to give reply in 2 hours 
*/

const remindArtist = async (req, res) => {

    const userid = req.user.id;
    const remindin = ms("2h");

    const { bookformid } = req.body;

    await Bookedartists.add("remindQueue", {
        userid: userid,
        bookformid: bookformid
    }, {
        delay: remindin
    })
};


module.exports = {
    startJobFrom,
    whentoEnd,
    sendEmail,
    keepanEye,
    remindArtist
};