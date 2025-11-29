const mongoose = require('mongoose');
const { Schema } = mongoose;

// give role admin | artist to acess for_artists route
const bookFormSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    Name: { type: String },
    contactNo: { type: String },
    whosBooking: { type: String },

    //🧞‍♀️
    occasionName: { type: String },
    occasionDate: { type: String },
    occasionTime: { type: String },
    occasionLocation: { type: String },

    // to attach in dates with name
    artistInfo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "beartist"
        }
    ],


    // if payment of booked artist is < 1,00,000
    paymentMethod: {
        type: String,
        default: "upi"
    },

    // when each artist select, decline store in this
    individualSelect: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Beartist"
            },
            isSelected: {
                type: Boolean,
                default: null
            }
        }
    ],

    order_id: {
        type: String
    },

    isComplete: {
        type: Boolean,
        default: null
    },

    onlyChoosed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beartist"
    },

    //if all artists that user booked declines or selects
    allSelected: { type: Boolean },

    isPublic: { type: Boolean, default: true },

    // when payments are done for given booform = true
    payment_id: {
        type: String
    },

    // when user cancel show after booking
    cancelReason: {
        type: String,
    },

    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

const bookForm = mongoose.model('bookForm', bookFormSchema);


// for error: duplicationeKey error in mongoose
// bookedbyusermodel.syncIndexes().then(result => console.log("synced:", result))

module.exports = bookForm;