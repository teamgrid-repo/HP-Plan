const mongoose = require('mongoose');

const CureCategory = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    icon: {
        type: String
    },
    description: {
        type: String
    },
    weight: {
        type: Number
    }
},{
    timestamps: true
})

module.exports = mongoose.model('cure_category', CureCategory)
