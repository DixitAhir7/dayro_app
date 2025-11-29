/* eslint-disable no-undef */
const asyncHandler = require('express-async-handler');
const User = require('../../user/Usermodel');
const Beartist = require('../beartists/beartistmodel');
const notificationmodel = require('../../../utilitis/notifications/notificationmodel');
const { sendnotificationtoemail } = require('../../../utilitis/notifications/notificationcontroler');
const proces = require('child_process');
const bookForm = require('./bookFormModel');
const { ObjectId } = require('mongodb');
const { calculateHours } = require('../../../utilitis/calculatetime');
const ms = require('ms');

/*
when user completed all info payment too,
then store it into user's db and display it in their profile

if artist is already booked then,
display artist is booked on this particular date
   
bookeddate: user A booked devayt_khavad then,
if user B wants to book on that date then display which user has booked it
*/


/**
 * @description
 * take required data from user
 * get bookedartist's ids from usermodel
 * find all bookedartist's emailid to send notification
 * save message,artist's ids seprately in notification model to dipslay in app
*/


const createBookFormData = asyncHandler(async (req, res) => {

    const {
        Name,
        contactno,
        Occasionname,
        location,
        whosbooking,
        time,
        date,
        note,
        isPublic
    } = req.body;

    // console.log("create book form request api called")

    const userid = req.user.id;
    const finduser = await User.findById(userid).populate('bookedArtist', '_id name price isavaliable artistimg phoneno user').lean();
    console.log(new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    
    // use this to get artist's info from usermodel which is saved while booking
    const getids = finduser.bookedArtist.map(ar => ar._id);

    // const editformat = new Intl.DateTimeFormat("en-US").format(date);
    // editformat.replaceAll("/", "-");

    const bookartistform = new bookForm({
        user: userid,
        Name: Name,
        contactNo: contactno,
        occasionName: Occasionname,
        occasionLocation: location,
        occasionDate: String(date),
        occasionTime: time,
        whosBooking: whosbooking,
        artistInfo: getids,
        isPublic: isPublic,
        createdAt: Date.now(),
        individualSelect: [
            {
                id: getids,
                isSelected: null
            }
        ]
    });


    const saveData = await bookartistform.save();

    // bookedatist: artist's userid to send email
    const findwhoisuserinartist = await Beartist.find({ _id: getids }).populate('user', 'useremail');
    const findemail = findwhoisuserinartist.map(u => u.user.useremail);

    // to save notification to dipslay in app
    const finduserinartist = findwhoisuserinartist.map(u => u.user._id);
    // console.log("artist's user:", finduserinartist);


    // send email to selected artist
    if (findwhoisuserinartist) {
        sendnotificationtoemail(findemail, `you got request from ${finduser.username} open in app`);

        await notificationmodel.create({
            user: finduserinartist,
            notification: `you got request from ${finduser.username}`,
            notes: note,
            bookedform: saveData._id
        });

        // insert userid for displaying notifications to artist🧞‍♀️
        // for (let i = 0; i < finduserinbeartist.length; i++) {
        //     const notificationmodelc = await notificationmodel.create({
        //         user: finduserinbeartist[i],
        //         notification: `you got request from ${userid}`,
        //     });
        //     console.log("notificationmodel:", notificationmodelc);
        // };
    };

    return res.success(saveData, "data created succefully and notification is sent to artists", 200)
});


/*
send notification to whatsapp if not then through email,only email
when user fills up all info then send notification with that info to artist which are selected

set link to send notification to artists which is booked and,
redirect them to app
*/

/*
when user cancel artist after conforming,
send to canceled artist's email with reason
then refund amonunt of canceled artist
*/


/*
cancelCondition: user A booked dk and they want to cancel then,
they have to change or cancel it before at least 5 hours of show,
if specific reason then user can contact us.

send notification to canceled artist and reason too

check 8 hours remaing or not if not then user can update
*/


/*
after edit send notification to artist again,
user should not be able to change time to more early
 if intiallly booked at 9:00 then can't change it to 8:00
*/


/** 
 * @example
 * when user select date that is booked for artist,
 *  which he/she selected initially then call this api
 * ✅
 */

/**
 * @readonly
 * send booked form data to user
*/

const sendBookFormdata = asyncHandler(async (req, res) => {
    const { bookformid } = req.params;

    /**
     * @description
     * from: means which collection to look up to,
     * localField: means the ref name in main collection
     * foreignField: which field to match with localField
    */

    const pipeline = await bookForm.aggregate([
        {
            $match: {
                _id: bookformid
            }
        },
        {
            $lookup: {
                from: "beartists",
                localField: "artistInfo",
                foreignField: "_id",
                as: "bookedartist_docs"
            }
        }
    ]);

    if (pipeline) {
        return res.success(pipeline, 'sended bookedform for update sucefully', 200);
    };
});


const editbookartistform = asyncHandler(async (req, res) => {

    const userid = req.user.id;

    const { bookformid, Name, date, phoneNo, occasionname, occasionlocation } = req.body;

    // this is for previous data to check occasion time,date
    const findBookeddata = await bookForm.findById(bookformid);

    // to check that canceled time is before 8 hours of show

    const startTime = findBookeddata.occasionTime;
    const endTime = Date.now();

    // gives difference between now and occasiontime
    const howmanyhoursleftforshow = calculateHours(startTime, endTime);

    const iseightHours = 8 * 60 * 60 * 1000;

    if (findBookeddata.occasionTime < new Date().getTime()) {
        return res.fail(400, "occasion has started can't edit now")
    };


    // must be less than 8 hours
    if (howmanyhoursleftforshow >= iseightHours) {
        res.fail(400, "can't cancel or change artist sorry for your trouble please contact me if there is anythng we can help");
        res.end();
    }

    // if date is provided then and only then let user select time

    /**
     * check if artists that user booked are avalible or not on desired updated date 
     * ✅
    */

    const updatedCollection = await bookForm.findByIdAndUpdate(bookformid,
        {
            $set: {
                Name: Name,
                contactNo: phoneNo,
                occasionDate: date,
                occasionLocation: occasionlocation,
                occasionName: occasionname,
            }
        },
        { new: true, runValidators: true }
    );

    const getArtistsId = findBookeddata.artistInfo.map(i => i._id);

    await User.findByIdAndUpdate(userid,
        { $pull: { bookedArtist: getArtistsId } }
    );

    const findBookedartists = await Beartist.findById(getArtistsId).populate('user', 'useremail');

    if (findBookedartists) {
        sendnotificationtoemail(findBookedartists.user.useremail, "updated information");

        // send notification
        await notificationmodel.findOneAndUpdate({ user: findBookedartists.user }, {
            $set: { notification: "the occasion you selected has updated please look" }
        });
    };

    return res.success(updatedCollection, 'updated form successfully', 200);
});


// api for canceling artist after confromation process
const cancelartist = asyncHandler(async (req, res) => {

    const userid = req.user.id;
    const { artistid, bookformid, reason } = req.body;
    // console.log(artistid);

    const finduser = await bookForm.findById(bookformid).populate('user');

    const findartist = await Beartist.findById(artistid).populate('user');
    // console.log(findartist);

    await bookForm.findByIdAndUpdate(bookformid, {
        $pull: {
            artistInfo: new ObjectId(artistid)
        }
    });

    await User.findByIdAndUpdate(userid, {
        $pull: {
            bookedArtist: new ObjectId(artistid)
        }
    })

    // make refund for that user
    if (findartist) {
        sendnotificationtoemail(findartist.user.useremail, `you got cancecled from ${finduser.Name} go to app for more info`)
    };

    return res.success(200, "canceled artist sucefully");
});


//after booked add artists and send notification to those artists

// reason from user if user cancelded occasion and send to selected artist reason in email
const bookcancel = asyncHandler(async (req, res) => {
    const { bookformid } = req.params;
    const { cancelReason } = req.body;

    const findbookForm = await bookForm.findById(bookformid);

    const findusers = await Beartist.find({ user: new ObjectId(findbookForm.artistInfo) }).populate("user", "useremail");

    const findbookformandupdate = await bookForm.findByIdAndUpdate(bookformid, {
        $set: { cancelReason: cancelReason }
    });

    // send notification to selected artists
    if (cancelReason) {
        await sendnotificationtoemail(findusers.user.useremail, "occasion got canceled go to app more info");


        // refund payment if payment is done and if not that means user is canceling jsut after artist accepts 
        // get order_id of that form
    };

    await Beartist.findByIdAndUpdate(findbookForm.artistInfo, {
        $pull: { bookedby: bookformid }
    });

    return res.success(cancelReason, "cancel reason recived", 200);
});


// when occasion completes remove data from user model about bookartistformdata✅

/*
if user a has canceled after booking,
and user b has tried to book at same day and same artist then show to user b that it's avaliable
*/

const suggestifcanceled = asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const { bookformid } = req.body;

    const getifcanceled = await bookForm.findById(bookformid);
});


// when occasion completes add job to queue and send email to user
const sendEmailRefund = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    const user = await User.findById(userid);

    const bookformdata = await bookForm.findOne({ user: user }).populate('user', 'useremail');

    const dateofToday = new Date();

    if (dateofToday === Number(bookformdata.occasionDate + ms("24h"))) {
        await sendnotificationtoemail(bookformdata.user.useremail, "if you didn't recieve <a href='tel:+91 8866555078'>contact us</a>")
    }

    await sendnotificationtoemail(user.useremail, "redund completed");
});


const reqRefund = asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const { id } = req.body;

    const user = await User.findById(userid);

    await sendnotificationtoemail("dayroapp96@gmail.com", `refund requested by ${user.username} bookformid: ${id}`);
    return res.status(200);
});


module.exports = {
    createBookFormData,
    bookcancel,
    editbookartistform,
    cancelartist,
    sendBookFormdata,
    sendEmailRefund,
    reqRefund
};