const mongoose = require('mongoose');

const Otp = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    code: {
        type: String,
        require: true
    },
    expires_in: {
        type: Date,
        require: true
    }
},{
    timestamps: true,
});



module.exports = mongoose.model('auth_otp', Otp);