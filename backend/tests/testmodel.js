const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    testString: {
        type: String
    }
});

const testModel = mongoose.model('test', testSchema);

module.exports = testModel;