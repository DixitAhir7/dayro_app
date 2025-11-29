const mongoose = require('mongoose');
const { Schema } = mongoose;

// give role admin | artist to acess for_artists route
const beartistSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    name: { type: String },
    email: { type: String },
    proffesion: { type: String },
    price: { type: Number },
    phoneNo: { type: Number },
    artistimg: { type: String },

    isPricePrivate: {
        type: Boolean,
        default: false
    },

    isAvaliable: {
        type: Boolean,
        default: true
    },

    // recive date range when artist not avalable set on when end
    from: {
        type: String
    },

    to: {
        type: String
    },

    // can upload multiple
    uploadedPics: [
        {
            type: String
        }
    ],

    linkedAccountId: { type: String },

    // to show in artist images on home page
    reasonForNotAvaliable: { type: String },

    // when artist not avaliable recive request or
    reciveReq: { type: Boolean, default: true },
    cancelReq: { type: String },
    
    // isAadharverified: { type: Boolean },

    // after occasion gets complete store
    bookedby: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bookForm"
        }
    ],

    // use previously entered values
    usePrev: {
        type: Boolean,
        default: false
    },

    // whether user can give nickname or not
    isAcceptNicknames: {
        type: Boolean,
        default: true
    },

    // recive all nickanmes from every user that entered nickname
    givenNicknames: {
        names: { type: Array }
    },

    nicknameVotes: { type: Number },

    createdAt: { type: Date },
    updatedAt: { type: Date }

}, { timestamps: true });

const Beartist = mongoose.model('beartist', beartistSchema);


// Beartist.syncIndexes()
//     .then(() => console.log("Indexes synced"))
//     .catch(err => console.error(err));

module.exports = Beartist;

// whoever wants to be artist schema