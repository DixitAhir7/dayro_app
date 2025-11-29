const asyncHandler = require('express-async-handler');
const Beartist = require('../beartists/beartistmodel');
const { sendnotificationtoemail } = require('../../../utilitis/notifications/notificationcontroler');
const notificationmodel = require('../../../utilitis/notifications/notificationmodel');
const bookForm = require('./bookFormModel');
const User = require('../../user/Usermodel');
const { ObjectId } = require('mongodb');


// notification sDesign chart
// https://lucid.app/lucidspark/5b85b090-8e72-4825-8f2f-307193e890f6/edit?view_items=sYv5ZuASOjRk&page=0_0&invitationId=inv_0b987c54-bcb0-4b6e-a07a-a0c6b6305b7d

/*
to display it in artist's profile,
make sure that if artist selects occasion that is on 2/9 that means occasion has ended then,
 he/she shouldn't be able to select for that date or disable the buttons after occasion end
 ✅
*/

// when artist clicks then call this api to display data of bookedform✅


/**
 * @description
 * when artist selects/ decline call this api
 * and send to that user from bookform that xx artist selected your dayro
 * when artist decline save reason and send to user
 * when artist selects then look into bookorm that artist is selecting and
 * match with already selected occasions if artist has already selected for that date then can't
*/

const selectedOrdecline = asyncHandler(async (req, res) => {
    const { id } = req.user;
    // const { selectedvalue } = req.query;

    const user = await User.findById(id);

    const { bookformid, reason, selectedvalue } = req.body;

    const finduserBookform = await bookForm.findById(bookformid).populate('user artistInfo', 'useremail').lean();

    const findArtist = await Beartist.findOne({ user: id }).populate('bookedby');

    if (selectedvalue === "select") {
        // if all artist that user has booked that selects or decline then set to  true

        // get bookformid,artistid which selected request
        if (finduserBookform) {
            const alreadybookedform = await bookForm.findById(findArtist.bookedby).populate("bookedby");

            /**
             * if any dayro request is already selected for that day,
             * get date from bookformmodel then disable other requests for that date 
            */

            if (alreadybookedform) {
                if (alreadybookedform.occasionDate
                    === finduserBookform.occasionDate
                ) {
                    return res.fail(209, "can't select for this date already pending dayro awaited")
                }
            }

            await sendnotificationtoemail(finduserBookform.user.useremail, `your request got selected by ${user.username} http://localhost:5173/${user.username}/notifications`);
            await notificationmodel.create({
                user: finduserBookform.user._id,
                notification: `your dayro got selected by ${user.username}`,
                artist: findArtist._id,
                bookedform: finduserBookform._id
            });

            await bookForm.findOneAndUpdate(
                {
                    artistInfo: new ObjectId(findArtist._id),
                    "individualSelect.id": findArtist._id
                },
                {
                    $set: {
                        "individualSelect.$.isSelected": true
                    }
                },
                { new: true }
            );

            // when artist select/decline delete that artist's id from usermodel
            await User.findByIdAndUpdate(finduserBookform.user._id, {
                $pull: {
                    bookedArtist: findArtist._id
                }
            })
        };

    } else if (selectedvalue === 'decline') {
        // take reason from user
        if (finduserBookform.user) {
            sendnotificationtoemail(finduserBookform.user.useremail, `your request got declined from ${user.username}`, 200);

            await notificationmodel.create({
                user: finduserBookform.user._id,
                notification: `your request got declined from ${user.username}`,
                artist: user.username,
                bookedform: finduserBookform._id
            });

            await Beartist.findOneAndUpdate({ user: id }, {
                $set: { cancelReq: reason }
            });

            await bookForm.findOneAndUpdate({ artistInfo: findArtist._id }, {
                $addToSet: {
                    individualSelect: {
                        id: findArtist._id,
                        isSelected: false
                    }
                },
                $pull: {
                    artistinfo: findArtist._id
                }
            });

            await User.findByIdAndUpdate(finduserBookform.user._id, {
                $pull: {
                    bookedArtist: findArtist._id
                }
            })
        };

        //if artist decline, remove artist's id from bookedbyuser model

        return res.success("recived notification sucefully", 200);
    };

    // when all artist select by user select or decline then redirect user to payment
    // if (finduserBookform.individualSelect.findLast(b => b === true || false)) {
    //     const bookFormupdate = await bookForm.findByIdAndUpdate(bookformid, {
    //         $set: { allSelected: true }
    //     });

    //     bookFormupdate.isComplete = false;
    // } else {
    //     return res.fail(400, "not all artist has answered yet")
    // };
});


module.exports = {
    selectedOrdecline
};