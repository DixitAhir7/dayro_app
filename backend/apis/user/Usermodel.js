const mongoose = require('mongoose');

// when user enters first time

const Userschema = new mongoose.Schema({
    useremail: {
        type: String
    },

    username: {
        type: String
    },

    userpassword: { type: String, },

    isPrivate: {
        type: Boolean,
        default: true
    },

    // dateaob: { type: Date },
    userimg: { type: String },

    role: {
        type: String,
        enum: ['user', 'artist'],
        default: "user",
    },

    // provider: { type: String },
    // googleId: { type: String },
    // facebookid: { type: String },

    userlocation: [
        {
            lattitude: { type: String },
            longitude: { type: String }
        }
    ],

    // based on preference send notification
    // notificationpref: {
    //     type: String,
    //     default: "email"
    // },

    // fornow give ref to user of booked artist clear after occasion completes
    bookedArtist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "beartist",
        }
    ],

    // 🧞‍♀️
    bookedAgain: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "beartist",
        }
    ],

    otp: { type: String },
    expiresat: { type: Date },

    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true, strictQuery: true
});

// before saving data i can manupilate anything or do some task
// Userschema.pre('save', async function (next) {
//     try {
//         if (!this.isModified('userpassword')) return next();
//         this.userpassword = await argon2.hash(this.userpassword);
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

// Userschema.methods.comparePassword = async function (candidatePassword) {
//     return await argon2.verify(this.userpassword, candidatePassword);
// };

// in database it'll automatically saved as plural form this is singular form
const User = mongoose.model('User', Userschema);

module.exports = User;