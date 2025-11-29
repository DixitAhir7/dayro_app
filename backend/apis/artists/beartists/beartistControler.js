const Beartist = require('../beartists/beartistmodel');
const User = require('../../user/Usermodel.js');
const asyncHandler = require('express-async-handler');
const { setPath } = require('../../../utilitis/reusablecode/setpath.js');
const sharp = require('sharp');
const path = require('path');
const { ObjectId } = require('mongodb');
const bookForm = require('../bookartistformbyuser/bookFormModel.js');
const userSuggested = require('../../user/usersuggested.js');
const { calculateDays } = require('../../../utilitis/calculatetime.js');


// const imgfilespath = setPath("beartistuploads");


/**
 * @verify
 * how do i verify user who wants to be artist?
 * aadhar verification will make sure that it's real person
 * could link instagram account link that means i am just trying to increase instagram users and promoting it too 
*/

const createArtist = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    // console.log("flie:", req.file);

    const { Name, proffesion, price, phoneNo, isPricePrivate, email, isAcceptNicknname } = req.body;

    // console.log(Name)    
    // console.log(proffesion)
    // console.log(phoneNo)
    // console.log(isPricePrivate)
    // console.log(email)
    // console.log(price)

    if (!Name || !proffesion || !price || !phoneNo || !email) {
        return res.fail(400, "every asked value has to be submited")
    };

    // check if name exists
    const findartist = await Beartist.findOne({ name: Name });

    // prevent another account for same user
    const ifAlreadyhas = await Beartist.exists({ user: userid });

    if (ifAlreadyhas) {
        return res.fail(200, "you can't make another artist account");
    };

    if (findartist) return res.fail(409, "Name is taken please choose another");

    const inputPath = path.join("uploads", req.file.filename);

    const outputPath = path.join(
        "uploads",
        `${path.parse(req.file.filename).name}_resized.jpg`
    );

    const imagePath = outputPath.replace(/\\/g, "/");

    await sharp(inputPath)
        .resize(300, 300)
        .jpeg({ quality: 99 })
        .toFile(outputPath);


    const beartist = new Beartist({
        user: userid,
        name: Name,
        proffesion: proffesion,
        price: price,
        phoneNo: phoneNo,
        isPricePrivate: isPricePrivate,
        artistimg: imagePath,
        email: email
        // isAcceptNicknames: isAcceptNicknname
    });


    // if (!beartist.price >= 8000) {
    //     return res.fail(400, "price must be at least 8000")
    // };

    // this is for helping to identify artist during login

    await User.findByIdAndUpdate(userid, { $set: { role: "artist", } });

    const savevNewArtist = await beartist.save();

    return res.success(savevNewArtist, 'artist created sucefully', 201);
});


// $ for first element matched and if wants to update all array $[]

// this api will call for if artist change anyting in their profile or edit their info of beartist 
const Artistupdateinfo = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    const { name, proffesion, price, showPrice, isAvaliable, reason, reciveReq, from, to } = req.body;

    const updateArtist = await Beartist.findOneAndUpdate({ user: userid },
        {
            $set: {
                name: name,
                proffesion: proffesion,
                price: price,
                isPricePrivate: showPrice,
                isAvaliable: isAvaliable,
                reasonForNotAvaliable: reason,
                reciveReq: reciveReq,
                from: from,
                to: to,
            }
        },
        { new: true, runValidators: true }
    );


    return res.success(updateArtist, "artist info updated sucefully", 200);
});

const uploadMultiple = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    const fileObj = req.files.map((file) => ({
        filename: file.filename,
        path: file.path
    }));

    const inputPath = path.join("uploads", req.file.filename);

    const outputPath = path.join(
        "uploads",
        `${path.parse(fileObj.filename).name}_resized.jpg`
    );

    const imagePath = outputPath.replace(/\\/g, "/");

    await sharp(inputPath)
        .resize(300, 300)
        .jpeg({ quality: 99 })
        .toFile(outputPath);

    const multipleUploaded = await Beartist.findOneAndUpdate({ user: new ObjectId(userid) }, {
        $addToSet: {
            uploadedPics: imagePath
        }
    });

    return res.success(multipleUploaded, "uploaded multiple images", 201);
});


/*
stay as a user but delete as an artist,
and take reason from that artist save into usermodel
*/

const deleteArtist = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    const deletedartist = await Beartist.findOneAndDelete({ user: userid });
    await User.findByIdAndUpdate(userid, { $set: { role: "user" } });

    if (!deletedartist) return res.fail("failed to delete artist please try again later", 400);

    return res.success("deleted artist's account sucefully", 204);
});


/**
 * @readonly
 * display to artist that he/she booked on this occasions and all 
*/


const getArtist = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    const findartist = await Beartist.findOne({ user: new ObjectId(userid) }).populate('bookedby', '-occasionTime -order_id -allSelected -cancelReason -isPayment -individualSelect').select('-createdAt -updatedAt -usePrev -uploadedPics');

    // if (!findartist.bookedby.length > 0) {
    //     res.fail(400, "couldn't get artist");
    // };

    // const getartist = await Beartist.aggregate([
    //     {
    //         $unwind: {
    //             path: "$dateRange",
    //             preserveNullAndEmptyArrays: true
    //         },
    //         $match: {
    //             user: mongoObjectId
    //         }
    //     }
    // ]).limit(1).match({
    //     _id: (userid)
    // });

    return res.success(findartist, "get artist sucefully", 200);
});


/**
 * as per artist selected date range start job
 * and set not avaliable
*/
// start when artist has given date after today,future date


const reciveuserSuggestion = asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const { suggestion } = req.body;

    await userSuggested.create({
        user: userid,
        suggestion: suggestion
    });

    return res.status(201).json({ success: true, message: "thank you" })
});


//get booked data between start,end date

const getBookeddataonDates = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    const { startdate, enddate } = req.query;

    const getArtist = await Beartist.findOne({ user: new ObjectId(userid) }).populate('bookedby');
    const getbookform = await bookForm.find({ occasionDate: { $gte: startdate, $lte: enddate } }).populate('artistInfo');
    const getName = getbookform.map(a => console.log(a));

    // const pipeline = await bookForm.aggregate([
    //     {
    //         $lookup: {
    //             from: "beartists",
    //             localField: ""
    //         }
    //     }
    // ])


    if (getName.includes(getArtist)) {
        return res.success(getbookform, "got data on dates sucefully", 200);
    } else {
        return res.fail(204, "nothing to fetch");
    }
});


const verifyAadhar = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    const headers = res.setHeader('Content-Type', 'application/xml');
})

module.exports = {
    createArtist,
    Artistupdateinfo,
    deleteArtist,
    uploadMultiple,
    getArtist,
    reciveuserSuggestion,
    getBookeddataonDates,
    verifyAadhar
};