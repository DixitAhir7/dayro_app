const { default: mongoose, Schema } = require("mongoose");

const blogSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "beartist"
    },

    blogs: [
        {
            blog: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    createdAt: { type: Date },
    updatedAt: { type: Date }

}, { timestamps: true });

const Blogmodel = mongoose.model("blog", blogSchema);
module.exports = Blogmodel;