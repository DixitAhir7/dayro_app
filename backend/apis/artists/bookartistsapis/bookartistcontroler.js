const asyncHandler = require('express-async-handler');
const { GraphQLSchema, GraphQLInterfaceType } = require('graphql');
const User = require('../../user/Usermodel');
const Beartist = require('../beartists/beartistmodel');
const { sendnotificationtoemail } = require('../../../utilitis/notifications/notificationcontroler');
const notificationmodel = require('../../../utilitis/notifications/notificationmodel');
const { ObjectId } = require('mongodb');
const bookForm = require('../bookartistformbyuser/bookFormModel');


// display artistss on homepage
const getArtists = asyncHandler(async (req, res) => {

    const { proffesion, min, max } = req.query;

    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 20;
    // const skip = (page - 1) * limit;

    // filter based on proffesion or price
    const artists = await Beartist.find({
        $or: [
            { proffesion: proffesion }
            // { price: { $gte: min, $lte: max } },
        ]
    });

    // if (proffesion === "Kalakaro") {
    //     return console.log('kbelkl')
    // };

    // if (!proffesion || !min || !max) {
    //     const sendallartist =  await Beartist.find();
    //     return res.success(sendallartist, "")
    // }



    // if no artist in selected catogory

    const findPorffesion = artists.map(a => a.proffesion);

    // if (!findPorffesion.includes(proffesion)) {

    // } else {
    //     res.success(artists, 'fetched data succefully form beartist', 200);
    // };
});

/*
api to display all artists,
if any artist's any field is empty then don't send it
*/

const getallartistnomatterwhathappens = asyncHandler(async (req, res) => {
    const getall = await Beartist.find();
    // console.log(req.url)

    // if (getall.length === 0) {
    //     fs.readFile("parseddata.md", "utf-8", (err, data) => {
    //         if (err) {
    //             return res.status(500).json({ success: false, message: "Error reading file" });
    //         }

    //         return res.status(200).json({
    //             success: true,
    //             message: "data fetched successfully",
    //             data,
    //         });
    //     });

    //     return;
    // }

    return res.success(getall, "got all artists successfully", 200);
});


/**
send combined data of artist's details + bookform dates,
use @agration pipeline to insert data in 1 array 
**/


/*
if user just shuts browser while booking initially then,
set time and afterr that time delete it from user model,
or just let user countinue it from where they left
✅
*/

const createbookedartist = asyncHandler(async (req, res) => {
    const { id } = req.user;

    if (!id) {
        console.log("bookartist controler")
        return res.redirect('/redirecttoauth')
    };

    // 🧞‍♀️
    const { artistid, urlPath } = req.body;

    let dataArray = {
        artists: []
    };

    /**
     * add artist's ids to empty object if artist is being booked by someone,
     * that has booked already by someone else's
    */

    const findAllbookForms = await bookForm.find({ artistInfo: new ObjectId(artistid) });

    const findifBooked = findAllbookForms.map(o => o.isComplete);

    // check if artist has booked occasion and is ytc

    if (!findifBooked) {
        const pipeline = await bookForm.aggregate([
            {
                $match: {
                    artistInfo: new ObjectId(artistid)
                }
            },
            // for artist's info
            {
                $lookup: {
                    from: "beartists",
                    localField: "artistInfo",
                    foreignField: "_id",
                    as: "bookedformdates"
                }
            },
            {
                $unwind: "$bookedformdates"
            },
            // {
            //     $project: {
            //         occasionName: 0,
            //         individualSelect: 0,
            //         cancelReason: 0,
            //         contactNo: 0,
            //         createdAt: 0,
            //         updatedAt: 0,
            //         user: 0,
            //         Name: 0
            //     }
            // }
        ]);

        dataArray['artists'] = pipeline;
    };

    let Bool = false;

    const findartist = await Beartist.findById(artistid);

    if (!findartist.isAvaliable) {
        return res.fail(209, "artist you are trying to select is not avaliable")
    };

    // this returns selected artist's ids stored in user for temporory use
    await User.findByIdAndUpdate(id,
        { $addToSet: { bookedArtist: artistid } },
        { new: true }
    ).select('-userpassword -otpobj -updatedAt -createdAt').
        populate('bookedArtist', 'name price artistimg isavAliable phoneNo');



    // if user wants to add more artist🧞‍♀️
    // if (findUser.bookedArtist.length && urlPath === `editbooked/${bookformid}`) {
    //     Bool = true;
    // };


    /**
     * @scenario ✅
     * if user has booked 3 artists that occasion has not completed yet,
     * and user wants to book another occasion with different artist then add in another addedfield,
     * check if that user's booked occasion has completed if it's in past then yes otherwise add in this 
    */

    /**
     * @description @readonly
     get all dates of booked artist only, just return occasion's dates and selectedartists's names,
     to show user that artists you've selected are booked for x-xx dates
    */

    return res.success(dataArray.artists, "selected artist saved sucessfully", 200);
});


// when user updates bookform after conformation

// get booked artist
const getbookedArtists = asyncHandler(async (req, res) => {
    const user = req.user.id;
    // console.log("getbooked artists api called", user);

    const findUser = await User.findById(user).populate('bookedArtist').lean();
    if (findUser.bookedArtist.length > 0) {
        return res.success(findUser, "got booked data sucefully", 200);
    }
});


// when user wants to remove when booking in home page
const removeartistinitially = asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const { artistid } = req.body;

    const removedArtist = await User.findByIdAndUpdate(userid,
        { $pull: { bookedArtist: new ObjectId(artistid) } }
    );

    return res.success(removedArtist, "artist removed sucefully", 200);
});


const getArtist = asyncHandler(async (req, res) => {
    const { name } = req.params;

    const getArtist = await Beartist.findOne({ name: name });

    return res.success(getArtist, "got artist sucefully", 200);
});


module.exports = {
    getArtists,
    getallartistnomatterwhathappens,
    createbookedartist,
    removeartistinitially,
    getArtist,
    getbookedArtists
};