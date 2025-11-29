const mongoose = require('mongoose');
// const argon2 = require('argon2');

// when user enters first time

const aiSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    querry: { type: String },
    response: { type: String },

    createdAt: { type: Date },
    updatedAt: { type: Date },

}, { timestamps: true });


const aiModel = mongoose.model('aiQuerry', aiSchema);

module.exports = aiModel;