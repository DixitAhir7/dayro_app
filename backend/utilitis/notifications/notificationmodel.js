const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    subscription: { type: Array },
    notification: { type: String },

    // to know which artist selects request
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "beartist"
    },

    bookedform: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookform"
    },

    notes: {
        type: String
    },

    createdAt: { type: Date },
    updatedAt: { type: Date },

}, { timestamps: true, strictQuery: true });


const notificationmodel = mongoose.model('notification', notificationSchema);

module.exports = notificationmodel;