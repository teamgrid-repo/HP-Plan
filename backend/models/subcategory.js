const mongoose = require("mongoose");

const cureSubCategory = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cure_category',
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    applicable: {
        type: Boolean,
        required: true,
        default: false
    },
    originalName: {
        type: String,
    },
},{
    timestamps: true
})

module.exports = mongoose.model('cure_subcategory', cureSubCategory)
