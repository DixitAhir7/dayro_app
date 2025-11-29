const connection = require("../config/connectionmq");
const { Worker } = require("bullmq");
const bookForm = require("../apis/artists/bookartistformbyuser/bookFormModel");
const User = require("../apis/user/Usermodel");
const { sendnotificationtoemail } = require("../utilitis/notifications/notificationcontroler");
const Beartist = require("../apis/artists/beartists/beartistmodel");
const { ObjectId } = require("mongodb");

/**
 * question is how do i provide connection with client
 * process refund when occasion completes and delete bookedArtists from usermodel
*/

const processRefund = new Worker("keepRunning", async (job) => {
    console.log("queue job processed");

    const { userid, bookformid, artistInfo } = job.data;

    await bookForm.findByIdAndUpdate(bookformid, {
        isComplete: true
    });

    await User.findByIdAndUpdate(userid, {
        $pullAll: { bookedArtist: artistInfo }
    })
}, {
    connection: connection
});

processRefund.on("completed", (j) => {
    console.log("refund process shoudld be completed", j.data);
});

processRefund.on('error', (err) => {
    console.log("refund process worker sucked up", err);
});

/**
 * delayed untill occasion completes
 * add certain hours in occasionDate
 * how to get userid when calling func
*/
// process refund when occasion completes

//worker for updating artist state for from,to date for not avalibility

const startWorker = new Worker("apiQueue", async (job) => {
    console.log("job worker started");

    const { userid } = job.data;

    await Beartist.findOneAndUpdate({ user: userid }, {
        $set: {
            isAvaliable: true
        }
    });

    // idk if this works
}, {
    connection: connection
});

const endWork = new Worker("apiQueue", async (j) => {
    console.log("job ended for to date range for artist");
    const { userid } = j.data;

    await Beartist.findOneAndUpdate({ user: userid }, {
        $set: {
            isAvaliable: true
        }
    });
});


startWorker.on('active', (job) => {
    console.log("job is active")
});

startWorker.on('completed', () => {
    console.log("it's completed")
});


/**
 *remind artist to answer for book requests 
*/

const remindworker = new Worker("remindQueue", async (j) => {
    const { userid, bookformid } = j.data;

    const findBookform = await bookForm.findById(bookformid);

    // find ids in isSelected is null -> send notification reminder
    const artistIds = findBookform.individualSelect
        .filter(a => a.isSelected == null)
        .map(a => a.id);

    // 🧞‍♀️avoid maps if possible

    if (artistIds) {
        const findArtist = await Beartist.find({ _id: new ObjectId(artistIds) }).populate("user", 'useremail');
        const artistemail = findArtist.map(e => e.user.useremail);

        await sendnotificationtoemail(artistemail);
    }
}, {
    connection: connection
});

remindworker.on("error", (err) => {
    if (err) return "error happened to sending email for long duration"
});