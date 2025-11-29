const asyncHandler = require('express-async-handler');
const Webio = require('ws');
const { retry } = require('../../../reusablecode/retryattempt');
const Beartist = require('../beartists/beartistmodel');
const Blogmodel = require('./blogmodel');


const writeBlog = asyncHandler(async (req, res) => {
    const { blog } = req.body;
    const userid = req.user.id;

    const getartist = await Beartist.findOne({ user: userid });

    const storeBlog = await Blogmodel.create({
        user: userid,
        artist: getartist._id,
        blogs: [{ blog }]
    })

    return res.success(storeBlog, "blog recived succefully", 201)
});


// all artists blogs in /kalakar
const getblogs = asyncHandler(async (req, res) => {
    const getallblogs = await Blogmodel.find().lean();

    return res.success(getallblogs, "all artist's blog fetchd succefully");
});


// get individual kalakar's blog to display in kalakar searched,profile
const getartistblogs = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    const findallblogsofartist = await Blogmodel.findOne({ user: userid });

    // if (!findallblogsofartist) {
    //     // asynchoronous operation
    //     retry(3, findallblogsofartist);
    //     return res.fail(204, `failed to fetch aritst's blogs`)
    // };

    return res.success(findallblogsofartist, "fetched all blogs sucesfully", 200);
});


// update existing blog
const updateblog = asyncHandler(async (req, res) => {
    const blogid = req.params.id;
    const { blog } = req.body;

    const artistblog = await Blogmodel.findByIdAndUpdate(blogid,
        { $set: { blogs: [{ blog }] } },
        { new: true }
    );

    return res.success(artistblog, "succfully updated artist's blog");
});

const deleteblog = asyncHandler(async (req, res) => {
    const blogid = req.params.blogid;

    await Blogmodel.findByIdAndDelete(blogid);
});

module.exports = {
    writeBlog,
    getblogs,
    getartistblogs,
    updateblog,
    deleteblog
};

/*
only artists can write blogs,
read: all users, non-authorized too no need to login,register
*/