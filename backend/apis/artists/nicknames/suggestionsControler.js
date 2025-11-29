const asynchandler = require('express-async-handler');
const Beartist = require('../beartists/beartistModel');

// recive nick names from user
const recivenames = asynchandler(async (req, res) => {
    const { nickname, artistname } = req.body;

    await Beartist.findOneAndUpdate({ name: artistname }, {
        $push: {
            givenNicknames: nickname
        }
    });

    return res.success("your suggested name is out in list", 201);
});

// in this api show all suggested nicknames for artist from all user
const displaysuggestednames = asynchandler(async (req, res) => {

    // get searched artist's name from useparams

    const { artistname } = req.body;
    const getnicknames = await Beartist.find({ givenNicknames: artistname }).populate('givennicknames');

    return res.success(`all nicknames for ${artistname} recived`, getnicknames, 200);
});


// if any nickname gets more than 5 canceled votes then delete it, it could be fun
const getVotes = asynchandler(async (req, res) => {
    const { id } = req.user;


});


module.exports = {
    displaysuggestednames,
    recivenames
};