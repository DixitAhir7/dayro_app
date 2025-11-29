/* eslint-disable no-undef */
const asyncHandler = require('express-async-handler');
const User = require('../user/Usermodel');
const sharp = require('sharp');
const path = require('path');
const notificationmodel = require('../../utilitis/notifications/notificationmodel');
const bookForm = require('../artists/bookartistformbyuser/bookFormModel');
const { ObjectId } = require('mongodb');

// account profile of user

const getUser = asyncHandler(async (req, res) => {
    const username = req.params.username;
    const userid = req.user.id;

    // User.db.collection('users').createIndex({ username: 1 }); 

    // fetch 1 querry and redirect to ai with answer
    const user = await User.findOne({ username: username }).select('-userpassword -useremail -otpobj -bookedArtist');
    if (!user) return res.fail(404, 'user does not exists');

    // if booked occasion is complete then and only then send to client < new Date
    const artistData = await bookForm.aggregate([
        {
            $match: { user: new ObjectId(userid) }
        },
        {
            $lookup: {
                from: "beartists",
                localField: "artistInfo",
                foreignField: "_id",
                as: "artistinfodata"
            }
        },
        {
            $project: {
                occasionDate: {
                    $lte: ["$occasionDate", new Date()]
                }
            }
        },
        {
            $unwind: {
                path: "$artistInfo",
                preserveNullAndEmptyArrays: false
            }
        }
    ]);

    /**
     * @description
     * if date of occasion is less than today's date that means i can assume that occasion is completed
     * delete from usermodel✅
    */

    // send newest data first

    // join bookedform data in this only 1 array
    const notificationData = await notificationmodel.aggregate([
        {
            $match: {
                user: new ObjectId(userid)
            }
        },
        {
            $lookup: {
                from: "bookforms",
                localField: "bookedform",
                foreignField: "_id",
                as: "groupeddata"
            }
        },
        {
            $unwind: "$groupeddata"
        },
        { $unwind: "$groupeddata.user" },
        {
            $sort: {
                createdAt: -1
            }
        },
    ]);

    return res.success({ user, artistData, notificationData }, "user profile fetched succefully", 200);
});


// image upload from user 1 image only
const imguploadofuser = asyncHandler(async (req, res) => {

    const user = req.user.id;

    console.log("upload image api called")
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

    const uploadedimgfile = await User.findByIdAndUpdate(user,
        { $set: { userimg: `http://localhost:9626/${imagePath}` } }
    );

    const userimg = uploadedimgfile.userimg;

    return res.success(userimg, "img file created succefully", 201);
});

module.exports = {
    getUser,
    imguploadofuser
};