// suggestion by users

const mongoose = require('mongoose');


const userSuggestedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    suggestion: {
        type: String,
    }

}, { timestamps: true });

const userSuggested = mongoose.model('usersuggestions', userSuggestedSchema);

module.exports = userSuggested;